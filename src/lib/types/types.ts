import { StaticImageData } from 'next/image';

export interface Category {
  id: number;
  image: string[] | null;
  name: string;
  add_date: string;
}
export interface Brand {
  id: number;
  image: string[] | null;
  name: string;
  add_date: string;
  category_id: number;
}
export interface ProductSeries {
  id: number;
  image: string[] | null;
  name: string;
  add_date: string;
  brand_id: number;
}
export interface ProductSubSeries {
  id: number;
  image: string[] | null;
  name: string;
  add_date: string;
  series_id: number;
}
export interface Product {
  id: number;
  images: string[][] | null;
  name: string;
  article: string;
  unit_of_measurement: string;
  price: number;
  description?: string | null;
  in_stock?: boolean;
  popular?: boolean;
  brand_id: number;
  series_id?: number | null;
  subseries_id?: number | null;
  updated_info_date?: string | null;
  add_date: string;
}
