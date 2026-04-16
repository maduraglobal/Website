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
    .insert([body])
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data, { status: 201 });
}
