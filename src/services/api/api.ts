import { Brand, Category } from '@/lib/types/types';

export const URL = 'https://5ac2-91-235-68-209.ngrok-free.app/api/';

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

export const getFavorites = async (
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
