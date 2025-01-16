import React from 'react';
import ProductDetails from '@/components/ProductDetails/ProductDetails';
import getQueryClient from '@/lib/utils/getQueryClient';
import { getProductById } from '@/services/api/api';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';

interface ProductDetailsPageProps {
  params: { productId: string };
}

const ProductDetailsPage: React.FC<ProductDetailsPageProps> = async ({
  params,
}) => {
  const productId = Number(params.productId);
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['product', productId],
    queryFn: () => getProductById(productId, { cache: 'no-store' }),
    staleTime: 10 * 1000,
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <ProductDetails productId={productId} />
    </HydrationBoundary>
  );
};

export default ProductDetailsPage;
