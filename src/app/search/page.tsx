// https://swr.vercel.app/docs/getting-started
//swr-ele bilki axios
'use client'
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import useSWR from 'swr'
import { SearchIcon } from 'lucide-react';

// a.	İstifadəçinin coğrafi mövqeyini almaq (browser Geolocation API) və xəritəni ona görə mərkəzləşdirmək.

function useDebounce<T>(value: T, delay: number = 400) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup the timeout if value or delay changes
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
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)


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
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) {
      // console.log("error")
      // setUrl(null);
      return;
    }
    // setUrl(`/api/poi?search=${query}`)

  }

  return (
    <div className="flex relative flex-col justify-center items-center min-h-screen">

      <form className='absolute top-5 z-6' onSubmit={handleSearch} action="">
        <input type="text"
          className='bg-white w-[500px] border border-gray-200 rounded-4xl px-7 py-5
          shadow-md'
          placeholder='Ünvan yazaraq axtarış edin...'
          value={query}
          onChange={(e) => { setQuery(e.target.value) }}
        />
        <button type="submit" className="text-gray-600 absolute right-6 top-1/3 cursor-pointer group ">
          <SearchIcon />
          <span className="absolute -top-9 right-1/2 translate-x-1/2 px-4 py-2 text-sm text-white bg-black rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            Axtarış edin
          </span>
        </button>




      </form>
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

          markers={data.map((item: any) => ({
            lat: item.lat,
            lng: item.lng,
            title: item.title,
            image: item.image,
            address: item.adress || '',
            description: item.description || '',
            category: item.category || '',
            phone: item.phone || '',
            link: item.link || '#',
          }))}

          center={userLocation || undefined}
          // useDefaultCenter={true}
          useDefaultCenter={!userLocation}

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