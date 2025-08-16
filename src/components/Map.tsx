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
   useDefaultCenter?: boolean;
  markers?: Marker[];
}

const Map: React.FC<MapProps> = ({ markers = [], useDefaultCenter = true }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current) {
      if (!process.env.NEXT_PUBLIC_MAPBOX_TOKEN) return;
      mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

     const center: [number, number] = useDefaultCenter
        ? JSON.parse(process.env.NEXT_PUBLIC_DEFAULT_CENTER || "[49.8671, 40.4093]")
        : [0, 0];
      const zoom: number = useDefaultCenter
        ? JSON.parse(process.env.NEXT_PUBLIC_DEFAULT_ZOOM || "10")
        : 2;

      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current!,
        // bunlara baxmaq dark light mode olsa
        // style:'mapbox://styles/mapbox/satellite-v9',
        // mapbox://styles/mapbox/dark-v11
        // style:'mapbox://styles/mapbox/outdoors-v12',
        style:'mapbox://styles/mapbox/standard',
        center,
        zoom,
      });

      mapRef.current.addControl(new mapboxgl.NavigationControl(), 'bottom-right');
    }

    const bounds = new mapboxgl.LngLatBounds();
    markers.forEach((markerData) => {
      if (typeof markerData.lng !== 'number' || typeof markerData.lat !== 'number') return;

      // const popup = new mapboxgl.Popup({ offset: 20 }).setText(markerData.title);
      const popup = new mapboxgl.Popup({ offset: 20, closeButton: false,  className: 'custom-popup' })
  .setHTML(`
    <div style="
      position: relative;
      padding: 30px 30px;
      font-size: 14px;
      border-radius: 10px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      max-width: 250px;
              background: white;

    ">
      <button style="
        position: absolute;
        top: 6px;
        right: 6px;
        background: white;
        border: none;
        border-radius: 50%;
        width: 22px;
        height: 22px;
        font-size: 14px;
        line-height: 22px;
        text-align: center;
        cursor: pointer;
        transition: background 0.2s;
      " onclick="this.parentElement.parentElement.remove()">×</button>
      <p> Ünvan</p>
      <strong style="color:#333; font-size:15px;">${markerData.title}</strong><br/>
      
    </div>
  `);

      const el = document.createElement('div');
      // el.className = 'custom-marker';
      // el.style.width = "40px";
      // el.style.height = "40px";
      // el.style.transform = "scale(0.5)";
      // el.style.transformOrigin = "center";

      el.style.width = "42px";
      el.style.height = "42px";
      el.style.display = "flex";
      el.style.alignItems = "center";
      el.style.justifyContent = "center";

      el.innerHTML = `<img src="/images/locationicon.gif" alt="location" style="width:100%; height:100%;" />`;
      // el.style.borderRadius = '50%';
      // el.style.backgroundColor = '#ff4d4f';
      // el.style.border = '3px solid #fff';
      // el.style.boxShadow = '0 2px 4px rgba(0,0,0,0.3)';
      // el.innerHTML = `<svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><ellipse cx="64" cy="94.379" rx="54.5" ry="13.333" style="fill:#feded6"/><ellipse cx="64" cy="94.379" rx="33.613" ry="7.176" style="fill:#f6c6bb"/><path d="M64 20.288a29.333 29.333 0 0 0-29.333 29.333C34.667 71.288 64 95.871 64 95.871s29.333-23.917 29.333-46.25A29.333 29.333 0 0 0 64 20.288zm0 42.289a12.956 12.956 0 1 1 12.956-12.956A12.956 12.956 0 0 1 64 62.577z" style="fill:#ec4d85"/><path d="M59.75 20.6a29.337 29.337 0 0 0-25.083 29.021c0 16.51 17.023 34.7 25.13 42.432 8.144-7.624 25.037-25.479 25.037-42.432A29.337 29.337 0 0 0 59.75 20.6zM64 62.577h-8.5a12.956 12.956 0 1 1 0-25.912H64a12.956 12.956 0 1 1 0 25.912z" style="fill:#fd748c"/></svg>`
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

  return <div ref={mapContainerRef} className="w-full h-[100vh]" />;
};

export default Map;
