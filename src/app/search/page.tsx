// https://swr.vercel.app/docs/getting-started
//swr-ele bilki axios
'use client'
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import useSWR from 'swr'
import { ClosedCaption, SearchIcon, X } from 'lucide-react';
import { MapPin, Phone, Globe, Clock, ArrowLeft } from "lucide-react";

// a.	İstifadəçinin coğrafi mövqeyini almaq (browser Geolocation API) və xəritəni ona görə mərkəzləşdirmək.

function useDebounce<T>(value: T, delay: number = 400) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}


const Map = dynamic(() => import('@/components/Map'), { ssr: false });
const fetcher = (url: string) => fetch(url).then(res => res.json())


export default function Search() {
  const [query, setQuery] = useState('')
  // const [url, setUrl] = useState<string | null>(null);

  const debouncedInput = useDebounce(query, 500);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [showSidebar, setshowSidebar] = useState(false);

  const [selected, setSelected] = useState<any>(null);


  const url = debouncedInput ? `/api/poi?search=${debouncedInput}` : null;

  // const { error, isLoading } = useSWR(url, fetcher);

  // const { data = [] } = useSWR(url, fetcher);

  const { data = [], error, isLoading } = useSWR(url, fetcher);


  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setUserLocation({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude
          })
        },
        () => {
          // console.warn("error ", err.message)
          // setUserLocation(null)

          const def = JSON.parse(process.env.NEXT_PUBLIC_DEFAULT_CENTER || "[49.8671,40.4093]");
          setUserLocation({ lat: def[1], lng: def[0] });
        }
      )
    }

    return () => {

    };
  }, []);

  useEffect(() => {
    if (data && data.length > 0) {
      setshowSidebar(true)
    }
    else {
      setshowSidebar(false)

    }


  }, [data]);
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
   if (query.trim()) {
    setSelected(null);
  }
    // setUrl(`/api/poi?search=${query}`)

  }
  const closeButton = (e: React.MouseEvent) => {
    e.stopPropagation();
    setshowSidebar(false);
    setSelected(null);
    setQuery('');
  };

  return (
    <div className="flex relative flex-col justify-center items-center min-h-screen">
      <form
        className="absolute top-5 
        z-10 w-full 
        flex justify-center px-3"
        onSubmit={handleSearch}
      >
        <div className="relative w-full sm:w-[320px] md:w-[400px] lg:w-[500px]">
          <input
            type="text"
            className="w-full flex flex-col z-50 bg-white border border-gray-200 rounded-4xl pl-6 pr-12 py-3 sm:py-2 sm:text-sm md:py-3 md:text-base lg:py-5 shadow-md 
                 focus:outline-none focus:ring-2 focus:ring-gray-200 transition"
            placeholder="Ünvan yazaraq axtarış edin..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          <button
            type="submit"
            className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer group"
          >
            <SearchIcon className="w-5 h-5 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" />
            <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1 text-xs sm:text-[11px] text-white bg-black rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
              Axtarış edin
            </span>
          </button>
        </div>
      </form>
      {showSidebar ? (
        <div
          className={` hidden lg:flex lg:flex-col  absolute top-0 left-0 h-full z-15 bg-white shadow-xl 
    overflow-y-auto rounded-r-2xl transition-all duration-300
    w-96 ${showSidebar ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"}
  `}
        >
          <div className="flex items-center justify-between  px-4 py-4">
            <h2 className=" text-gray-500 text-xl ">
              Axtarış nəticələri
            </h2>
            <X onClick={closeButton} className='text-gray-500' />
          </div>


          {!selected ? (
            data.map((item: any, idx: number) => (
              <div
                key={idx}
                onClick={() => setSelected(item)}
                className="mb-4 border-b border-b-gray-200 pb-3 flex justify-between items-center cursor-pointer hover:bg-gray-50 px-4 py-2 transition rounded-lg"
              >
                <div>
                  <h3 className="font-semibold text-gray-800">{item.title}</h3>

                  <p className="text-sm text-gray-600">{item.address}</p>
                </div>
                <img
                  className="w-20 h-20 rounded-lg object-cover shadow"
                  src={item.image}
                  alt={item.title}
                />
              </div>
            ))
          ) : (
            <div className="flex flex-col">
              <div className="relative">
                <img
                  src={selected.image}
                  alt={selected.title}
                  className="w-full h-60 object-cover"
                />
                <button
                  onClick={() => setSelected(null)}
                  className="absolute top-3 left-3 bg-white rounded-full p-2 shadow hover:bg-gray-100"
                >
                  <ArrowLeft size={18} />
                </button>
              </div>

              <div className="p-4 space-y-4">
                <h2 className="text-2xl font-bold text-gray-800">
                  {selected.title}
                </h2>
                <p className="text-gray-600 text-sm">
                  {selected.description || ""}
                </p>
                <p className="text-gray-500 text-md">
                  {selected.category ? `Kateqoriya: ${selected.category}` : ""}
                </p>

                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-gray-700">
                    <MapPin size={20} className="text-blue-600" />
                    <span>{selected.address}</span>
                  </div>

                  <div className="flex items-center gap-2 text-gray-700">
                    <Phone size={20} className="text-blue-600" />
                    <a
                      href={`tel:${selected.phone}`}
                      className="hover:underline"
                    >
                      {selected.phone}
                    </a>
                  </div>

                  <div className="flex items-center gap-2 text-gray-700">
                    <Globe size={20} className="text-blue-600" />
                    <a
                      href={selected.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {selected.link}
                    </a>
                  </div>

                  {selected.hours && (
                    <div className="flex align-center items-center gap-2 text-gray-700">
                      <Clock size={22} className="text-blue-600" />
                      <span>{selected.hours}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      ) : null}


      {isLoading &&

        <div role="status" >
          <svg aria-hidden="true" className=" absolute top-1/2  w-[50px] h-[50px] text-gray-200 animate-spin dark:text-gray-300 fill-green-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>

      }

      {error && <p className="text-red-500">Xəta baş verdi</p>}
      {data && data.length > 0 ? (

        <Map
          markers={
            selected
              ? [
                {
                  lat: selected.lat,
                  lng: selected.lng,
                  title: selected.title,
                  image: selected.image,
                  address: selected.address || '',
                  description: selected.description || '',
                  category: selected.category || '',
                  phone: selected.phone || '',
                  link: selected.link || '#',
                },
              ]
              : data.map((item: any) => ({
                lat: item.lat,
                lng: item.lng,
                title: item.title,
                image: item.image,
                address: item.address || '',
                description: item.description || '',
                category: item.category || '',
                phone: item.phone || '',
                link: item.link || '#',
              }))
          }
          center={
            selected
              ? { lat: selected.lat, lng: selected.lng }
              : userLocation || undefined
          }
          useDefaultCenter={!userLocation && !selected}
        />

      ) : (
        url && !isLoading && data && data.length === 0 && <p>Nəticə tapılmadı</p>
      )}
      {!url && <Map markers={data.map((item: any) => ({
        lat: item.lat,
        lng: item.lng,
        title: item.title,
        image: item.image,
        address: item.adress || '',
        description: item.description || '',
        category: item.category || '',
        phone: item.phone || '',
        link: item.link || '#',
      }))} center={userLocation ?? undefined} />
      }


    </div>
  )


}