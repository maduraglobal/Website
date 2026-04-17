import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { headers } from 'next/headers';
import { createClient } from '@/utils/supabase/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-03-25.dahlia',
});

export async function POST(request: Request) {
  const body = await request.text();
  const sig = (await headers()).get('stripe-signature') as string;

  let event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message);
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object as Stripe.Checkout.Session;
      const bookingId = session.metadata?.bookingId;
      
      console.log(`Payment successful for booking: ${bookingId}`);
      
      const supabase = await createClient();
      await supabase
        .from('bookings')
        .update({ 
          status: 'confirmed', 
          payment_id: session.id,
          updated_at: new Date().toISOString()
        })
        .eq('id', bookingId);
      
      break;

    case 'checkout.session.async_payment_failed':
    case 'payment_intent.payment_failed':
      const failedSession = event.data.object as any;
      const failedBookingId = failedSession.metadata?.bookingId;
      
      console.log(`Payment failed for booking: ${failedBookingId}`);
      
      const supabaseFail = await createClient();
      await supabaseFail
        .from('bookings')
        .update({ 
          status: 'failed', 
          updated_at: new Date().toISOString()
        })
        .eq('id', failedBookingId);
      
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
