import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { createClient } from '@/utils/supabase/server';

export async function POST(request: Request) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, booking_id } = await request.json();

    const secret = process.env.RAZORPAY_KEY_SECRET!;
    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(body.toString())
      .digest('hex');

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      const supabase = await createClient();
      const { error } = await supabase
        .from('bookings')
        .update({ 
          status: 'confirmed', 
          payment_id: razorpay_payment_id,
          updated_at: new Date().toISOString()
        })
        .eq('id', booking_id);

      if (error) {
        console.error('Database Update Error:', error);
        // We still return true because payment was successful, the admin can manually fix the record
      }

      return NextResponse.json({ success: true, message: 'Payment verified successfully' });
    } else {
      return NextResponse.json({ success: false, message: 'Invalid signature' }, { status: 400 });
    }
  } catch (error: any) {
    console.error('Razorpay Verification Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
