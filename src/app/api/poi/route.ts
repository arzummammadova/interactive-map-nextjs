// https://nextjs.org/docs/app/api-reference/file-conventions/route
// https://nextjs.org/docs/app/api-reference/functions/next-request
// https://nextjs.org/docs/app/api-reference/functions/next-response
import {NextRequest,NextResponse } from 'next/server'
// import { NextResponse } from 'next/server'
const POIS=[
   {
    lat: 40.3701218,
    lng: 49.8157483,
    title: 'AzTU',
    image: '/images/aztu.jpeg',
    address: 'Bakı, H. Cavid prospekti 25',
    description: 'Azərbaycan Texniki Universiteti - mühəndislik ixtisasları üzrə ali təhsil müəssisəsi.',
    category: 'university',
    phone: '+994 12 538 33 50',
    link: 'https://aztu.edu.az',
    'hours': 'Həftə içi: 09:00 - 17:00, Şənbə: 10:00 - 14:00, Bazar: Bağlı'
  },
  {
    lat: 40.3749677,
    lng: 49.8143838,
    title: 'Elmlər Akademiyası',
    image: '/images/azmiu.jpg',
    address: 'Bakı, İstiqlaliyyət küçəsi 30',
    description: 'Azərbaycan Milli Elmlər Akademiyası - elm və tədqiqat mərkəzi.',
    category: 'science',
    phone: '+994 12 492 84 48',
    link: 'https://aztu.edu.az'
  },
  {
    lat: 40.3698531,
    lng: 49.8134327,
    title: 'AzMiu',
    image: '/images/elmler.jpg',
    address: 'Bakı, Azadlıq prospekti 68',
    description: 'Azərbaycan Memarlıq və İnşaat Universiteti - memarlıq və inşaat sahəsində ali təhsil müəssisəsi.',
    category: 'university',
    phone: '+994 12 538 33 75',
    link: 'https://azmiu.edu.az'
  },
    {
    lat: 40.374558,
    lng: 49.8088902,
    title: 'BDU',
    image: '/images/bdu.jpeg',
    address: 'Bakı, Z. Khalilov küçəsi 23',
    description: 'Bakı Dövlət Universiteti - 1919-cu ildə təsis edilmiş Azərbaycanın ən qədim və ən böyük ali təhsil müəssisəsi.',
    category: 'university',
    phone: '+994 12 439 12 12',
    link: 'https://www.bsu.edu.az'
  },
   

]
export async function GET(request: NextRequest) {
  const {searchParams} = new URL( request.url)
  const search=searchParams.get('search')?.toLowerCase() || '';
  const filtered=POIS.filter((poi)=>poi.title?.toLowerCase().includes(search))

  return NextResponse.json(filtered)


}

