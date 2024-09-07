import React from 'react';
import Sidebar from './Sidebar';
import CatalogList from '../Navigation/CatalogList';
import ContactText from '../Contact/ContactText/ContactText';
import ContactContent from '../Contact/ContactContent/ContactContent';
import Map from '../Map/Map';
import Filters from '../Filters/Filters';
import { Brand } from '@/lib/types/types';

function SidebarWithAttachments({ showFilters }: { showFilters: boolean }) {
  return (
    <Sidebar>
      <div className=" laptop:sticky laptop:top-[257px]">
        {showFilters && <Filters />}
        <CatalogList />
        <div className="flex flex-col gap-4  mt-8">
          <h3 className=" mb-4">Контакти</h3>
          <ContactText textToCopy="+38(066) 459-88-87" color="white" />
          <ContactText textToCopy="+38(068) 459-88-87" color="white" />
          <ContactContent color="white" />
        </div>
        <Map className=" mt-6 h-[183px] w-[304px] bg-gray-100" />
      </div>
    </Sidebar>
  );
}

export default SidebarWithAttachments;
