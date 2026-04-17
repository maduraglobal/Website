import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(request: Request) {
  try {
    const { amount, currency = 'INR', receipt } = await request.json();

    const options = {
      amount: Math.round(amount * 100), // Razorpay expects amount in paise
      currency,
      receipt,
    };

    const order = await razorpay.orders.create(options);

    // Update booking status to payment_initiated
    const bookingId = receipt?.replace('rcpt_', '');
    if (bookingId) {
       const { createClient } = await import('@/utils/supabase/server');
       const supabase = await createClient();
       await supabase
         .from('bookings')
         .update({ status: 'payment_initiated' })
         .eq('id', bookingId);
       console.log(`Booking ${bookingId} -> payment_initiated (Razorpay)`);
    }

    return NextResponse.json({
      order_id: order.id,
      amount: order.amount,
      currency: order.currency,
      key_id: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error: any) {
    console.error('Razorpay Order Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
