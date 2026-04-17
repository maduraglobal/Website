import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-03-25.dahlia',
});

export async function POST(request: Request) {
  try {
    const { amount, currency, tourName, bookingId, region } = await request.json();

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: currency.toLowerCase(),
            product_data: {
              name: tourName,
            },
            unit_amount: Math.round(amount * 100), // Stripe expects amount in cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/${region}/booking/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/${region}/booking/cancel`,
      metadata: {
        bookingId: bookingId,
      },
    });

    // Update booking status to payment_initiated
    const { createClient } = await import('@/utils/supabase/server');
    const supabase = await createClient();
    await supabase
      .from('bookings')
      .update({ status: 'payment_initiated' })
      .eq('id', bookingId);

    console.log(`Booking ${bookingId} -> payment_initiated (Stripe)`);

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error('Stripe Session Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
