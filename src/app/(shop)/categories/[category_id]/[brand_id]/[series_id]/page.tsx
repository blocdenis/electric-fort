import NotFound from '@/app/not-found';
import Breadcrumbs from '@/components/Breadcrumb/Breadcrumbs';
import SeriesList from '@/components/Categories/SeriesList';
import SubseriesList from '@/components/Categories/SubseriesList';
import FiltersPanel from '@/components/Filters/FiltersPanel/FiltersPanel';
import ProductList from '@/components/Products/ProductList/ProductList';
import Section from '@/components/Section/Section';
import SectionTitle from '@/components/Section/SectionTitle/SectionTitle';
import Sort from '@/components/Sort/Sort';
import { brands } from '@/lib/db/brands';
import { categories } from '@/lib/db/categories';
// import { products } from '@/lib/db/products';
import { series } from '@/lib/db/productSeries';
import {
  getBrandById,
  getCategoryById,
  getProductsBySeria,
  getSeriaById,
  getSubSeriesBySeriesId,
} from '@/services/api/api';
// import { getProductsBySeria } from '@/services/api/api';

export interface PageProps {
  params: { category_id: number; brand_id: number; series_id: number };
}

async function Page({ params }: PageProps) {
  const { category_id, brand_id, series_id } = params;

  const products = (await getProductsBySeria(Number(series_id), 1))?.data;

  const categoryData = await getCategoryById(category_id);
  const brandData = await getBrandById(brand_id);
  const seriesData = await getSeriaById(series_id);
  const subSeriesData = await getSubSeriesBySeriesId(series_id);

  if (!categoryData || !brandData || !seriesData) {
    return NotFound();
  }

  const [category] = categoryData;
  const [brand] = brandData;
  const [series] = seriesData;

  const breadcrumsItems = [
    { name: 'Категорії', href: '/categories' },
    { name: category.name, href: `/categories/${category_id}` },
    { name: brand.name, href: `/categories/${category_id}/${brand_id}` },
    { name: series.name },
  ];

  return (
    <>
      <Breadcrumbs items={breadcrumsItems} />
      <Section>
        <div className=" mx-auto overflow-hidden">
          <SectionTitle className="mb-4" title={series.name} />
          {subSeriesData?.length ? (
            <SubseriesList
              categoryId={category.id}
              brandId={brand.id}
              seriesId={series.id}
            />
          ) : (
            <>
              <Sort />
              <FiltersPanel
                incomeFilters={[brand.name]}
                categoryId={category_id}
              />
              <ProductList products={products} />
            </>
          )}
        </div>
      </Section>
      {subSeriesData?.length ? (
        <Section>
          <div className=" mx-auto overflow-hidden">
            <SectionTitle className="mb-4" title="Товари" />
            <ProductList products={products} />
          </div>
        </Section>
      ) : null}
    </>
  );
}

export default Page;
