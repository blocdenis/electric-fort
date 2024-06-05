'use client';
import { TABS } from '@/constants';
import React, { useState } from 'react';
import './SingleProduct.scss';
import ProductDescription from './ProductDescription';
import ProductSpecification from './ProductSpecification';
import ProductReview from './ProductReview';
import { products } from '@/lib/db/products';
const SingleProduct = () => {
  const [currentTab, setCurrentTab] = useState(TABS.DESCRIPTION);

  const handleChange = (e: React.MouseEvent<HTMLLIElement>) => {
    setCurrentTab(e.currentTarget.innerText);
  };

  return (
    <div className="pl-6">
      <section>
        <ul className="tabs">
          <li
            onClick={handleChange}
            className={`tab ${
              currentTab === TABS.DESCRIPTION ? 'active-tab' : ''
            }`}
          >
            {TABS.DESCRIPTION}
          </li>
          <li
            onClick={handleChange}
            className={`tab ${
              currentTab === TABS.SPECIFICATION ? 'active-tab' : ''
            }`}
          >
            {TABS.SPECIFICATION}
          </li>
          <li
            onClick={handleChange}
            className={`tab ${currentTab === TABS.REVIEW ? 'active-tab' : ''}`}
          >
            {TABS.REVIEW}
          </li>
        </ul>
      </section>
      {currentTab === TABS.DESCRIPTION && <ProductDescription />}
      {currentTab === TABS.SPECIFICATION && <ProductSpecification />}
      {currentTab === TABS.REVIEW && <ProductReview />}
      <div className="description-container">
        <h1>Опис</h1>
        {products[0].description}
      </div>
    </div>
  );
};

export default SingleProduct;
