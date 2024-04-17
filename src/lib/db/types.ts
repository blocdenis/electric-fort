import { StaticImageData } from 'next/image';

// need to correct acording to backand responce
export interface Category {
  id: string;
  image?: string | StaticImageData;
  name: string;
  subcategories?: Brand[];
}

// need to correct acording to backand responce
export interface Brand {
  id: string;
  image?: string;
  name: string;
  category_id?: string;
}
// need to correct acording to backand responce
export interface ProductSeries {
  id: string;
  image: string;
  name: string;
  brand_id: string;
}
// need to correct acording to backand responce
export interface Product {
  id: string;
  vendorCode: string;
  name: string;
  measurementUnit: string;
  brand: string;
  price: string;
  description: string;
  image: string;
  series: string;
  series_id: string;
  brand_id: string;
}
