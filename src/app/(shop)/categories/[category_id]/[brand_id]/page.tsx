import Section from '@/components/Section/Section';
import SectionTitle from '@/components/Section/SectionTitle/SectionTitle';
import styles from '@/components/Categories/CategoriesList.module.scss';
import CategoryCard from '@/components/Categories/CategoryCard';
import { categories } from '@/lib/db/categories';
import { brands } from '@/lib/db/brands';
import { products } from '@/lib/db/products';
import { series } from '@/lib/db/productSeries';
import Breadcrumbs from '@/components/Breadcrumb/Breadcrumbs';
import { getProductsByBrand } from '@/services/api/api';
import ProductList from '@/components/Products/ProductList/ProductList';

export interface PageProps {
  params: { category_id: number; brand_id: number };
}

async function Page({ params }: PageProps) {
  const { category_id, brand_id } = params;

  // const products = (await getProductsByBrand(Number(brand_id), 1)).data;

  // console.log(products);

  const categoryName = categories.find(
    (category) => category.id === Number(category_id)
  )?.name;
  const brandName = brands.find((brand) => brand.id === Number(brand_id))?.name;

  const breadcrumsItems = [
    { name: 'Категорії', href: '/categories' },
    { name: categoryName, href: `/categories/${category_id}` },
    { name: brandName },
  ];

  return (
    <>
      <Breadcrumbs items={breadcrumsItems} />
      <Section>
        <div className=" mx-auto overflow-hidden">
          <SectionTitle
            className="mb-4"
            title={brands.find((brand) => brand.id === Number(brand_id))?.name}
          />
          <ul className={styles.categories_list}>
            {series
              .filter((item) => item.brand_id === Number(brand_id))
              .map((seria) => (
                <li key={seria.id} className="w-[220px] h-[228px]">
                  <CategoryCard
                    category_id={category_id}
                    brand_id={brand_id}
                    series_id={seria.id}
                    name={seria.name}
                    image={seria.image}
                  />
                </li>
              ))}
          </ul>
        </div>
      </Section>
      <Section>
        <div className=" mx-auto overflow-hidden">
          <SectionTitle className="mb-4" title="Товари" />
          <ProductList products={products} />
        </div>
      </Section>
    </>
  );
}

export default Page;
