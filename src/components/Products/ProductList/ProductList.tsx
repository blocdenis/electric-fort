import React from 'react';
import ProductCard from '../ProductCard/ProductCard';
import { Product } from '@/lib/types/types';

interface ProductListProps {
  products: Product[] | undefined;
}
function ProductList({ products }: ProductListProps) {
  return (
    <ul className=" pl-6 grid laptop:grid-cols-2 desktop:grid-cols-3 gap-x-[45px] gap-y-8">
      {products?.length ? (
        products?.map(
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
        )
      ) : (
        <div className="pl-6">Тут поки нема товарів</div>
      )}
    </ul>
  );
}

export default ProductList;
