'use client';
import { TABS } from '@/constants';
import React, { useState } from 'react';
import './SingleProduct.scss';
import ProductDescription from './ProductDescription';
import ProductSpecification from './ProductSpecification';
import ProductReview from './ProductReview';
import { Product } from '@/lib/types/Product.type';
import { useQuery } from '@tanstack/react-query';
import {
  getBrandById,
  getProductReviewsByProductId,
  getSeriaById,
} from '@/services/api/api';
import Loading from '../Loading/Loading';
const SingleProduct = ({ product }: { product: Product }) => {
  const { data: reviewsData, isLoading } = useQuery({
    queryKey: ['reviews', product.id],
    queryFn: () => getProductReviewsByProductId(product.id),
    staleTime: 10 * 1000,
  });

  const { data: brand, isLoading: isLoadingBrand } = useQuery({
    queryKey: ['brand', product.brand_id],
    queryFn: () => getBrandById(product.brand_id),
    staleTime: 10 * 1000,
  });
  const { data: brandSeries, isLoading: isLoadingSeria } = useQuery({
    queryKey: ['brandSeries', product.series_id],
    queryFn: () => getSeriaById(product.series_id ?? 0),
    staleTime: 10 * 1000,
  });

  const [currentTab, setCurrentTab] = useState(TABS.DESCRIPTION);

  const handleChange = (e: React.MouseEvent<HTMLLIElement>) => {
    setCurrentTab(e.currentTarget.innerText);
  };

  if (isLoading || isLoadingBrand || isLoadingSeria) {
    return <Loading />;
  }

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
            className={`tab ${
              currentTab === `${TABS.REVIEW} ${reviewsData?.count}`
                ? 'active-tab'
                : ''
            }`}
          >
            {`${TABS.REVIEW} ${reviewsData?.count}`}
          </li>
        </ul>
      </section>
      {currentTab === TABS.DESCRIPTION && (
        <ProductDescription product={product} />
      )}
      {currentTab === TABS.SPECIFICATION && (
        <ProductSpecification
          product={product}
          brand={brand}
          brandSeries={brandSeries}
        />
      )}
      {currentTab === `${TABS.REVIEW} ${reviewsData?.count}` && (
        <ProductReview product={product} reviews={reviewsData?.data} />
      )}
      <div className="description-container">
        <h1>Опис</h1>
        {product.description}
      </div>
    </div>
  );
};

export default SingleProduct;
