import { Brand, Category, Product } from '@/lib/types/types';

export const BASE_URL = '/api';

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
  try {
    const res = await fetch(url, init);

    if (!res.ok) {
      throw new Error(await res.text());
    }

    return (await res.json()) as T;
  } catch (error) {
    console.log('Some error ocured', error);
  }
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
  return sendRequestJSON<Category[]>(
    `${buildUrl('get', 'Category')}?all_data=true&equal=false&pagination=false`,
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

export const getBrands = async (
  //   params: Record<string, string> = {},
  init?: RequestInit
) => {
  return sendRequestJSON<Brand[]>(
    `${buildUrl(
      'get',
      'Brand'
    )}?all_data=true&equal=false&pagination=false&page_size=25&page=1`,
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

export const getProducts = async (
  //   params: Record<string, string> = {},
  init?: RequestInit
) => {
  return sendRequestJSON<getProducts>(
    `${buildUrl(
      'get',
      'Product'
    )}?all_data=true&equal=false&pagination=true&page_size=25&page=1`,
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

export const getProductsByBrand = async (
  //   params: Record<string, string> = {},
  brand_id: number,
  page: number,
  init?: RequestInit
) => {
  return sendRequestJSON<getProducts>(
    `${buildUrl(
      'get',
      'Product'
    )}?all_data=true&field=brand_id&search=${brand_id}&equal=true&pagination=true&page_size=6&page=${page}`,
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

export const getProductsBySeria = async (
  //   params: Record<string, string> = {},
  series_id: number,
  page: number,
  init?: RequestInit
) => {
  return sendRequestJSON<getProducts>(
    `${buildUrl(
      'get',
      'Product'
    )}?all_data=true&field=series_id&search=${series_id}&equal=true&pagination=true&page_size=6&page=${page}`,
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

// export const getProductsByCategory = async (
//   //   params: Record<string, string> = {},
//   category_id: number,
//   page: number,
//   init?: RequestInit
// ) => {
//   return sendRequestJSON<getProducts>(
//     `${buildUrl(
//       'get',
//       'Product'
//     )}?all_data=true&field=brand_id&search=${category_id}&equal=true&pagination=true&page_size=6&page=${page}`,
//     {
//       method: 'GET',
//       credentials: 'include',
//       headers: {
//         ...(init && init.headers),
//         'content-type': 'application/json',
//       },
//     }
//   );
// };

export const getPopularProducts = async (
  //   params: Record<string, string> = {},
  init?: RequestInit
) => {
  return sendRequestJSON<Product[]>(
    `${buildUrl(
      'get',
      'Product'
    )}?all_data=true&field=popular&search=true&equal=false&pagination=false`,
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
