'use client'
import Link from "next/link";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Map, Search, ArrowRight } from "lucide-react";

const MapPreview = dynamic(() => import('@/components/Map'), { 
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-purple-100 to-blue-100 opacity-95" />
});

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-50 via-purple-50 to-blue-50 overflow-hidden">
      <div className="absolute inset-0 z-0 ">
        <MapPreview markers={[]} useDefaultCenter={false} />
      </div>

      <motion.div 
        className="relative z-10 flex flex-col items-center gap-6 text-center px-6 w-full max-w-4xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h1 
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold "
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <span className=" text-black">
           Map<span className="text-[#1554a8]">Geo</span>
          </span>
          <br />
          {/* <motion.span 
            className="inline-block"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Xoş Gəlmisiniz
          </motion.span> */}
        </motion.h1>

        <motion.p 
          className="mt-4 text-lg sm:text-xl md:text-2xl text-gray-700 max-w-2xl leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          Burada siz axtarış edə və interaktiv xəritə zərində markerlənmiş yerlərə baxa bilərsiniz
        </motion.p>

        <motion.div 
          className="flex flex-col sm:flex-row gap-4 sm:gap-6 mt-8 w-full justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <Link
            href="/map"
            className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold rounded-xl transition-all duration-300 hover:from-blue-500 hover:to-blue-400 flex items-center justify-center gap-2"
          >
            <Map className="transition-transform group-hover:scale-110" />
            <span>Xəritəyə Keç</span>
            <ArrowRight className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
          </Link>

          <Link
            href="/search"
            className="group px-8 py-4 bg-white
            border border-green-400
            text-white font-semibold rounded-xl transition-all duration-300 hover:from-green-500 hover:to-green-500 flex items-center justify-center gap-2"
          >
            <Search className=" text-green-500 transition-transform group-hover:scale-110" />
            <span className="text-green-500">Axtarış</span>
            <ArrowRight className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-green-500" />
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}