"use client";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("@/components/Map"), { ssr: false });

export default function MapPage() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Interactive Map</h1>
      <Map /> 
    </div>
  );
}
