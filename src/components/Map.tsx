import React, { useEffect, useRef } from 'react'
import mapboxgl from 'mapbox-gl';
const Map:React.FC = () => {
  const MapContainerRef=useRef<HTMLDivElement | null> (null)

  useEffect(() => {
    if(!process.env.NEXT_PUBLIC_MAPBOX_TOKEN){
      console.log("token yoxdurrr")
    }
     mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

     const center:[number,number]=JSON.parse(
      process.env.NEXT_PUBLIC_DEFAULT_CENTER || "[49.8671, 40.4093]"

     )
     const zoom:number=JSON.parse(
      process.env.NEXT_PUBLIC_DEFAULT_ZOOM || "10"

     )

     const map = new mapboxgl.Map({
        container: MapContainerRef.current!,
        style: 'mapbox://styles/mapbox/standard',
        projection: 'globe', 
        zoom, 
        center
    });
    

    
    return () => {
      map.remove()
      
      
    };
  }, []);
    
  return <div ref={MapContainerRef} className="w-full h-[400px]  rounded-2xl" />;

}

export default Map
