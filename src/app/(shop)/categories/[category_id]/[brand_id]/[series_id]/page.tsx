import Breadcrumbs from '@/components/Breadcrumb/Breadcrumbs';
import ProductCard from '@/components/Products/ProductCard/ProductCard';
import ProductList from '@/components/Products/ProductList/ProductList';
import Section from '@/components/Section/Section';
import SectionTitle from '@/components/Section/SectionTitle/SectionTitle';
import Sort from '@/components/Sort/Sort';
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
        <div className=" mx-auto overflow-hidden">
          <SectionTitle className="mb-4" title={seriesName} />
          <Sort />
          <ProductList products={products} />
        </div>
      </Section>
    </>
  );
}

export default Page;
