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
  description: string | null;
  in_stock: boolean;
  popular: boolean;
  category_id: number;
  brand_id: number;
  series_id: number | null;
  subseries_id: number | null;
  subsubseries_id: number | null;
  updated_info_date: string | null;
  add_date: string;
  number?: number;
}

export interface ProductApiResponse {
  count: number;
  total_pages: number;
  page: number;
  data: Product[];
}
