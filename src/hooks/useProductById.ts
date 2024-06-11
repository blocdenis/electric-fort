import { productService } from '@/services/products';
import { useQuery } from '@tanstack/react-query';

export function useProductById(id: number) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['product', id],
    queryFn: async () => {
      const product = await productService.getProductById(id);
      console.log('Fetched product data:', product);
      return product;
    },
    enabled: !!id,
  });

  if (error) {
    console.error('Error fetching product:', error);
  }

  return { product: data, isLoading, error };
}
