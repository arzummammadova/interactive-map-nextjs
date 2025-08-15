'use client';

import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

type Marker = {
  lng: number;
  lat: number;
  title: string;
};

interface MapProps {
  markers?: Marker[];
}

const Map: React.FC<MapProps> = ({ markers = [] }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current) {
      if (!process.env.NEXT_PUBLIC_MAPBOX_TOKEN) return;
      mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

      const center: [number, number] = JSON.parse(
        process.env.NEXT_PUBLIC_DEFAULT_CENTER || "[49.8671, 40.4093]"
      );
      const zoom: number = JSON.parse(
        process.env.NEXT_PUBLIC_DEFAULT_ZOOM || "10"
      );

      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current!,
        style: 'mapbox://styles/mapbox/streets-v12',
        center,
        zoom,
      });

      mapRef.current.addControl(new mapboxgl.NavigationControl(), 'bottom-right');
    }

    const bounds = new mapboxgl.LngLatBounds();
    markers.forEach((markerData) => {
      if (typeof markerData.lng !== 'number' || typeof markerData.lat !== 'number') return;

      const popup = new mapboxgl.Popup({ offset: 25 }).setText(markerData.title);
      const el = document.createElement('div');
      el.className = 'custom-marker';
      el.style.width = '20px';
      el.style.height = '20px';
      el.style.borderRadius = '50%';
      el.style.backgroundColor = '#ff4d4f';
      el.style.border = '3px solid #fff';
      el.style.boxShadow = '0 2px 4px rgba(0,0,0,0.3)';

      new mapboxgl.Marker({ element: el })
        .setLngLat([markerData.lng, markerData.lat])
        .setPopup(popup)
        .addTo(mapRef.current!);

      bounds.extend([markerData.lng, markerData.lat]);
    });

    if (markers.length > 0) {
      mapRef.current.fitBounds(bounds, { padding: 70, maxZoom: 15 });
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [markers]);

  return <div ref={mapContainerRef} className="w-full h-[100vh] rounded-2xl shadow-xl" />;
};

export default Map;
