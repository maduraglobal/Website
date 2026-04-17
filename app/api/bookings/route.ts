import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

/**
 * GET /api/bookings - List bookings with filters
 */
export async function GET(request: Request) {
  const supabase = await createClient();
  const { searchParams } = new URL(request.url);

  const status = searchParams.get('status');
  const leadId = searchParams.get('lead_id');

  let query = supabase
    .from('bookings')
    .select('*, leads(name, email), tours(title, destination_id)');

  if (status) query = query.eq('status', status);
  if (leadId) query = query.eq('lead_id', leadId);

  const { data, error } = await query.order('created_at', { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

/**
 * POST /api/bookings - Create a new booking
 */
export async function POST(request: Request) {
  const supabase = await createClient();
  const body = await request.json();

  const { data, error } = await supabase
    .from('bookings')
    .insert([{
      lead_id: body.lead_id,
      tour_name: body.tour_name,
      departure_city: body.departure_city,
      departure_date: body.departure_date,
      total_price: body.total_price,
      currency: body.currency,
      status: 'pending', // Initial state
      travelers: body.travelers,
      region: body.region
    }])
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  
  // Transition log (simplified as system log)
  console.log(`Booking Created: ${data.id} [pending]`);
  
  return NextResponse.json(data, { status: 201 });
}

/**
 * PATCH /api/bookings - Update booking status (State Machine)
 */
export async function PATCH(request: Request) {
  const supabase = await createClient();
  const { id, status, payment_id } = await request.json();

  if (!id || !status) {
    return NextResponse.json({ error: 'ID and status are required' }, { status: 400 });
  }

  // Validate status transition (simplified)
  const validStates = ['pending', 'payment_initiated', 'confirmed', 'failed', 'cancelled'];
  if (!validStates.includes(status)) {
    return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
  }

  const { data, error } = await supabase
    .from('bookings')
    .update({ 
      status, 
      payment_id: payment_id || undefined,
      updated_at: new Date().toISOString() 
    })
    .eq('id', id)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  
  console.log(`Booking Transition: ${id} -> ${status}`);
  
  return NextResponse.json(data);
}
