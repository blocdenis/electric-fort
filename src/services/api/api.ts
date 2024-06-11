import { Brand, Category, Product } from '@/lib/types/types';

export const BASE_URL = 'https://2qtsbt2v-80.euw.devtunnels.ms/api';

const buildUrl = (...paths: string[]) => `${BASE_URL}/${paths.join('/')}`;

// // const stringifyQueryParams = (params: Record<string, string>) =>
// //   new URLSearchParams(params).toString();

const sendRequest = async <T>(url: string, init?: RequestInit) => {
  const res = await fetch(url, init);

  if (!res.ok) {
    throw new Error(await res.text());
  }
  return res as T;
};

const sendRequestJSON = async <T>(url: string, init?: RequestInit) => {
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

type User = {
  email: string;
  password: string;
};

export const getCategories = async (
  //   params: Record<string, string> = {},
  init?: RequestInit
) => {
  return sendRequestJSON<getCategories>(
    `${buildUrl('get', 'Category')}?all_data=true&pagination=true`,
    init
  );
};

export const getBrands = async (
  //   params: Record<string, string> = {},
  init?: RequestInit
) => {
  return sendRequestJSON<Brand[]>(
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
  return sendRequestJSON<getProducts>(
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
  return sendRequestJSON<getProducts>(
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
  return sendRequestJSON<Product[]>(
    buildUrl('get', 'user', 'favorite_products'),
    {
      method: 'GET',
      credentials: 'include',
      headers: {
        ...(init && init.headers),
        'content-type': 'application/json',
      },
    }
  );
};

export const addFavorites = async (
  // params: Record<string, number>,
  id: number,
  init?: RequestInit
) => {
  return sendRequest<string>(
    `${buildUrl('add', 'favorite_product')}?product_id=${id}`,
    {
      method: 'POST',
      credentials: 'include',
      headers: {
        ...(init && init.headers),
        'content-type': 'application/json',
      },
    }
  );
};

export const deleteFavorites = async (
  // params: Record<string, number>,
  id: number,
  init?: RequestInit
) => {
  return sendRequest<string>(
    `${buildUrl('delete', 'favorite_product')}?product_id=${id}`,
    {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        ...(init && init.headers),
        'content-type': 'application/json',
      },
    }
  );
};
export const registrationUser = async (
  // params: Record<string, number>,
  data: User,
  init?: RequestInit
) => {
  return sendRequest<string>(`${buildUrl('user', 'register')}`, {
    method: 'POST',
    body: JSON.stringify(data),
    credentials: 'include',
    headers: {
      ...(init && init.headers),
      'content-type': 'application/json',
    },
  });
};

export const isAuth = async (
  // params: Record<string, number>,
  data: User,
  init?: RequestInit
) => {
  return sendRequest<string>(`${buildUrl('jwt', 'user')}`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      ...(init && init.headers),
      'content-type': 'application/json',
    },
  });
};
