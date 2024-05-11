import React from 'react';
import Sidebar from './Sidebar';
import CatalogList from '../Navigation/CatalogList';
import classNames from 'classnames';
import stylesFooter from '@/components/Footer/Footer.module.scss';
import ContactText from '../Contact/ContactText/ContactText';
import ContactContent from '../Contact/ContactContent/ContactContent';
import Map from '../Map/Map';

function SidebarWithAttachments() {
  return (
    <Sidebar>
      <CatalogList />
      <div className={classNames(stylesFooter.block, ' mt-8')}>
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
