'use client';

import dynamic from 'next/dynamic';

const Map = dynamic(() => import('@/components/Map'), { ssr: false });

const markers = [
  {
    lat: 40.3701218,
    lng: 49.8157483,
    title: 'AzTU',
    image: '/images/aztu.jpeg',
    address: 'Bakı, H. Cavid prospekti 25',
    description: 'Azərbaycan Texniki Universiteti - mühəndislik ixtisasları üzrə ali təhsil müəssisəsi.',
    category: 'university',
    phone: '+994 12 538 33 50',
    link: 'https://aztu.edu.az'
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
    lat: 40.374554,
    lng: 49.811465,
    title: 'BDU',
    image: '/images/bdu.jpeg',
    address: 'Bakı, Zərifə Əliyeva küçəsi 23',
    description: 'Bakı Dövlət Universiteti - Azərbaycan üzrə ən böyük və ən qədim ali təhsil müəssisəsi.',
    category: 'university',
    phone: '+994 12 439 80 00',
    link: 'https://www.bsu.edu.az'
  },
  {
  lat: 40.390021,
  lng:49.8019656,
  title: 'İnşaatçılar metrosu',
  image: '/images/insaatcilar.jpg',
  address: 'Bakı, Yasamal rayonu',
  description: 'İnşaatçılar metrostansiyası - Bakı metrosunun ən işlək stansiyalarından biri.',
  category: 'metro',
  phone: '',
  link: 'https://goo.gl/maps/xoN4hNxdXn8s3kq57'
}
,{
  lat: 40.372745,
  lng: 49.809506,
  title: 'Div Academy',
  image: '/images/divacademy.jpeg',
  address: 'Bakı, Matbuat prospekti 25',
  description: 'Div Academy - proqramlaşdırma, rəqəmsal marketinq, kibertəhlükəsizlik və mobil inkişaf üzrə tədris verən İT akademiyası.',
  category: 'academy',
  phone: '+994 70 256 96 00',
  link: 'https://div.edu.az'
}
,
{
  lat: 40.37962,
  lng: 49.830324,
  title: 'Nizami Metro Stansiyası',
  image: '/images/nizami_metro.jpeg',
  address: 'Bakı, Zərgərpalan küçəsi',
  description: 'Nizami Metro Stansiyası - Bakı Metropoliteninin Yaşıl xəttində yerləşən mərkəzi stansiyalardan biridir, 1976-cı ildən fəaliyyət göstərir.',
  category: 'metro',
  phone: null,
  link: 'https://metro.gov.az'
}


  
];


export default function MapPage() {
  return (
    <div >
      
      <Map markers={markers} />
    </div>
  );
}

