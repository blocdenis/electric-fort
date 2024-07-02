import NotFound from '@/app/not-found';
import Breadcrumbs from '@/components/Breadcrumb/Breadcrumbs';
import SubseriesList from '@/components/Categories/SubseriesList';
import FiltersPanel from '@/components/Filters/FiltersPanel/FiltersPanel';
import ProductList from '@/components/Products/ProductList/ProductList';
import SortedProductList from '@/components/Products/ProductList/SortedProductList';
import Section from '@/components/Section/Section';
import SectionTitle from '@/components/Section/SectionTitle/SectionTitle';
import Sort from '@/components/Sort/Sort';
import getQueryClient from '@/lib/utils/getQueryClient';

import {
  getBrandById,
  getCategoryById,
  getProductsBySubSubSeria,
  getSeriaById,
  getSortedProductsBySubSubSeria,
  getSubSeriaById,
  getSubSubSeriaById,
  getSubSubSeriesBySubSeriesId,
} from '@/services/api/api';

export interface PageProps {
  params: {
    category_id: number;
    brand_id: number;
    series_id: number;
    subseries_id: number;
    subsubseries_id: number;
  };
  searchParams: { sort: string | undefined; page: number | undefined };
}

async function Page({ params, searchParams }: PageProps) {
  const { category_id, brand_id, series_id, subseries_id, subsubseries_id } =
    params;
  const { sort, page } = searchParams;

  const products = (await getProductsBySubSubSeria(subseries_id, 1))?.data;

  const categoryData = await getCategoryById(category_id);
  const brandData = await getBrandById(brand_id);
  const seriesData = await getSeriaById(series_id);
  const subSeriesData = await getSubSeriaById(subseries_id);
  const subSubSeriesData = await getSubSubSeriaById(subsubseries_id);

  if (
    !categoryData ||
    !brandData ||
    !seriesData ||
    !subSeriesData ||
    !subSubSeriesData
  ) {
    return NotFound();
  }

  const [category] = categoryData;
  const [brand] = brandData;
  const [series] = seriesData;
  const [subSeries] = subSeriesData;
  const [subSubSeries] = subSeriesData;

  const breadcrumsItems = [
    { name: 'Категорії', href: '/categories' },
    { name: category.name, href: `/categories/${category_id}` },
    { name: brand.name, href: `/categories/${category_id}/${brand_id}` },
    {
      name: series.name,
      href: `/categories/${category_id}/${brand_id}/${series_id}`,
    },
    {
      name: subSeries.name,
      href: `/categories/${category_id}/${brand_id}/${series_id}/${subseries_id}`,
    },
    {
      name: subSubSeries.name,
    },
  ];

  if (sort) {
    let sorter = sort;
    if (!sort.includes('-')) {
      sorter = `%2B` + sort;
    }

    const sortedProductsRes = await getSortedProductsBySubSubSeria(
      subseries_id,
      page,
      sorter
    );
    const sortedProducts = sortedProductsRes?.data;

    return (
      <>
        <Breadcrumbs items={breadcrumsItems} />
        <Section>
          <div className=" mx-auto overflow-hidden">
            <SectionTitle className="mb-4" title={subSubSeries.name} />
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
          <SectionTitle className="mb-4" title={subSubSeries.name} />
          <Sort isDisable={products?.length === 0} />
          <FiltersPanel incomeFilters={[brand.name]} categoryId={category_id} />
          <ProductList products={products} />
        </div>
      </Section>
    </>
  );
}

export default Page;
