import React from 'react';
import Sidebar from './Sidebar';
import CatalogList from '../Navigation/CatalogList';
import ContactText from '../Contact/ContactText/ContactText';
import ContactContent from '../Contact/ContactContent/ContactContent';
import Map from '../Map/Map';
import { categories } from '@/lib/db/categories';
import { brands } from '@/lib/db/brands';

function SidebarWithAttachments() {
  return (
    <Sidebar>
      <CatalogList categories={categories} brands={brands} />
      <div className="flex flex-col gap-4  mt-8">
        <h3 className=" mb-4">Контакти</h3>
        <ContactText color="white" />
        <ContactText color="white" />
        <ContactContent color="white" />
      </div>
      <Map className=" mt-6" />
    </Sidebar>
  );
}

export default SidebarWithAttachments;
