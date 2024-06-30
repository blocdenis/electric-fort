import NotFound from '@/app/not-found';
import Breadcrumbs from '@/components/Breadcrumb/Breadcrumbs';
import SubSubseriesList from '@/components/Categories/SubSubseriesList';
import SubseriesList from '@/components/Categories/SubseriesList';
import FiltersPanel from '@/components/Filters/FiltersPanel/FiltersPanel';
import ProductList from '@/components/Products/ProductList/ProductList';
import Section from '@/components/Section/Section';
import SectionTitle from '@/components/Section/SectionTitle/SectionTitle';
import Sort from '@/components/Sort/Sort';
import {
  getBrandById,
  getCategoryById,
  getProductsBySubSeria,
  getSeriaById,
  getSubSeriaById,
  getSubSubSeriesBySubSeriesId,
} from '@/services/api/api';

export interface PageProps {
  params: {
    category_id: number;
    brand_id: number;
    series_id: number;
    subseries_id: number;
  };
}

async function Page({ params }: PageProps) {
  const { category_id, brand_id, series_id, subseries_id } = params;

  const subSeriaProducts = (await getProductsBySubSeria(subseries_id, 1))?.data;

  const categoryData = await getCategoryById(category_id);
  const brandData = await getBrandById(brand_id);
  const seriesData = await getSeriaById(series_id);
  const subSeriesData = await getSubSeriaById(subseries_id);
  const subSubSeriesData = await getSubSubSeriesBySubSeriesId(subseries_id);

  if (!categoryData || !brandData || !seriesData || !subSeriesData) {
    return NotFound();
  }

  const [category] = categoryData;
  const [brand] = brandData;
  const [series] = seriesData;
  const [subSeries] = subSeriesData;

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
    },
  ];

  return (
    <>
      <Breadcrumbs items={breadcrumsItems} />
      <Section>
        <div className=" mx-auto overflow-hidden">
          <SectionTitle className="mb-4" title={subSeries.name} />
          {subSubSeriesData?.length ? (
            <SubSubseriesList
              categoryId={category_id}
              brandId={brand_id}
              seriesId={series_id}
              subSeriesId={subseries_id}
            />
          ) : (
            <>
              <Sort />
              <FiltersPanel
                incomeFilters={[brand.name]}
                categoryId={category_id}
              />
              <ProductList products={subSeriaProducts} />
            </>
          )}
        </div>
      </Section>
      {subSubSeriesData?.length ? (
        <ProductList products={subSeriaProducts} />
      ) : null}
    </>
  );
}

export default Page;
