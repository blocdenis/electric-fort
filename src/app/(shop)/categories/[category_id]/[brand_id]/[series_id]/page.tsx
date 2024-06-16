import Breadcrumbs from '@/components/Breadcrumb/Breadcrumbs';
import ProductCard from '@/components/Products/ProductCard/ProductCard';
import Section from '@/components/Section/Section';
import SectionTitle from '@/components/Section/SectionTitle/SectionTitle';
import { brands } from '@/lib/db/brands';
import { categories } from '@/lib/db/categories';
import { products } from '@/lib/db/products';
import { series } from '@/lib/db/productSeries';
// import { getProductsBySeria } from '@/services/api/api';

export interface PageProps {
  params: { category_id: number; brand_id: number; series_id: number };
}

async function Page({ params }: PageProps) {
  const { category_id, brand_id, series_id } = params;

  // const products = (await getProductsBySeria(Number(series_id), 1)).data;

  const categoryName = categories.find(
    (category) => category.id === Number(category_id)
  )?.name;
  const brandName = brands.find((brand) => brand.id === Number(brand_id))?.name;
  const seriesName = series.find(
    (seria) => seria.id === Number(series_id)
  )?.name;

  const breadcrumsItems = [
    { name: 'Категорії', href: '/categories' },
    { name: categoryName, href: `/categories/${category_id}` },
    { name: brandName, href: `/categories/${category_id}/${brand_id}` },
    { name: seriesName },
  ];
  return (
    <>
      <Breadcrumbs items={breadcrumsItems} />
      <Section>
        <div className=" pr-[64px] mx-auto overflow-hidden">
          <SectionTitle className="mb-4" title={seriesName} />
          <ul className=" pl-6 grid laptop:grid-cols-2 desktop:grid-cols-3 gap-x-[45px] gap-y-8">
            {products.map(
              ({
                id,
                name,
                unit_of_measurement,
                price,
                description,
                in_stock,
                popular,
                images,
                series_id,
                subseries_id,
                brand_id,
                updated_info_date,
                add_date,
                article,
              }) => (
                <ProductCard
                  key={id}
                  id={id}
                  name={name}
                  unit_of_measurement={unit_of_measurement}
                  price={price}
                  description={description}
                  in_stock={in_stock}
                  popular={popular}
                  images={images}
                  series_id={series_id}
                  subseries_id={subseries_id}
                  brand_id={brand_id}
                  updated_info_date={updated_info_date}
                  add_date={add_date}
                  article={article}
                />
              )
            )}
          </ul>
        </div>
      </Section>
    </>
  );
}

export default Page;