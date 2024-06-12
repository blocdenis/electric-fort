// export interface Image {
//   format: string;
//   data: string;
// }

type Image = [string, string]; // [MIME type, base64 data]

export interface Product {
  id: number;
  images: Image[];
  name: string;
  article: string;
  unit_of_measurement: string;
  price: number;
  description: string;
  in_stock: boolean;
  popular: boolean;
  brand_id: number;
  series_id: number;
  subseries_id: number;
  updated_info_date: string | null;
  add_date: string;
}

export interface ProductApiResponse {
  count: number;
  total_pages: number;
  page: number;
  data: Product[];
}
