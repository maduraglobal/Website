import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';
import { slugify } from '@/utils/crm-types';

/**
 * GET /api/destinations - List destinations with parent-child support
 */
export async function GET() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('destinations')
    .select('*')
    .order('name');

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

/**
 * POST /api/destinations - Create a new destination or region
 */
export async function POST(request: Request) {
  const supabase = await createClient();
  const body = await request.json();

  if (!body.name) {
    return NextResponse.json({ error: 'Name is required' }, { status: 400 });
  }

  const { data, error } = await supabase
    .from('destinations')
    .insert([{
      ...body,
      slug: body.slug || slugify(body.name)
    }])
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data, { status: 201 });
}
