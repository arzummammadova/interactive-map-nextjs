'use client';

import dynamic from 'next/dynamic';

const Map = dynamic(() => import('@/components/Map'), { ssr: false });

const markers = [
  { lat: 40.3701218, lng: 49.8157483, title: 'AzTU' },
  { lat: 40.3749677, lng: 49.8143838, title: 'Elmlər Akademiyası' },
   {lat:40.3698531,lng:49.8134327,title:'AzMiu'}
];

export default function MapPage() {
  return (
    <div >
      
      <Map markers={markers} />
    </div>
  );
}

