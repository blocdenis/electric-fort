import { useQuery } from '@tanstack/react-query';
import getBrands from '../services/brands';

export const useBrands = () =>
  useQuery({ queryKey: ['brands'], queryFn: getBrands });
