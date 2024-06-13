'use client';
import React from 'react';
import { useProducts } from '@/hooks/useProducts';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumb/Breadcrumbs';

const ProductsList: React.FC = () => {
  const { products, isLoading, error } = useProducts();
  console.log(products);
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading products</div>;
  const links = [{ name: 'Результати пошуку' }];

  return (
    <div>
      <Breadcrumbs items={links} />
      <h1>Products List</h1>
      <ul>
        {products?.map((product) => (
          <li key={product.id}>
            <Link href={`/products/${product.id}`}>
              {product.name} - {product.price}$
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductsList;
