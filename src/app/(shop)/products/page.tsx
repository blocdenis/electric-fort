import React from 'react';
import { Suspense } from 'react';
import Breadcrumbs from '@/components/Breadcrumb/Breadcrumbs';
import ProductsList from '@/components/ProductList/ProductList';
import { fetchProducts } from '@/services/products';

const ProductsPage = async ({ searchParams }: any) => {
  const query = searchParams.q || '';
  if (!query) {
    return <p>Please provide a search query</p>;
  }
  const productsData = await fetchProducts(query);

  return (
    <div>
      <Breadcrumbs items={[{ name: 'Результати пошуку' }]} />
      <Suspense fallback={<div>Loading...</div>}>
        <div className="py-6 lg:py-10">
          <ProductsList productsData={productsData} />
        </div>
      </Suspense>
    </div>
  );
};

export default ProductsPage;
