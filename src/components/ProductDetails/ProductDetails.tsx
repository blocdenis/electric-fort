'use client';
import React from 'react';
import Container from '@/components/Container/Container';
import ContentContainer from '@/components/Container/ContentContainer';
import PopularProductsSection from '@/components/Products/PopularProductSection/PopularProductsSection';
import Section from '@/components/Section/Section';
import SidebarWithAttachments from '@/components/Sidebar/SidebarWithAttachments';
import SingleProduct from '@/components/SingleProduct/SingleProduct';
import Breadcrumbs from '../Breadcrumb/Breadcrumbs';
import {
  getBrandById,
  getCategoryById,
  getProductById,
} from '@/services/api/api';
import NotFound from '@/app/not-found';
import { useQuery } from '@tanstack/react-query';
import Loading from '../Loading/Loading';

interface ProductDetailsProps {
  productId: number;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ productId }) => {
  const { data: productData, isLoading: isLoadingProductData } = useQuery({
    queryKey: ['product', productId],
    queryFn: () => getProductById(productId, { cache: 'no-store' }),
    staleTime: 10 * 1000,
  });

  const product = productData ? productData[0] : undefined;

  const { data: productCategory, isLoading: isLoadingCategory } = useQuery({
    queryKey: ['category'],
    queryFn: () =>
      getCategoryById(product?.category_id ?? 0, { cache: 'no-store' }),
    staleTime: 10 * 1000,
  });

  const { data: productBrand, isLoading: isLoadingBrand } = useQuery({
    queryKey: ['brand', product?.id],
    queryFn: () => getBrandById(product?.brand_id ?? 0, { cache: 'no-store' }),
    staleTime: 10 * 1000,
  });

  let category;
  let brand;

  if (productCategory) {
    category = productCategory[0];
  }
  if (productBrand) {
    brand = productBrand[0];
  }

  if (isLoadingCategory || isLoadingBrand) {
    return <Loading />;
  }

  if (!product) {
    return <NotFound />;
  }

  const breadcrumbsItens = [
    { name: 'Категорії', href: '/categories' },
    { name: category?.name, href: `/categories/${category?.id}` },
    { name: brand?.name, href: `/categories/${category?.id}/${brand?.id}` },
    { name: product?.name },
  ];
  return (
    <Container className="flex">
      <SidebarWithAttachments showFilters={false} />
      <ContentContainer>
        {isLoadingProductData ? (
          <Loading />
        ) : (
          <>
            <Breadcrumbs items={breadcrumbsItens} />
            <Section>
              <SingleProduct product={product} />
            </Section>
          </>
        )}
        <PopularProductsSection title="Також вас можуть зацікавити" />
        <PopularProductsSection title="Нещодавно переглянуті" />
      </ContentContainer>
    </Container>
  );
};

export default ProductDetails;
