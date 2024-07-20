import React from 'react';
import ProductCard from '../Products/ProductCard/ProductCard';
import ProductList from '../Products/ProductList/ProductList';
import Sort from '../Sort/Sort';
import SectionTitle from '../Section/SectionTitle/SectionTitle';

const ProductsList: React.FC<{ productsData: any }> = ({ productsData }) => {
  const products = productsData?.data || [];
  console.log('search' + products);
  return (
    <div>
      <SectionTitle title={'Результати пошуку'} />
      <span>знайдено {products.length} товарів</span>
      <Sort />
      <ProductList products={products} />
    </div>
  );
};

export default ProductsList;
