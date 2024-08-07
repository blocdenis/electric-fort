import React from 'react';
import ProductCard from '../Products/ProductCard/ProductCard';
import ProductList from '../Products/ProductList/ProductList';
import Sort from '../Sort/Sort';
import SectionTitle from '../Section/SectionTitle/SectionTitle';
import styles from './ProductList.module.scss';

const ProductsList: React.FC<{ productsData: any }> = ({ productsData }) => {
  const products = productsData?.data || [];
  console.log('search' + products);
  return (
    <div className={styles.wrapper}>
      <div className={styles.heading}>
        <SectionTitle title={'Результати пошуку'} />
      </div>

      <span className={styles.counter}>Знайдено {products.length} товарів</span>
      <div className="px-6">
        <Sort />
      </div>

      <ProductList products={products} />
    </div>
  );
};

export default ProductsList;
