import { useQuery } from '@tanstack/react-query';
import getBrands from './brands';

export const useBrands = () =>
  useQuery({ queryKey: ['brands'], queryFn: getBrands });
