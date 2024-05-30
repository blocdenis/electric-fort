import { Brand } from '@/lib/types/Brand';
import axios from 'axios';

export default async function getBrands(): Promise<Brand[]> {
  const { data } = await axios.get(
    'https://5ac2-91-235-68-209.ngrok-free.app/api/get/Brand?all_data=true&pagination=true&page_size=25&page=1',
    { withCredentials: true }
  );
  return data;
}
