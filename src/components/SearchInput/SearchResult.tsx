import { Product } from '@/lib/types/types';
// import Link from 'next/link';
import styles from './SearchInput.module.scss';
import { HeartWithShadowFilledIcon, HeartWithShadowIcon } from '../icons';
import { useFavorites } from '@/context/FavoritesContext';
import Image from 'next/image';
import notFoundImage from '@/../public/notFound.jpg';
import { Link } from '@/navigation';

interface Props {
  isLoading: boolean;
  data: Product[];
  onProductClick: () => void;
}

export function SearchResult({ isLoading, data, onProductClick }: Props) {
  const { addToFavorites, deleteFromFavorites, isFavorite } = useFavorites();

  const handleFavoriteIconClick = (e: React.MouseEvent, item: Product) => {
    e.stopPropagation();
    if (isFavorite(item.id)) {
      deleteFromFavorites.mutateAsync(item.id);
    } else {
      addToFavorites.mutateAsync(item.id);
    }
  };

  return (
    <>
      {isLoading && <div>Loading...</div>}
      {data &&
        data.map((item) => (
          <div key={item.id} className={styles.result_list}>
            <Link href={`/${item.id}`} passHref>
              <div
                className={styles.search_result_container}
                onClick={onProductClick}
              >
                <div className={styles.image}>
                  <Image
                    src={
                      item.images && item.images[0]
                        ? `data:${item.images[0][0]};base64,${item.images[0][1]}`
                        : notFoundImage
                    }
                    alt={`${item.name} image`}
                    width={80}
                    height={70}
                  />
                </div>
                <div className={styles.name}>{item.name}</div>
                <div className={styles.price}>
                  <div>
                    <div className={styles.price_text}>
                      <span>ціна</span>
                    </div>
                    <div className={styles.details}>
                      {item.price}/1{item.unit_of_measurement}
                    </div>
                  </div>

                  <div className="flex justify-center items-center w-[41px] h-[41px] cursor-pointer">
                    {isFavorite(item.id) ? (
                      <HeartWithShadowFilledIcon
                        onClick={(e) => handleFavoriteIconClick(e, item)}
                        width={32}
                        height={30}
                        className="fill-yellow hover:scale-[128%] transition-transform duration-300"
                      />
                    ) : (
                      <HeartWithShadowIcon
                        onClick={(e) => handleFavoriteIconClick(e, item)}
                        width={32}
                        height={30}
                        className="fill-yellow hover:scale-[128%] transition-transform duration-300"
                      />
                    )}
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
    </>
  );
}
