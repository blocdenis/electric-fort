// 'use client';
import React from 'react';
import Container from '@/components/Container/Container';
import ContentContainer from '@/components/Container/ContentContainer';
import PopularProductsSection from '@/components/Products/PopularProductSection/PopularProductsSection';
import Section from '@/components/Section/Section';
import SidebarWithAttachments from '@/components/Sidebar/SidebarWithAttachments';
import SingleProduct from '@/components/SingleProduct/SingleProduct';
// import { Product } from '@/lib/types/Product.type';

import Breadcrumbs from '../Breadcrumb/Breadcrumbs';
import { getBrandById, getCategoryById } from '@/services/api/api';
import { Product } from '@/lib/types/types';
import NotFound from '@/app/not-found';

interface ProductDetailsProps {
  product: Product;
}

const ProductDetails: React.FC<ProductDetailsProps> = async ({ product }) => {
  const categoryData = await getCategoryById(product.category_id);
  const brandData = await getBrandById(product.brand_id);

  if (!categoryData || !brandData) {
    return NotFound();
  }

  const [category] = categoryData;
  const [brand] = brandData;

  const breadcrumbsItens = [
    { name: 'Категорії', href: '/categories' },
    { name: category?.name, href: `/categories/${category?.id}` },
    { name: brand?.name, href: `/categories/${category?.id}/${brand?.id}` },
    { name: product.name },
  ];
  return (
    <Container className="flex">
      <SidebarWithAttachments showFilters={false} />
      <ContentContainer>
        <Breadcrumbs items={breadcrumbsItens} />
        <Section>
          <SingleProduct product={product} />
        </Section>
        <PopularProductsSection title="Також вас можуть зацікавити" />
        <PopularProductsSection title="Нещодавно переглянуті" />
      </ContentContainer>
    </Container>
 
  );
};

export default ProductDetails;
