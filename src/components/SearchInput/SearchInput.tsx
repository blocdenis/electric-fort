import React, { useState } from 'react';
import styles from './SearchInput.module.scss';
import { SearchIcon } from '../icons';
import { useQuery } from '@tanstack/react-query';
import useDebounce from '@/hooks/useDebounce';
import { SearchResult } from './SearchResult';
import { useRouter } from 'next/navigation';

interface SearchInputProps {
  placeholder?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({
  placeholder = 'Search...',
}) => {
  const [search, setSearch] = useState('');
  const router = useRouter();

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
  const handleSearch = (e: any) => {
    e.preventDefault();
    if (debouncedSearchTerm) {
      router.replace(`/products?q=${debouncedSearchTerm}`);
    }
  };
  return (
    <div className={styles.search}>
      <input
        type="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder={placeholder}
        className={styles.input}
      />
      <button className={styles.icon} onClick={handleSearch}>
        <SearchIcon />
      </button>
      <div className={styles.results}>
        {data?.data && <SearchResult isLoading={isLoading} data={data.data} />}
      </div>
    </div>
  );
};

export default SearchInput;
