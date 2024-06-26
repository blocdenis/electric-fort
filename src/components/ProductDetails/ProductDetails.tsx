// 'use client';
import React from 'react';
import Container from '@/components/Container/Container';
import ContentContainer from '@/components/Container/ContentContainer';
import PopularProductsSection from '@/components/Products/PopularProductSection/PopularProductsSection';
import Section from '@/components/Section/Section';
import SidebarWithAttachments from '@/components/Sidebar/SidebarWithAttachments';
import SingleProduct from '@/components/SingleProduct/SingleProduct';
import { Product } from '@/lib/types/Product.type';
import Breadcrumbs from '../Breadcrumb/Breadcrumbs';
import { getBrands, getCategories } from '@/services/api/api';

interface ProductDetailsProps {
  product: Product;
}

const ProductDetails: React.FC<ProductDetailsProps> = async ({ product }) => {
  const brandsServer = await getBrands();
  const categoriesServer = await getCategories();

  const brand = brandsServer?.find((brand) => brand.id === product.brand_id);
  const category = categoriesServer?.find(
    (category) => category.id === brand?.category_id
  );

  const breadcrumbsItens = [
    { name: 'Категорії', href: '/categories' },
    { name: category?.name, href: `/categories/${category?.id}` },
    { name: brand?.name, href: `/categories/${category?.id}/${brand?.id}` },
    { name: product.name },
  ];
  return (
    <Container className="flex">
      <SidebarWithAttachments />
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
