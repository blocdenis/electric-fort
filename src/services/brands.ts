import { URL } from '@/constants';
import { Brand } from '@/lib/types/types';

import axios from 'axios';

export default async function getBrands(): Promise<Brand[]> {
  const { data } = await axios.get(
    `${URL}get/Brand?all_data=true&pagination=true&page_size=25&page=1`,
    { withCredentials: true }
  );
  return data;
}
