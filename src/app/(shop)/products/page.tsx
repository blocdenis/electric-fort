'use client';
import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Breadcrumbs from '@/components/Breadcrumb/Breadcrumbs';

// Функция для получения данных продуктов с API
const fetchProducts = async (query: string) => {
  const { data } = await axios.get(
    `https://2qtsbt2v-80.euw.devtunnels.ms/api/get/Product?all_data=true&field=name&search=${query}&equal=false&pagination=true&page_size=25&page=1`
  );
  console.log(JSON.stringify(data, null, 2) + ' from products');
  return data;
};

const ProductsList: React.FC<{ query: string }> = ({ query }) => {
  const { data } = useQuery({
    queryKey: ['products', query],
    queryFn: () => fetchProducts(query),
    enabled: !!query,
  });

  const products = data?.data || [];
  return (
    <div>
      <h1>Search results</h1>
      {products.length > 0 ? (
        <ul>
          {products.map((product: any) => (
            <li key={product.id}>{product.name}</li>
          ))}
        </ul>
      ) : (
        <p>No products found</p>
      )}
    </div>
  );
};

const ProductsPage: React.FC = () => {
  const links = [{ name: 'Результати пошуку' }];
  const searchParams = useSearchParams();
  const q = searchParams.get('q');

  if (!q) {
    return <p>Please provide a search query</p>;
  }

  return (
    <div>
      <Breadcrumbs items={links} />

      <Suspense fallback={<div>Loading...</div>}>
        <ProductsList query={q} />
      </Suspense>
    </div>
  );
};

export default ProductsPage;
