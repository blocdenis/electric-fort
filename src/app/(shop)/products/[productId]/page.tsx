import React from 'react';
import ProductDetails from '@/components/ProductDetails/ProductDetails';
import { productService } from '@/services/products';

interface ProductDetailsPageProps {
  params: { productId: string };
}

const ProductDetailsPage: React.FC<ProductDetailsPageProps> = async ({
  params,
}) => {
  const newid = Number(params.productId);
  const product = await productService.getProductById(newid);

  return <ProductDetails product={product} />;
};

export default ProductDetailsPage;
