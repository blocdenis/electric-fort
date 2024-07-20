import React, { useEffect, useState } from 'react';
import styles from './SearchInput.module.scss';
import { CrossIcon, SearchIcon } from '../icons';
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
  const [isSearchVisible, setIsSearchVisible] = useState(true);
  const router = useRouter();

  const debouncedSearchTerm = useDebounce(search, 200);
  useEffect(() => {
    if (debouncedSearchTerm) {
      setIsSearchVisible(true);
    }
  }, [debouncedSearchTerm]);

  const { data, isLoading } = useQuery({
    queryKey: ['search', debouncedSearchTerm],
    queryFn: async () => {
      if (debouncedSearchTerm) {
        const response = await fetch(
          `https://electrychnafortecia.com/api/get/Product?all_data=true&field=name&search=${debouncedSearchTerm}&equal=false&pagination=true&page_size=25&page=1
          `
        );

        const result = await response.json();
        return result;
      }
      return { products: [] };
    },

    enabled: !!debouncedSearchTerm,
  });

  const handleSearch = (e: any) => {
    e.preventDefault();
    if (debouncedSearchTerm) {
      router.replace(`/products/?q=${debouncedSearchTerm}`);
      setSearch('');
      setIsSearchVisible(true);
    }
  };
  const handleProductClick = () => {
    setIsSearchVisible(false);
  };

  const handleClear = () => {
    setSearch('');
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
      {search && (
        <button className={styles.closeButton} onClick={handleClear}>
          <CrossIcon />
        </button>
      )}
      <div className={styles.line}></div>
      <button className={styles.icon} onClick={handleSearch}>
        <SearchIcon />
      </button>
      {isSearchVisible && (
        <div className={styles.results}>
          {data?.data && (
            <SearchResult
              isLoading={isLoading}
              data={data.data}
              onProductClick={handleProductClick}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default SearchInput;
