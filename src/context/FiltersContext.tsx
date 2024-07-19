'use client';
import { Brand } from '@/lib/types/types';
import { usePathname } from 'next/navigation';
import {
  createContext,
  Dispatch,
  MouseEventHandler,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

type FiltersProviderProps = {
  children: ReactNode;
};

type FiltersContext = {
  minPrice: string;
  maxPrice: string;
  onPriceChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  shownBrands: Brand[] | undefined;
  setShownBrands: Dispatch<SetStateAction<Brand[] | undefined>>;
  selectedBrands: string[];
  setSelectedBrands: Dispatch<SetStateAction<string[]>>;
  onBrandCheckboxChange: (brandId: string) => void;
  setMinPrice: Dispatch<SetStateAction<string>>;
  setMaxPrice: Dispatch<SetStateAction<string>>;
  urlPage: string;
  //   changePage: (newPage: string) => void;
  setUrlPage: Dispatch<SetStateAction<string>>;
  onShowMoreClick: () => void;
  sort: string;
  setSort: Dispatch<SetStateAction<string>>;
};

const FiltersContext = createContext({} as FiltersContext);

export function useFilters() {
  return useContext(FiltersContext);
}

export function FiltersProvider({ children }: FiltersProviderProps) {
  //ForShow more Btn (page params)
  const pathname = usePathname();
  const [urlPage, setUrlPage] = useState<string>('1');
  const handleShowMoreBtnClick = () => {
    setUrlPage((prevPage) => (Number(prevPage) + 1).toString());
  };

  useEffect(() => {
    setUrlPage('1');
  }, [pathname]);

  //For price filter
  const [minPrice, setMinPrice] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>('');
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    switch (e.target.name) {
      case 'minPrice':
        if (e.target.value.includes('-')) {
          setMinPrice(e.target.value.replace('-', '').trim());
        } else {
          setMinPrice(e.target.value);
        }
        break;
      case 'maxPrice':
        if (e.target.value.includes('-')) {
          setMaxPrice(e.target.value.replace('-', '').trim());
        } else {
          setMaxPrice(e.target.value);
        }
        break;
      default:
        console.log('wrong price name');
        break;
    }
  };

  //For Brands filter
  const [shownBrands, setShownBrands] = useState<Brand[] | undefined>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prevSelectedBrands) =>
      prevSelectedBrands.includes(brand)
        ? prevSelectedBrands.filter((b) => b !== brand)
        : prevSelectedBrands[0] !== ''
        ? [...prevSelectedBrands, brand]
        : [brand]
    );
  };

  //For sort
  const [sort, setSort] = useState('');

  return (
    <FiltersContext.Provider
      value={{
        minPrice,
        maxPrice,
        setMinPrice,
        setMaxPrice,
        onPriceChange: handlePriceChange,
        shownBrands,
        setShownBrands,
        selectedBrands,
        setSelectedBrands,
        onBrandCheckboxChange: toggleBrand,
        urlPage,
        setUrlPage,
        onShowMoreClick: handleShowMoreBtnClick,
        sort,
        setSort,
      }}
    >
      {children}
    </FiltersContext.Provider>
  );
}
