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
  
];


export default function MapPage() {
  return (
    <div >
      
      <Map markers={markers} />
    </div>
  );
}

