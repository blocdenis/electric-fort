import { Product } from '@/lib/types/types';
import Link from 'next/link';
import styles from './SearchInput.module.scss';
import { HeartWithShadowFilledIcon, HeartWithShadowIcon } from '../icons';
import { useFavorites } from '@/context/FavoritesContext';
import Image from 'next/image';
import notFoundImage from '@/../public/notFound.jpg';

interface Props {
  isLoading: boolean;
  data: Product[];
  onProductClick: () => void;
}

export function SearchResult({ isLoading, data, onProductClick }: Props) {
  const { addToFavorites, deleteFromFavorites, isFavorite } = useFavorites();

  return (
    <>
      {isLoading && <div>Loading...</div>}
      {data &&
        data.map((item) => {
          const handleFavoriteIconClick = (e: React.MouseEvent) => {
            e.stopPropagation();
            if (isFavorite(item.id)) {
              deleteFromFavorites(item.id);
            } else {
              addToFavorites({
                id: item.id,
                name: item.name,
                unit_of_measurement: item.unit_of_measurement,
                price: item.price,
                description: item.description,
                in_stock: item.in_stock,
                popular: item.popular,
                images: item.images,
                series_id: item.series_id,
                subseries_id: item.subseries_id,
                brand_id: item.brand_id,
                updated_info_date: item.updated_info_date,
                add_date: item.add_date,
                article: item.article,
              });
            }
          };

          return (
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
                          onClick={handleFavoriteIconClick}
                          width={32}
                          height={30}
                          className="fill-yellow hover:scale-[128%] transition-transform duration-300"
                        />
                      ) : (
                        <HeartWithShadowIcon
                          onClick={handleFavoriteIconClick}
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
          );
        })}
    </>
  );
}
