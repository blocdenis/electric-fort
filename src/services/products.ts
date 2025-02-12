import { URL } from '@/constants';
import { Product, ProductApiResponse } from '@/lib/types/Product.type';
import axios from 'axios';

class ProductService {
  private baseURL: string;

  constructor() {
    this.baseURL = `${URL}`;
  }

  async getProducts(): Promise<Product[]> {
    const { data } = await axios.get<Product[]>(
      `${URL}/get/Product?all_data=true&equal=false&pagination=false`,
      { withCredentials: true }
    );
    // console.log('API Response:', data.data);
    return data;
  }

  async getProductById(id: number): Promise<Product> {
    const response = await axios.get<Product[]>(
      `${URL}/get/Product?all_data=true&field=id&search=${id}&equal=true&pagination=false&page_size=25&page=1`,
      { withCredentials: true }
    );
    // console.log('API Response:', response.data);
    return response.data[0];
  }
}

export const productService = new ProductService();

export const fetchProducts = async (query: string) => {
  const { data } = await axios.get(
    `https://electrychnafortecia.com/api/get/Product?all_data=true&field=name&search=${query}&equal=false&pagination=true&page_size=25&page=1`
  );
  return data;
};
