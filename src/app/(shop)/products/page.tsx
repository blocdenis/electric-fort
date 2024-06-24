'use client';
import React from 'react';
import { useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Breadcrumbs from '@/components/Breadcrumb/Breadcrumbs';

const fetchProducts = async (query: string) => {
  const { data } = await axios.get(
    `https://2qtsbt2v-80.euw.devtunnels.ms/api/get/Product?all_data=true&field=name&search=${query}&equal=false&pagination=true&page_size=25&page=1`
  );
  console.log(JSON.stringify(data, null, 2) + ' from products');
  return data;
};

const ProductsList: React.FC = () => {
  const links = [{ name: 'Результати пошуку' }];
  const searchParams = useSearchParams();
  const q = searchParams.get('q');

  const { data, error, isLoading } = useQuery({
    queryKey: ['products', q],
    queryFn: () => fetchProducts(q || ''),
    enabled: !!q,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading products</div>;
  const products = data?.data || [];
  return (
    <div>
      <Breadcrumbs items={links} />
      <h1>Search results</h1>
      {products?.length > 0 ? (
        <ul>
          {products?.map((product: any) => (
            <li key={product.id}>{product.name}</li>
          ))}
        </ul>
      ) : (
        <p>No products found</p>
      )}
    </div>
  );
};

export default ProductsList;
