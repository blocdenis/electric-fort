import { Product } from '@/lib/types/types';
import Link from 'next/link';
interface Props {
  isLoading: boolean;
  data: Product[];
}

export function SearchResult({ isLoading, data }: Props) {
  return (
    <>
      {isLoading && <div>Loading...</div>}
      {data &&
        data.map((item) => (
          <div key={item.id}>
            <Link href={`/products/${item.id}`}>
              {item.name} - {item.price}$
            </Link>
            {item.name}
          </div>
        ))}
    </>
  );
}
