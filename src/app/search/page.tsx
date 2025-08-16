// https://swr.vercel.app/docs/getting-started
//ele bilki axios
'use client'
import dynamic from 'next/dynamic';
import { useState } from 'react';
import useSWR from 'swr'
import { SearchIcon } from 'lucide-react';



const Map = dynamic(() => import('@/components/Map'), { ssr: false });
const fetcher = (url: string) => fetch(url).then(res => res.json())


export default function Search() {
  const [query, setQuery] = useState('')
  const [url, setUrl] = useState<string | null>(null);
  const { data, error, isLoading } = useSWR(url, fetcher)
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) {
      // console.log("error")
      setUrl(null);
      return;
    }
    setUrl(`/api/poi?search=${query}`)

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
        <button type="submit" className="text-gray-600 absolute right-6 top-1/3">
          <SearchIcon />
        </button>


      </form>
      {isLoading &&

        <div role="status" >
          <svg aria-hidden="true" className=" absolute top-1/2  w-[80px] h-[80px] text-gray-200 animate-spin dark:text-gray-300 fill-green-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
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
            title: item.name,
          }))}
           useDefaultCenter={true}
        />
      ) : (
        url && !isLoading && data && data.length === 0 && <p>Nəticə tapılmadı</p>
      )}
{!url && <Map markers={[]} useDefaultCenter={true} />}


    </div>
  )


}