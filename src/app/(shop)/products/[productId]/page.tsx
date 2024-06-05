import PageBredcramb from '@/components/Breadcrumb/PageBredcramb';
import Container from '@/components/Container/Container';
import ContentContainer from '@/components/Container/ContentContainer';
import PopularProductsSection from '@/components/Products/PopularProductSection/PopularProductsSection';
import Section from '@/components/Section/Section';
import SidebarWithAttachments from '@/components/Sidebar/SidebarWithAttachments';
import SingleProduct from '@/components/SingleProduct/SingleProduct';
import React from 'react';

const ProductDetails = ({ params }: { params: { productId: string } }) => {
  return (
    <Container className="flex">
      <SidebarWithAttachments />

      <ContentContainer>
        <PageBredcramb />
        <Section>
          <SingleProduct />
        </Section>
        <PopularProductsSection title="Також вас можуть зацікавити" />
        <PopularProductsSection title="Нещодавно переглянуті" />
      </ContentContainer>
    </Container>
  );
};

export default ProductDetails;
