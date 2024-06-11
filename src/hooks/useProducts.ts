import { useQuery } from '@tanstack/react-query';
import { productService } from '@/services/products';

export function useProducts() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: productService.getProducts,
  });

  return { products: data ?? [], isLoading, error };
}
