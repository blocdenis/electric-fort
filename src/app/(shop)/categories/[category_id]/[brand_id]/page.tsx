import Section from '@/components/Section/Section';
import SectionTitle from '@/components/Section/SectionTitle/SectionTitle';
import Breadcrumbs from '@/components/Breadcrumb/Breadcrumbs';
import {
  getBrandById,
  getCategoryById,
  getProductsByBrand,
  getSeriesByBrandId,
  getSortedProductsByBrand,
} from '@/services/api/api';
import ProductList from '@/components/Products/ProductList/ProductList';
import NotFound from '@/app/not-found';
import SeriesList from '@/components/Categories/SeriesList';
import Sort from '@/components/Sort/Sort';
import FiltersPanel from '@/components/Filters/FiltersPanel/FiltersPanel';

export interface PageProps {
  params: { category_id: number; brand_id: number };
  searchParams: { sort: string | undefined; page: number | undefined };
}

async function Page({ params, searchParams }: PageProps) {
  const { category_id, brand_id } = params;
  const { sort, page } = searchParams;

  const categoryData = await getCategoryById(category_id);
  const brandData = await getBrandById(brand_id);
  const seriesData = await getSeriesByBrandId(brand_id);

  if (!categoryData || !brandData) {
    return NotFound();
  }

  const [category] = categoryData;
  const [brand] = brandData;

  const products = (await getProductsByBrand(brand_id, 1))?.data;

  const breadcrumsItems = [
    { name: 'Категорії', href: '/categories' },
    { name: category.name, href: `/categories/${category_id}` },
    { name: brand.name },
  ];

  if (sort) {
    let sorter = sort;
    if (!sort.includes('-')) {
      sorter = `%2B` + sort;
    }

    const sortedProductsRes = await getSortedProductsByBrand(
      brand_id,
      sorter,
      page
    );
    const sortedProducts = sortedProductsRes?.data;

    return (
      <>
        <Breadcrumbs items={breadcrumsItems} />
        <Section>
          <div className=" mx-auto overflow-hidden">
            <SectionTitle className="mb-4" title={brand.name} />
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
          <SectionTitle className="mb-4" title={brand.name} />
          {seriesData?.length ? (
            <SeriesList categoryId={category_id} brandId={brand_id} />
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
      {seriesData?.length ? (
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
