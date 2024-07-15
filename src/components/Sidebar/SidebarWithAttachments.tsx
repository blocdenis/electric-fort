import React from 'react';
import Sidebar from './Sidebar';
import CatalogList from '../Navigation/CatalogList';
import ContactText from '../Contact/ContactText/ContactText';
import ContactContent from '../Contact/ContactContent/ContactContent';
import Map from '../Map/Map';
import Filters from '../Filters/Filters';
import { Brand } from '@/lib/types/types';

function SidebarWithAttachments({
  showFilters,
}: // brands,
// selectedBrands,
// onBrandCheckboxChange,
// minPrice,
// maxPrice,
// onPriceChange,
{
  showFilters: boolean;
  // brands?: Brand[];
  // selectedBrands?: string[];
  // onBrandCheckboxChange?: (brandId: string) => void;
  // minPrice?: string;
  // maxPrice?: string;
  // onPriceChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <Sidebar>
      {showFilters && (
        <Filters
        // brands={brands}
        // selectedBrands={selectedBrands}
        // onBrandCheckboxChange={onBrandCheckboxChange}
        // minPrice={minPrice}
        // maxPrice={maxPrice}
        // onPriceChange={onPriceChange}
        />
      )}
      <CatalogList />
      <div className="flex flex-col gap-4  mt-8">
        <h3 className=" mb-4">Контакти</h3>
        <ContactText textToCopy="+38(066) 459-88-87" color="white" />
        <ContactText textToCopy="+38(068) 459-88-87" color="white" />
        <ContactContent color="white" />
      </div>
      <Map className=" mt-6" />
    </Sidebar>
  );
}

export default SidebarWithAttachments;
