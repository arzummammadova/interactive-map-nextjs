'use client'
import Link from "next/link";
import dynamic from "next/dynamic";

const MapPreview = dynamic(() => import('@/components/Map'), { ssr: false });

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 overflow-hidden">

      <div className="absolute inset-0 z-0 opacity-90 blur-sm">
        <MapPreview markers={[]} useDefaultCenter={false} />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-6 text-center px-6">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 drop-shadow-lg animate-fadeIn">
          Interaktiv Xəritəyə <br /> Xoş Gəlmisiniz
        </h1>

        <p className="mt-4 text-base sm:text-lg md:text-xl text-gray-800 max-w-xl animate-fadeIn animation-delay-500">
          Burada siz axtarış edə və map markerlənmiş yerlərə baxa bilərsiniz
        </p>

        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mt-8 animate-fadeIn animation-delay-1000">
          <Link
            href="/map"
            className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-full shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:bg-blue-500"
          >
            Xəritəyə Keç
          </Link>

          <Link
            href="/search"
            className="px-8 py-4 bg-green-600 text-white font-semibold rounded-full shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:bg-green-500"
          >
            Axtarış
          </Link>
        </div>
      </div>

     
    </div>
  );
}
