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
import { useFilters } from '@/context/FiltersContext';

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
  page: number;
  pageSize: number;
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
  page,
  pageSize,
}: CategoriesProductGroupProps) {
  const router = useRouter();
  const pathname = usePathname();
  const serchParams = useSearchParams();
  const { setShownBrands } = useFilters();

  const { data: filteredProducts, isPending } = useQuery({
    queryKey: [
      'products',
      category.id,
      filterBrands,
      filterPrice,
      sort,
      page,
      pageSize,
    ],
    queryFn: () =>
      getFilteredProducts(
        category.id,
        filterBrands,
        filterPrice,
        sort,
        page,
        pageSize
      ),
    staleTime: 10 * 1000,
  });

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

  const groupData = (productsGroup: ProductGroup) => {
    switch (productsGroup) {
      case 'category':
        return {
          groupId: category.id,
          groupIds: filterBrands,
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

  useEffect(() => {
    if (filteredBrandsArray && groupBrands) {
      if (filterPrice === '') {
        setShownBrands(groupBrands);
      } else {
        setShownBrands(filteredBrandsArray);
      }
    }
  }, [filterPrice, filteredBrandsArray, groupBrands, setShownBrands]);

  const isSubGoupInGroup = !!groupData(productsGroup).groupSubGroups?.length;

  return (
    <Container className="flex">
      <SidebarWithAttachments showFilters={true} />
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
                    <FiltersPanel incomeFilters={filteredBrandsArray} />
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
                {!isPending ? (
                  <FiltersPanel incomeFilters={filteredBrandsArray} />
                ) : null}
                <FilteredProductsList
                  // urlPage={urlPage}
                  // onShowMoreClick={handleShowMoreBtnClick}
                  productGroup={productsGroup}
                  categoryId={category.id}
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
