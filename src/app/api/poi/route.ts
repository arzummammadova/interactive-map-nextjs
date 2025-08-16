import { NextRequest, NextResponse } from 'next/server';

const POIS = [
  { name: 'AzTU', lat: 40.3701218, lng: 49.8157483 },
  { name: 'Elmlər Akademiyası', lat: 40.3749677, lng: 49.8143838 },
  { name: 'Fəvvarələr Meydanı', lat: 40.3728, lng: 49.8461 },
  { name: 'Bakı Bulvarı', lat: 40.366, lng: 49.835 },
];

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const search = searchParams.get('search')?.toLowerCase() || '';

  const filtered = POIS.filter(poi =>
    poi.name.toLowerCase().includes(search)
  );

  return NextResponse.json(filtered);
}
