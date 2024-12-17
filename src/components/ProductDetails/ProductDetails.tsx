'use client';
import React from 'react';
import Container from '@/components/Container/Container';
import ContentContainer from '@/components/Container/ContentContainer';
import PopularProductsSection from '@/components/Products/PopularProductSection/PopularProductsSection';
import Section from '@/components/Section/Section';
import SidebarWithAttachments from '@/components/Sidebar/SidebarWithAttachments';
import SingleProduct from '@/components/SingleProduct/SingleProduct';
// import { Product } from '@/lib/types/Product.type';
import Breadcrumbs from '../Breadcrumb/Breadcrumbs';
import {
  getAllBrands,
  getAllCategories,
  getProductById,
} from '@/services/api/api';
// import { Product } from '@/lib/types/types';
import NotFound from '@/app/not-found';
import { useQuery } from '@tanstack/react-query';

interface ProductDetailsProps {
  productId: number;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ productId }) => {
  const { data: productData } = useQuery({
    queryKey: ['product', productId],
    queryFn: () => getProductById(productId, { cache: 'no-store' }),
    staleTime: 10 * 1000,
  });

  const product = productData ? productData[0] : undefined;

  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: () => getAllCategories({ cache: 'no-store' }),
    staleTime: 10 * 1000,
  });

  const { data: brands } = useQuery({
    queryKey: ['brands'],
    queryFn: () => getAllBrands({ cache: 'no-store' }),
    staleTime: 10 * 1000,
  });

  const category = categories?.find((item) => item.id === product?.category_id);
  const brand = brands?.find((item) => item.id === product?.brand_id);

  // const categoryData = await getCategoryById(product?.category_id);
  // const brandData = await getBrandById(product?.brand_id);

  if (!product) {
    return NotFound();
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
