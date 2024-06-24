import { useQuery } from '@tanstack/react-query';
import { useReducer, useState } from 'react';
import useDebounce from '@/hooks/useDebounce';
import { Product } from '@/lib/types/types';
import Link from 'next/link';
import { SearchResult } from '../SearchInput/SearchResult';

export default function SearchBox() {
  const [search, setSearch] = useState('');

  const debouncedSearchTerm = useDebounce(search, 200);

  const { data, isLoading } = useQuery({
    queryKey: ['search', debouncedSearchTerm],
    queryFn: async () => {
      if (debouncedSearchTerm) {
        const response = await fetch(
          `https://2qtsbt2v-80.euw.devtunnels.ms/api/get/Product?all_data=true&field=name&search=${debouncedSearchTerm}&equal=false&pagination=true&page_size=25&page=1
          `
        );

        const result = response.json();
        console.log(result);
        return result;
      }
      return { products: [] };
    },

    enabled: !!debouncedSearchTerm,
  });

  const handleSearch = () => {};

  return (
    <div>
      <input
        type="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Enter your search term here"
        className="p-2 w-full focus:outline-none rounded-md bg-gray-600 placeholder:text-gray-500 text-gray-50 focus:ring focus:ring-purple-500"
      />
      <button
        onClick={handleSearch}
        className="mt-2 p-2 bg-purple-500 text-white rounded-md"
      >
        Search
      </button>
      {data?.data && <SearchResult isLoading={isLoading} data={data.data} />}
    </div>
  );
}
