'use client';
import React from 'react';
import Section from '../Section/Section';
import SectionTitle from '../Section/SectionTitle/SectionTitle';
import ButtonLink from '../Buttons/ButtonLink/ButtonLink';
import styles from './CategoriesSection.module.scss';
import { getAllCategories } from '@/services/api/api';
import CategoriesSectionList from './CategoriesSectionList';
import { useQuery } from '@tanstack/react-query';
import CategoryCardPlaceholder from './CategoryCardPlaceholder';

function CategoriesSection() {
  const { data: categories, isRefetching } = useQuery({
    queryKey: ['categories'],
    queryFn: () => getAllCategories(),
    staleTime: 10,
  });

  // const categories = await getAllCategories({ next: { revalidate: 0 } });

  return (
    <Section>
      <div className={styles.container}>
        <SectionTitle title="Категорії товарів" className=" mb-4" />
        {isRefetching ? (
          <ul className="flex pl-4 laptop:pl-6 h-[228px] w-full overflow-hidden">
            <li className="min-w-[calc(62.5%-(8px*1/2))] mr-[8px] laptop:mr-[23px] min-[425px]:min-w-[calc(55.56%-(8px*1/2))] min-[472px]:min-w-[calc(50%-(8px*1/2))] min-[598px]:min-w-[calc(40%-(8px*2/3))] min-[708px]:min-w-[calc(33.33%-(8px*2/3))] min-[940px]:min-w-[calc(28.57%-(8px*3/4))] laptop:min-w-[calc(50%-(23px*1/2))] min-[1100px]:min-w-[calc(33.33%-(23px*2/3))] min-[1300px]:min-w-[calc(25%-(23px*3/4))]">
              <CategoryCardPlaceholder />
            </li>
            <li className="min-w-[calc(62.5%-(8px*1/2))] mr-[8px] laptop:mr-[23px] min-[425px]:min-w-[calc(55.56%-(8px*1/2))] min-[472px]:min-w-[calc(50%-(8px*1/2))] min-[598px]:min-w-[calc(40%-(8px*2/3))] min-[708px]:min-w-[calc(33.33%-(8px*2/3))] min-[940px]:min-w-[calc(28.57%-(8px*3/4))] laptop:min-w-[calc(50%-(23px*1/2))] min-[1100px]:min-w-[calc(33.33%-(23px*2/3))] min-[1300px]:min-w-[calc(25%-(23px*3/4))]">
              <CategoryCardPlaceholder />
            </li>
            <li className="min-w-[calc(62.5%-(8px*1/2))] mr-[8px] laptop:mr-[23px] min-[425px]:min-w-[calc(55.56%-(8px*1/2))] min-[472px]:min-w-[calc(50%-(8px*1/2))] min-[598px]:min-w-[calc(40%-(8px*2/3))] min-[708px]:min-w-[calc(33.33%-(8px*2/3))] min-[940px]:min-w-[calc(28.57%-(8px*3/4))] laptop:min-w-[calc(50%-(23px*1/2))] min-[1100px]:min-w-[calc(33.33%-(23px*2/3))] min-[1300px]:min-w-[calc(25%-(23px*3/4))]">
              <CategoryCardPlaceholder />
            </li>
            <li className="min-w-[calc(62.5%-(8px*1/2))] mr-[8px] laptop:mr-[23px] min-[425px]:min-w-[calc(55.56%-(8px*1/2))] min-[472px]:min-w-[calc(50%-(8px*1/2))] min-[598px]:min-w-[calc(40%-(8px*2/3))] min-[708px]:min-w-[calc(33.33%-(8px*2/3))] min-[940px]:min-w-[calc(28.57%-(8px*3/4))] laptop:min-w-[calc(50%-(23px*1/2))] min-[1100px]:min-w-[calc(33.33%-(23px*2/3))] min-[1300px]:min-w-[calc(25%-(23px*3/4))]">
              <CategoryCardPlaceholder />
            </li>
          </ul>
        ) : (
          <CategoriesSectionList categories={categories} />
        )}
        <div className={styles.button_container}>
          <ButtonLink
            className=" mt-6"
            href="/categories"
            title="Переглянути всі"
          />
        </div>
      </div>
    </Section>
  );
}

export default CategoriesSection;
