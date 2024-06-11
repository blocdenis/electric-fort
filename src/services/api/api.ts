import { Brand, Category, Product } from '@/lib/types/types';

export const URL = 'https://2qtsbt2v-80.euw.devtunnels.ms/api';

const buildUrl = (...paths: string[]) => `${URL}/${paths.join('/')}`;

const stringifyQueryParams = (params: Record<string, string>) =>
  new URLSearchParams(params).toString();

const sendRequest = async <T>(url: string, init?: RequestInit) => {
  const res = await fetch(url, init);
  if (!res.ok) {
    throw new Error(await res.text());
  }

  return (await res.json()) as T;
};

type getCategories = {
  count: number;
  total_pages: number;
  page: number;
  data: Category[];
};

type getBrands = {
  count: number;
  total_pages: number;
  page: number;
  data: Brand[];
};

export type getProducts = {
  count: number;
  total_pages: number;
  page: number;
  data: Product[];
};

export const getCategories = async (
  //   params: Record<string, string> = {},
  init?: RequestInit
) => {
  return sendRequest<getCategories>(
    `${buildUrl('get', 'Category')}?all_data=true&pagination=true`,
    init
  );
};

export const getBrands = async (
  //   params: Record<string, string> = {},
  init?: RequestInit
) => {
  return sendRequest<Brand[]>(
    `${buildUrl(
      'get',
      'Brand'
    )}?all_data=true&equal=false&pagination=false&page_size=25&page=1`,
    init
  );
};

export const getProducts = async (
  //   params: Record<string, string> = {},
  init?: RequestInit
) => {
  return sendRequest<getProducts>(
    `${buildUrl(
      'get',
      'Product'
    )}?all_data=true&equal=false&pagination=true&page_size=25&page=1`,
    init
  );
};

export const getPopularProducts = async (
  //   params: Record<string, string> = {},
  init?: RequestInit
) => {
  return sendRequest<getProducts>(
    `${buildUrl(
      'get',
      'Product'
    )}?all_data=true&field=popular&search=true&equal=false&pagination=true&page_size=25&page=1`,
    init
  );
};

export const getFavorites = async (
  //   params: Record<string, string> = {},
  init?: RequestInit
) => {
  return sendRequest<Product[]>(
    `${buildUrl(
      'get',
      'Brand'
    )}?all_data=true&equal=false&pagination=false&page_size=25&page=1`,
    init
  );
};
