// https://nextjs.org/docs/app/api-reference/file-conventions/route
// https://nextjs.org/docs/app/api-reference/functions/next-request
// https://nextjs.org/docs/app/api-reference/functions/next-response
import {NextRequest,NextResponse } from 'next/server'
// import { NextResponse } from 'next/server'
const POIS=[
   { lat: 40.3701218, lng: 49.8157483, title: 'AzTU' },
  { lat: 40.3749677, lng: 49.8143838, title: 'Elmlər Akademiyası' },
  {lat:40.3698531,lng:49.8134327,title:'Azmiu'}
]
export async function GET(request: NextRequest) {
  const {searchParams} = new URL( request.url)
  const search=searchParams.get('search')?.toLowerCase() || '';
  const filtered=POIS.filter((poi)=>poi.title?.toLowerCase().includes(search))

  return NextResponse.json(filtered)


}

