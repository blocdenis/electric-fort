'use client';
import React from 'react';
import PageBredcramb from '@/components/Breadcrumb/PageBredcramb';
import Container from '@/components/Container/Container';
import ContentContainer from '@/components/Container/ContentContainer';
import PopularProductsSection from '@/components/Products/PopularProductSection/PopularProductsSection';
import Section from '@/components/Section/Section';
import SidebarWithAttachments from '@/components/Sidebar/SidebarWithAttachments';
import SingleProduct from '@/components/SingleProduct/SingleProduct';
import { Product } from '@/lib/types/Product.type';

interface ProductDetailsProps {
  product: Product;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  return (
    <Container className="flex">
      <SidebarWithAttachments />
      <ContentContainer>
        <PageBredcramb />
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
