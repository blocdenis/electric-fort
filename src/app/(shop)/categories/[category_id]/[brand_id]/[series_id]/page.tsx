import NotFound from '@/app/not-found';
import Breadcrumbs from '@/components/Breadcrumb/Breadcrumbs';
import SeriesList from '@/components/Categories/SeriesList';
import SubseriesList from '@/components/Categories/SubseriesList';
import FiltersPanel from '@/components/Filters/FiltersPanel/FiltersPanel';
import ProductList from '@/components/Products/ProductList/ProductList';
import Section from '@/components/Section/Section';
import SectionTitle from '@/components/Section/SectionTitle/SectionTitle';
import Sort from '@/components/Sort/Sort';
import {
  getBrandById,
  getCategoryById,
  getProductsBySeria,
  getSeriaById,
  getSortedProductsBySeria,
  getSubSeriesBySeriesId,
} from '@/services/api/api';

export interface PageProps {
  params: { category_id: number; brand_id: number; series_id: number };
  searchParams: { sort: string | undefined; page: number | undefined };
}

async function Page({ params, searchParams }: PageProps) {
  const { category_id, brand_id, series_id } = params;
  const { sort, page } = searchParams;

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

  if (sort) {
    let sorter = sort;
    if (!sort.includes('-')) {
      sorter = `%2B` + sort;
    }

    const sortedProductsRes = await getSortedProductsBySeria(
      series_id,
      sorter,
      page
    );
    const sortedProducts = sortedProductsRes?.data;

    return (
      <>
        <Breadcrumbs items={breadcrumsItems} />
        <Section>
          <div className=" mx-auto overflow-hidden">
            <SectionTitle className="mb-4" title={series.name} />
            <Sort isDisable={sortedProducts?.length === 0} />
            <FiltersPanel
              incomeFilters={[brand.name]}
              categoryId={category_id}
            />
            <ProductList products={sortedProducts} />
          </div>
        </Section>
      </>
    );
  }

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
              <Sort isDisable={products?.length === 0} />
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
