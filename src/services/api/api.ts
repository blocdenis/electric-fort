import { categories } from '@/lib/db/categories';
import { Brand, Category } from '@/lib/db/types';

export const url =
  'https://fea5-91-235-68-209.ngrok-free.app/api/get/Category/?all_data=true&pagination=true';

const buildUrl = (...paths: string[]) =>
  `https://fea5-91-235-68-209.ngrok-free.app/api/get/${paths.join('/')}`;

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
    `${buildUrl('Category')}?all_data=true&pagination=true`,
    init
  );
};

export const getBrands = async (
  //   params: Record<string, string> = {},
  category_id: number,
  init?: RequestInit
) => {
  return sendRequest<getBrands>(
    `${buildUrl(
      'Brand'
    )}?all_data=true&field=category_id&search=${category_id}&pagination=true`,
    init
  );
};
