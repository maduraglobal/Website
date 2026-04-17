import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function GET() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const supabase = await createClient();
  const body = await request.json();

  // Basic validation
  if (!body.email || !body.firstName) {
    return NextResponse.json({ error: 'Name and email are required for lead creation' }, { status: 400 });
  }

  const { data, error } = await supabase
    .from('leads')
    .insert([{
      name: `${body.firstName} ${body.lastName}`,
      email: body.email,
      phone: body.phone,
      address: body.address,
      gender: body.gender,
      dob: body.dob,
      source: 'Booking Flow'
    }])
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data, { status: 201 });
}
