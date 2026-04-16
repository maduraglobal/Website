import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';
import { slugify } from '@/utils/crm-types';

export async function GET() {
  const supabase = await createClient();
  const { data, error } = await supabase.from('blogs').select('*').order('published_date', { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const supabase = await createClient();
  const body = await request.json();
  
  const { data, error } = await supabase
    .from('blogs')
    .insert([{
      ...body,
      slug: body.slug || slugify(body.title),
      published_date: body.published_date || new Date().toISOString()
    }])
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data, { status: 201 });
}
