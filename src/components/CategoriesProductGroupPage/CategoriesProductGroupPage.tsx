'use client';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Container from '../Container/Container';
import SidebarWithAttachments from '../Sidebar/SidebarWithAttachments';
import ContentContainer from '../Container/ContentContainer';
import Breadcrumbs from '../Breadcrumb/Breadcrumbs';
import Section from '../Section/Section';
import SectionTitle from '../Section/SectionTitle/SectionTitle';
import Sort from '../Sort/Sort';
import FiltersPanel from '../Filters/FiltersPanel/FiltersPanel';
import FilteredProductsList from '../Products/ProductList/FilteredProductsList';
import { BreadcrambsItemProps } from '../Breadcrumb/BreadcrumbsItem';
import { useQuery } from '@tanstack/react-query';
import { getFilteredProducts, getProductsByCategory } from '@/services/api/api';
import CategoriesProductsList, {
  ProductGroup,
} from '../Categories/CategoriesProductsList';
import {
  Brand,
  Category,
  ProductSeries,
  ProductSubSeries,
  ProductSubSubSeries,
} from '@/lib/types/types';
import BrandsList from '../Categories/BrandsList';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import SeriesList from '../Categories/SeriesList';
import SubSubseriesList from '../Categories/SubSubseriesList';
import SubseriesList from '../Categories/SubseriesList';

interface CategoriesProductGroupProps {
  productsGroup: ProductGroup;
  category: Category;
  brand?: Brand;
  seria?: ProductSeries;
  subseria?: ProductSubSeries;
  subsubseria?: ProductSubSubSeries;
  groupBrands: Brand[] | undefined;
  groupSeries?: ProductSeries[];
  groupSubSeries?: ProductSubSeries[];
  groupSubSubSeries?: ProductSubSubSeries[];
  breadcrumsItems: BreadcrambsItemProps[];
  filterPrice: string;
  filterBrands: string;
  sort: string;
}

function CategoriesProductGroupPage({
  productsGroup,
  category,
  brand,
  seria,
  subseria,
  subsubseria,
  groupBrands,
  groupSeries,
  groupSubSeries,
  groupSubSubSeries,
  breadcrumsItems,
  filterPrice,
  filterBrands,
  sort,
}: CategoriesProductGroupProps) {
  const router = useRouter();
  const pathname = usePathname();
  const serchParams = useSearchParams();

  const groupData = (productsGroup: ProductGroup) => {
    switch (productsGroup) {
      case 'category':
        return {
          groupId: category.id,
          groupIds: String(filterBrandsIds),
          groupTitle: category.name,
          groupSubGroups: groupBrands,
        };

      case 'brand':
        if (brand)
          return {
            groupId: brand.id,
            groupIds: String(brand?.id),
            groupTitle: brand.name,
            groupSubGroups: groupSeries,
          };

      case 'seria':
        if (seria)
          return {
            groupId: seria.id,
            groupIds: String(seria?.id),
            groupTitle: seria.name,
            groupSubGroups: groupSubSeries,
          };

      case 'subseria':
        if (subseria)
          return {
            groupId: subseria.id,
            groupIds: String(subseria?.id),
            groupTitle: subseria.name,
            groupSubGroups: groupSubSubSeries,
          };

      case 'subsubseria':
        if (subsubseria)
          return {
            groupId: subsubseria.id,
            groupIds: String(subsubseria?.id),
            groupTitle: subsubseria.name,
            groupSubGroups: null,
          };
      default:
        return {
          groupId: 0,
          groupIds: 'wrong product group',
          groupTitle: 'wrong group title',
          groupSubGroups: 'wrong groupSubGroups',
        };
    }
  };

  // fetching data
  const { data: filteredProducts } = useQuery({
    queryKey: ['productsFilteredSorted', filterBrands, filterPrice, sort],
    queryFn: () => getFilteredProducts(filterBrands, filterPrice, sort, 1, 6),
    staleTime: 10 * 1000,
  });

  // const { data: products } = useQuery({
  //   queryKey: ['products', category.id],
  //   queryFn: () => getProductsByCategory(category.id, 1, 6),
  //   staleTime: 10 * 1000,
  // });

  // constants
  const filteredBrandsArray: Brand[] | undefined = useMemo(() => {
    return filterBrands !== ''
      ? groupBrands?.filter((brand) => {
          return filterBrands.split(',').indexOf(brand.id.toString()) !== -1;
        })
      : filterPrice !== ''
      ? groupBrands?.filter((brand) => {
          return (
            filteredProducts?.data
              .map((item) => item.brand_id)
              .indexOf(brand.id) !== -1
          );
        })
      : groupBrands;
  }, [filterBrands, filterPrice, filteredProducts?.data, groupBrands]);

  const filterBrandsIds = filteredBrandsArray?.map((brand) =>
    brand.id.toString()
  );

  //For price filter
  const [minPrice, setMinPrice] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>('');
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    switch (e.target.name) {
      case 'minPrice':
        if (e.target.value.includes('-')) {
          setMinPrice(e.target.value.replace('-', '').trim());
        } else {
          setMinPrice(e.target.value);
        }
        break;
      case 'maxPrice':
        if (e.target.value.includes('-')) {
          setMaxPrice(e.target.value.replace('-', '').trim());
        } else {
          setMaxPrice(e.target.value);
        }
        break;
      default:
        console.log('wrong price name');
        break;
    }
  };
  const filterPriceFromURL = serchParams.get('price');
  useEffect(() => {
    if (filterPriceFromURL) {
      setMinPrice(filterPriceFromURL.split(' >= ')[0]);
      setMaxPrice(filterPriceFromURL.split(' >= ')[1]);
    }
  }, [filterPriceFromURL]);
  //For Brands filter
  const [shownBrands, setShownBrands] = useState<Brand[] | undefined>(
    groupBrands
  );
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);

  useEffect(() => {
    if (filteredBrandsArray && groupBrands) {
      if (filterPrice === '') {
        setShownBrands(groupBrands);
      } else {
        setShownBrands(filteredBrandsArray);
      }
    }
  }, [filterPrice, filteredBrandsArray, groupBrands]);

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prevSelectedBrands) =>
      prevSelectedBrands.includes(brand)
        ? prevSelectedBrands.filter((b) => b !== brand)
        : prevSelectedBrands[0] !== ''
        ? [...prevSelectedBrands, brand]
        : [brand]
    );
  };

  //For filter panel
  const [filters, setFilters] = useState<Brand[]>([]);
  useEffect(() => {
    if (filteredBrandsArray) {
      setFilters(filteredBrandsArray);
    }
  }, [filteredBrandsArray]);

  const handleCancelClick = () => {
    if (productsGroup == 'category') {
      setMinPrice('');
      setMaxPrice('');
      setSelectedBrands([]);
      router.replace(pathname, { scroll: false });
    } else {
      router.replace(`/categories/${category.id}`, { scroll: false });
    }
  };

  const handleItemClick: React.MouseEventHandler<HTMLButtonElement> = (
    event
  ) => {
    if (filters.length <= 1) {
      handleCancelClick();
    } else {
      const filterName = (event.currentTarget as HTMLElement).textContent;
      setFilters((prevFilters) =>
        prevFilters.filter((item) => item.name !== filterName)
      );
      const filtersToUpdate = filters
        .filter((item) => item.name !== filterName)
        .map((item) => item.id.toString());
      setSelectedBrands(filtersToUpdate);
    }
  };

  const isSubGoupInGroup = !!groupData(productsGroup).groupSubGroups?.length;

  return (
    <Container className="flex">
      <SidebarWithAttachments
        showFilters={true}
        brands={shownBrands}
        selectedBrands={selectedBrands}
        onBrandCheckboxChange={toggleBrand}
        minPrice={minPrice}
        maxPrice={maxPrice}
        onPriceChange={handlePriceChange}
      />
      <ContentContainer>
        <Breadcrumbs items={breadcrumsItems} />
        <Section>
          <div className=" mx-auto overflow-hidden text-center">
            <SectionTitle
              className="mb-4"
              title={groupData(productsGroup).groupTitle}
            />
            {filterBrands === '' && filterPrice === '' ? (
              isSubGoupInGroup ? (
                <>
                  {productsGroup === 'category' && (
                    <BrandsList categoryId={category.id} />
                  )}
                  {productsGroup === 'brand' && brand && (
                    <SeriesList categoryId={category.id} brandId={brand?.id} />
                  )}
                  {productsGroup === 'seria' && brand && seria && (
                    <SubseriesList
                      categoryId={category.id}
                      brandId={brand?.id}
                      seriesId={seria?.id}
                    />
                  )}
                  {productsGroup === 'subseria' &&
                    brand &&
                    seria &&
                    subseria && (
                      <SubSubseriesList
                        categoryId={category.id}
                        brandId={brand?.id}
                        seriesId={seria?.id}
                        subSeriesId={subseria.id}
                      />
                    )}
                </>
              ) : (
                <>
                  <Sort isDisable={false} />
                  {productsGroup !== 'category' ? (
                    <FiltersPanel
                      filters={filters}
                      onCancelClick={handleCancelClick}
                      onItemClick={handleItemClick}
                    />
                  ) : null}
                  <CategoriesProductsList
                    productGroup={productsGroup}
                    groupId={groupData(productsGroup).groupId}
                    sort={sort}
                  />
                </>
              )
            ) : (
              <>
                <Sort isDisable={false} />
                <FiltersPanel
                  filters={filters}
                  onCancelClick={handleCancelClick}
                  onItemClick={handleItemClick}
                />
                <FilteredProductsList
                  productGroup={productsGroup}
                  groupIds={groupData(productsGroup).groupIds}
                  sort={sort}
                  price={filterPrice}
                />
              </>
            )}
          </div>
        </Section>
        {filterBrands !== '' || filterPrice !== '' ? null : isSubGoupInGroup ? (
          <Section>
            <div className=" mx-auto overflow-hidden text-center">
              <SectionTitle className="mb-4" title="Товари" />
              <CategoriesProductsList
                productGroup={productsGroup}
                groupId={groupData(productsGroup).groupId}
                sort={sort}
              />
            </div>
          </Section>
        ) : null}
      </ContentContainer>
    </Container>
  );
}

export default CategoriesProductGroupPage;
