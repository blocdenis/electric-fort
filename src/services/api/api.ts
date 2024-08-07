import {
  Brand,
  Category,
  Product,
  ProductSeries,
  ProductSubSeries,
  ProductSubSubSeries,
} from '@/lib/types/types';

export const BASE_URL = 'https://electrychnafortecia.com/api';

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

//Categories, brands, series, subseries, subsubseries

export const getAllCategories = async (
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

export const getCategoryById = async (
  //   params: Record<string, string> = {},
  category_id: number,
  init?: RequestInit
) => {
  return sendRequestJSON<Category[]>(
    `${buildUrl(
      'get',
      'Category'
    )}?all_data=true&field=id&search=${category_id}&equal=true&pagination=false`,
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

export const getAllBrands = async (
  //   params: Record<string, string> = {},
  init?: RequestInit
) => {
  return sendRequestJSON<Brand[]>(
    `${buildUrl('get', 'Brand')}?all_data=true&equal=false&pagination=false`,
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

export const getBrandById = async (
  //   params: Record<string, string> = {},
  brand_id: number,
  init?: RequestInit
) => {
  return sendRequestJSON<Brand[]>(
    `${buildUrl(
      'get',
      'Brand'
    )}?all_data=true&field=id&search=${brand_id}&equal=true&pagination=false`,
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

export const getBrandsByCategoryId = async (
  //   params: Record<string, string> = {},
  categoryId: number,
  init?: RequestInit
) => {
  return sendRequestJSON<getBrands>(
    `${buildUrl(
      'get',
      'Brand'
    )}?all_data=true&field=category_id&search=${categoryId}&equal=true`,
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

export const getSeriesByBrandId = async (
  //   params: Record<string, string> = {},
  brandId: number,
  init?: RequestInit
) => {
  return sendRequestJSON<ProductSeries[]>(
    `${buildUrl(
      'get',
      'Series'
    )}?all_data=true&field=brand_id&search=${brandId}&equal=true&pagination=false`,
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

export const getSeriaById = async (
  //   params: Record<string, string> = {},
  seriesId: number,
  init?: RequestInit
) => {
  return sendRequestJSON<ProductSeries[]>(
    `${buildUrl(
      'get',
      'Series'
    )}?all_data=true&field=id&search=${seriesId}&equal=true&pagination=false`,
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

export const getSubSeriesBySeriesId = async (
  //   params: Record<string, string> = {},
  seriesId: number,
  init?: RequestInit
) => {
  return sendRequestJSON<ProductSubSeries[]>(
    `${buildUrl(
      'get',
      'SubSeries'
    )}?all_data=true&field=series_id&search=${seriesId}&equal=true&pagination=false`,
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

export const getSubSeriaById = async (
  //   params: Record<string, string> = {},
  subSeriesId: number,
  init?: RequestInit
) => {
  return sendRequestJSON<ProductSubSeries[]>(
    `${buildUrl(
      'get',
      'SubSeries'
    )}?all_data=true&field=id&search=${subSeriesId}&equal=true&pagination=false`,
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

export const getSubSubSeriesBySubSeriesId = async (
  //   params: Record<string, string> = {},
  subSeriesId: number,
  init?: RequestInit
) => {
  return sendRequestJSON<ProductSubSubSeries[]>(
    `${buildUrl(
      'get',
      'SubSubSeries'
    )}?all_data=true&field=subseries_id&search=${subSeriesId}&equal=true&pagination=false`,
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

export const getSubSubSeriaById = async (
  //   params: Record<string, string> = {},
  subSubSeriesId: number,
  init?: RequestInit
) => {
  return sendRequestJSON<ProductSubSubSeries[]>(
    `${buildUrl(
      'get',
      'SubSubSeries'
    )}?all_data=true&field=id&search=${subSubSeriesId}&equal=true&pagination=false`,
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

// Products

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

export const getProductsByCategory = async (
  //   params: Record<string, string> = {},
  category_id: number,
  page: number | undefined,
  page_size: number,
  init?: RequestInit
) => {
  return sendRequestJSON<getProducts>(
    `${buildUrl(
      'get',
      'Product'
    )}?all_data=true&field=category_id&search=${category_id}&equal=true&pagination=true&page_size=${page_size}&page=${page}`,
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

export const getSortedProductsByCategory = async (
  //   params: Record<string, string> = {},
  category_id: number,
  ordered_by: string,
  page: number | undefined,
  page_size: number,
  init?: RequestInit
) => {
  return sendRequestJSON<getProducts>(
    `${buildUrl(
      'get',
      'Product'
    )}?all_data=true&field=category_id&search=${category_id}&equal=true&pagination=true&page_size=${page_size}&page=${page}&order_by=${ordered_by}`,
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
  page: number | undefined,
  page_size: number,
  init?: RequestInit
) => {
  return sendRequestJSON<getProducts>(
    `${buildUrl(
      'get',
      'Product'
    )}?all_data=true&field=brand_id&search=${brand_id}&equal=true&pagination=true&page_size=${page_size}&page=${page}`,
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

export const getSortedProductsByBrand = async (
  //   params: Record<string, string> = {},
  brand_id: number,
  ordered_by: string,
  page: number | undefined,
  page_size: number,
  init?: RequestInit
) => {
  return sendRequestJSON<getProducts>(
    `${buildUrl(
      'get',
      'Product'
    )}?all_data=true&field=brand_id&search=${brand_id}&equal=true&pagination=true&page_size=${page_size}&page=${page}&order_by=${ordered_by}`,
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
  page: number | undefined,
  page_size: number,
  init?: RequestInit
) => {
  return sendRequestJSON<getProducts>(
    `${buildUrl(
      'get',
      'Product'
    )}?all_data=true&field=series_id&search=${series_id}&equal=true&pagination=true&page_size=${page_size}&page=${page}`,
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

export const getSortedProductsBySeria = async (
  //   params: Record<string, string> = {},
  series_id: number,
  ordered_by: string,
  page: number | undefined,
  page_size: number,
  init?: RequestInit
) => {
  return sendRequestJSON<getProducts>(
    `${buildUrl(
      'get',
      'Product'
    )}?all_data=true&field=series_id&search=${series_id}&equal=true&pagination=true&page_size=${page_size}&page=${page}&order_by=${ordered_by}`,
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

export const getProductsBySubSeria = async (
  //   params: Record<string, string> = {},
  subseries_id: number,
  page: number | undefined,
  page_size: number,
  init?: RequestInit
) => {
  return sendRequestJSON<getProducts>(
    `${buildUrl(
      'get',
      'Product'
    )}?all_data=true&field=subseries_id&search=${subseries_id}&equal=true&pagination=true&page_size=${page_size}&page=${page}`,
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

export const getSortedProductsBySubSeria = async (
  //   params: Record<string, string> = {},
  subseries_id: number,
  ordered_by: string,
  page: number | undefined,
  page_size: number,
  init?: RequestInit
) => {
  return sendRequestJSON<getProducts>(
    `${buildUrl(
      'get',
      'Product'
    )}?all_data=true&field=subseries_id&search=${subseries_id}&equal=true&pagination=true&page_size=${page_size}&page=${page}&order_by=${ordered_by}`,
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

export const getProductsBySubSubSeria = async (
  //   params: Record<string, string> = {},
  subsubseries_id: number,
  page: number | undefined,
  page_size: number,
  init?: RequestInit
) => {
  return sendRequestJSON<getProducts>(
    `${buildUrl(
      'get',
      'Product'
    )}?all_data=true&field=subsubseries_id&search=${subsubseries_id}&equal=true&pagination=true&page_size=${page_size}&page=${page}`,
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

export const getSortedProductsBySubSubSeria = async (
  //   params: Record<string, string> = {},
  subsubseries_id: number,
  ordered_by: string,
  page: number | undefined,
  page_size: number,
  init?: RequestInit
) => {
  return sendRequestJSON<getProducts>(
    `${buildUrl(
      'get',
      'Product'
    )}?all_data=true&field=subsubseries_id&search=${subsubseries_id}&equal=true&pagination=true&page_size=${page_size}&page=${page}&order_by=${ordered_by}`,
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

export const getFilteredProducts = async (
  //   params: Record<string, string> = {},
  category_id: number,
  brand_id: string,
  price: string,
  ordered_by: string,
  page: number,
  page_size: number,
  init?: RequestInit
) => {
  return sendRequestJSON<getProducts>(
    `${buildUrl(
      'filtered',
      'Product'
    )}?category_id=["==${category_id}"]&brand_id=["${brand_id}"]&price=["${price}"]&pagination=true&page_size=${page_size}&page=${page}&order_by=${ordered_by}`,
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

export const getFilteredProductsBySeria = async (
  //   params: Record<string, string> = {},
  category_id: number,
  seria_id: number,
  price: string,
  ordered_by: string,
  page: number | undefined,
  page_size: number,
  init?: RequestInit
) => {
  return sendRequestJSON<getProducts>(
    `${buildUrl(
      'filtered',
      'Product'
    )}?category_id=["==${category_id}"]&series_id=["${seria_id}"]&price=["${price}"]&pagination=true&page_size=${page_size}&page=${page}&order_by=${ordered_by}`,
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

export const getFilteredProductsBySubSeria = async (
  //   params: Record<string, string> = {},
  category_id: number,
  subseria_id: number,
  price: string,
  ordered_by: string,
  page: number | undefined,
  page_size: number,
  init?: RequestInit
) => {
  return sendRequestJSON<getProducts>(
    `${buildUrl(
      'filtered',
      'Product'
    )}?category_id=["==${category_id}"]&subseries_id=["${subseria_id}"]&price=["${price}"]&pagination=true&page_size=${page_size}&page=${page}&order_by=${ordered_by}`,
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

export const getFilteredProductsBySubSubSeria = async (
  //   params: Record<string, string> = {},
  category_id: number,
  subsubseria_id: number,
  price: string,
  ordered_by: string,
  page: number | undefined,
  page_size: number,
  init?: RequestInit
) => {
  return sendRequestJSON<getProducts>(
    `${buildUrl(
      'filtered',
      'Product'
    )}?category_id=[==${category_id}"]&subsubseries_id=["${subsubseria_id}"]&price=["${price}"]&pagination=true&page_size=${page_size}&page=${page}&order_by=${ordered_by}`,
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

export const getPopularProducts = async (
  //   params: Record<string, string> = {},
  init?: RequestInit
) => {
  return sendRequestJSON<Product[]>(
    `${buildUrl(
      'get',
      'Product'
    )}?all_data=true&field=popular&search=true&equal=true&pagination=false`,
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

// Favorites

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

// User

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

// CART

export const addCartItem = async (
  id: number,

  init?: RequestInit
) => {
  return sendRequest<string>(
    `${buildUrl('add', 'basket')}?product_id=${id}&operation=%2B`,
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
export const decreaseCartItem = async (
  id: number,

  init?: RequestInit
) => {
  return sendRequest<string>(
    `${buildUrl('add', 'basket')}?product_id=${id}&operation=-`,
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

export const getCartItems = async (init?: RequestInit) => {
  return sendRequestJSON<Product[]>(buildUrl('get', 'user/basket'), {
    method: 'GET',
    credentials: 'include',
    headers: {
      ...(init && init.headers),
      'content-type': 'application/json',
    },
  });
};

export const deleteCartItem = async (id: number, init?: RequestInit) => {
  return sendRequest<string>(
    `${buildUrl('delete', 'basket')}?product_id=${id}`,
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

export const getCartItemByID = async (id: number, init?: RequestInit) => {
  return sendRequestJSON<Product[]>(
    `${buildUrl('get', 'user/basket')}?product_id=${id}`,
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
// ORDER

export const createOrder = async (init?: RequestInit) => {
  return sendRequest<string>(`${buildUrl('order', 'register')}`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      ...(init && init.headers),
      'content-type': 'application/json',
    },
  });
};
const url = buildUrl('get', 'user/basket');
console.log(url);
const isUserAuthenticated = async () => {
  const response = await fetch(`${BASE_URL}/jwt/user`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'content-type': 'application/json',
    },
  });

  return response.ok;
};

const checkAuth = async () => {
  const authenticated = await isUserAuthenticated();
  console.log('User authenticated:', authenticated);
};
// checkAuth();
