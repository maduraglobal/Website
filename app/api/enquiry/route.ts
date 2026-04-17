import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, tour_id, message } = body;

    if (!name || !email || !phone) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const supabase = await createClient();

    // 1. Insert into leads table (for CRM visibility)
    const { data: leadData, error: leadError } = await supabase
      .from('leads')
      .insert([
        { 
          name, 
          email, 
          phone, 
          source: tour_id || 'Website Enquiry',
          status: 'New',
          // removing 'message' column as test showed it doesn't exist in 'leads' schema cache
        }
      ])
      .select()
      .single();

    if (leadError) {
      console.error('Lead creation error:', leadError);
      return NextResponse.json({ error: leadError.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, lead: leadData });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

