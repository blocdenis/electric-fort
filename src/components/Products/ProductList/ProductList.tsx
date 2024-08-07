'use client';
import React, { useEffect, useState } from 'react';
import ProductCard from '../ProductCard/ProductCard';
import { Product } from '@/lib/types/types';

interface ProductListProps {
  // id: number;
  // page: number;
  // pageSize: number;
  products: Product[] | undefined;
}
function ProductList({ products }: ProductListProps) {
  if (!products?.length) {
    return (
      <div className=" flex justify-center w-full items-center font-bold">
        По вашому запиту нічого не знайдено
      </div>
    );
  }

  return (
    <ul className=" justify-items-center justify-center grid laptop:pl-6 tablet:grid-cols-2 desktop:grid-cols-3 gap-x-[45px] gap-y-8">
      {products.map(
        ({
          id,
          name,
          unit_of_measurement,
          price,
          description,
          in_stock,
          popular,
          images,
          series_id,
          subseries_id,
          subsubseries_id,
          brand_id,
          category_id,
          updated_info_date,
          add_date,
          article,
        }) => (
          <ProductCard
            key={id}
            id={id}
            name={name}
            unit_of_measurement={unit_of_measurement}
            price={price}
            description={description}
            in_stock={in_stock}
            popular={popular}
            images={images}
            series_id={series_id}
            subseries_id={subseries_id}
            subsubseries_id={subsubseries_id}
            category_id={category_id}
            brand_id={brand_id}
            updated_info_date={updated_info_date}
            add_date={add_date}
            article={article}
          />
        )
      )}
    </ul>
  );
}

export default ProductList;
