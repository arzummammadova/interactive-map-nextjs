'use client';

import { useState } from 'react';
import useSWR from 'swr';
import dynamic from 'next/dynamic';

const Map = dynamic(() => import('@/components/Map'), { ssr: false });

const fetcher = (url: string) =>
  fetch(`${window.location.origin}${url}`).then(res => res.json());

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [url, setUrl] = useState<string | null>(null);

  const { data, error, isLoading } = useSWR(url, fetcher);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setUrl(`/api/poi?search=${query}`);
  };

  return (
    <div className="p-4 flex flex-col gap-4">
      <form onSubmit={handleSearch} className="flex gap-2">
        <input
          type="text"
          placeholder="Açar söz və ya kateqoriya"
          value={query}
          onChange={e => setQuery(e.target.value)}
          className="border p-2 flex-1 rounded"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Axtar
        </button>
      </form>

      {isLoading && <p>Yüklənir...</p>}
      {error && <p className="text-red-500">Xəta baş verdi</p>}

      {data && data.length > 0 ? (
        <Map
          markers={data.map((item: any) => ({
            lat: item.lat,
            lng: item.lng,
            title: item.name,
          }))}
        />
      ) : (
        url && !isLoading && <p>Nəticə tapılmadı</p>
      )}
    </div>
  );
}
