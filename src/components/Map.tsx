'use client';

import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

type Marker = {
  lng: number;
  lat: number;
  title: string;
  image: string;
  address: string;
  description: string;
  category: string;
  phone: string;
  link: string;
};


interface MapProps {
  useDefaultCenter?: boolean;
  markers?: Marker[];
  center?: { lat: number; lng: number };
}

const Map: React.FC<MapProps> = ({ markers = [], center, useDefaultCenter = true }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current) {
      if (!process.env.NEXT_PUBLIC_MAPBOX_TOKEN) return;
      mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;


      let mapCenter: [number, number];
      let zoom: number;
      if (center) {
        mapCenter = [center.lng, center.lat];
        zoom = 13;
      } else if (useDefaultCenter) {
        mapCenter = JSON.parse(process.env.NEXT_PUBLIC_DEFAULT_CENTER || "[49.8671,40.4093]");
        zoom = JSON.parse(process.env.NEXT_PUBLIC_DEFAULT_ZOOM || "10");
      } else {
        mapCenter = [0, 0];
        zoom = 2;
      }


      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current!,

        style: 'mapbox://styles/mapbox/standard',
        center: mapCenter,
        zoom,
      });


      mapRef.current.addControl(new mapboxgl.NavigationControl(), 'bottom-right');

      mapRef.current.on('load', async () => {

        const response = await fetch('/data/multipolygons.geojson');
        const geojsonData = await response.json();
        mapRef.current?.addSource('maine', {
          'type': 'geojson',
          'data': geojsonData
          // 'data': {
          //   'type': 'Feature',
          //   'geometry': {
          //     'type': 'Polygon',
          //     'coordinates': [
          //       [
          //         [49.8157483, 40.3701218],
          //         [49.8143838, 40.3749677],
          //         [49.8134327, 40.3698531],
          //         [49.8157483, 40.3701218],
          //       ]
          //     ]
          //   }
          // }
        });

        mapRef.current?.addLayer({
          'id': 'maine',
          'type': 'fill',
          'source': 'maine',
          'layout': {},
          'paint': {
            'fill-color': '#1663c7',
            'fill-opacity': 0.5
          }
        });
        mapRef.current?.addLayer({
          'id': 'outline',
          'type': 'line',
          'source': 'maine',
          'layout': {},
          'paint': {
            'line-color': '#110a5c',
            'line-width': 3
          }
        });


      });
      const bounds = new mapboxgl.LngLatBounds();
      markers.forEach((markerData) => {
        if (typeof markerData.lng !== 'number' || typeof markerData.lat !== 'number') return;
        const popup = new mapboxgl.Popup({
          offset: 20,
          closeButton: false,
          className: 'custom-popup'
        })
          .setHTML(`
  <div class="relative border-none p-4 text-sm bg-white rounded-xl shadow-lg max-w-xs">
    <button 
      class="absolute top-2 right-2 w-7 h-7 flex items-center justify-center rounded-full bg-white hover:bg-red-50 transition "
      onclick="this.parentElement.parentElement.remove()"
      aria-label="Close popup">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 " fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>

    <img src="${markerData.image}" alt="${markerData.title}" 
      class="rounded-lg w-full h-32 object-cover mb-3 shadow-sm" />

    <h3 class="text-lg font-semibold text-gray-900 mb-1">${markerData.title}</h3>
    <p class="text-gray-600 text-sm mb-2">${markerData.description}</p>

    <p class="text-gray-500 text-xs">${markerData.address}</p>
    <p class="text-gray-500 text-xs">${markerData.phone}</p>

   
  </div>
`);





        const el = document.createElement('div');


        el.style.width = "48px";
        el.style.height = "48px";
        el.style.display = "flex";
        el.style.alignItems = "center";
        el.style.justifyContent = "center";

        el.innerHTML = `<img src="/images/locationicon.gif" alt="location" style="width:100%; height:100%;" />`;
        new mapboxgl.Marker({ element: el })
          .setLngLat([markerData.lng, markerData.lat])
          .setPopup(popup)
          .addTo(mapRef.current!);

        bounds.extend([markerData.lng, markerData.lat]);
      });

      if (markers.length > 0) {
        mapRef.current.fitBounds(bounds, { padding: 50, maxZoom: 13 });
      }
    }
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [markers]);

  return <div ref={mapContainerRef} className="w-full h-[100vh]" />;
};

export default Map;




//  const center: [number, number] = useDefaultCenter
//     ? JSON.parse(process.env.NEXT_PUBLIC_DEFAULT_CENTER || "[49.8671, 40.4093]")
//     : [0, 0];
//   const zoom: number = useDefaultCenter
//     ? JSON.parse(process.env.NEXT_PUBLIC_DEFAULT_ZOOM || "10")
//     : 2;