'use client';
import { TABS } from '@/constants';
import React, { useState } from 'react';
import './SingleProduct.scss';
import ProductDescription from './ProductDescription';
import ProductSpecification from './ProductSpecification';
import ProductReview from './ProductReview';
import { Product } from '@/lib/types/Product.type';
const SingleProduct = ({ product }: { product: Product }) => {
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
      {currentTab === TABS.DESCRIPTION && (
        <ProductDescription product={product} />
      )}
      {currentTab === TABS.SPECIFICATION && (
        <ProductSpecification product={product} />
      )}
      {currentTab === TABS.REVIEW && <ProductReview product={product} />}
      <div className="description-container">
        <h1>Опис</h1>
        {product.description}
      </div>
    </div>
  );
};

export default SingleProduct;
