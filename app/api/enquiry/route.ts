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

    // Map Name to First/Last for leads table
    const nameParts = name.trim().split(' ');
    const first_name = nameParts[0];
    const last_name = nameParts.length > 1 ? nameParts.slice(1).join(' ') : '';

    // 1. Insert into leads table (for CRM visibility)
    const { data: leadData, error: leadError } = await supabase
      .from('leads')
      .insert([
        { 
          first_name, 
          last_name, 
          email, 
          phone, 
          source: tour_id || 'Website Enquiry',
          status: 'New',
          message: message || ''
        }
      ])
      .select()
      .single();

    if (leadError) {
      console.error('Lead creation error:', leadError);
      // We continue even if lead fails, but it's bad for CRM
    }

    // 2. Also insert into enquiries table if it exists
    const { data: enquiry, error: enqError } = await supabase
      .from('enquiries')
      .insert([
        { 
          name, 
          email, 
          phone, 
          tour_id: (tour_id && tour_id.length > 20) ? tour_id : null, // Only pass if looks like UUID
          message: `${tour_id ? `[Type: ${tour_id}] ` : ''}${message || ''}`
        }
      ])
      .select()
      .single();

    if (enqError && !leadData) {
      return NextResponse.json({ error: enqError.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, lead: leadData, enquiry });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
