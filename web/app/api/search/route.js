import { NextResponse } from 'next/server';
import { searchContent } from '../../../lib/search.js';

export const runtime = 'nodejs';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const q = (searchParams.get('q') || '').slice(0, 100);
  const payload = searchContent({
    q,
    level: searchParams.get('level') || '',
    type: searchParams.get('type') || '',
    area: searchParams.get('area') || '',
    limit: searchParams.get('limit') || 60,
  });

  return NextResponse.json(
    { query: q, ...payload },
    {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    }
  );
}
