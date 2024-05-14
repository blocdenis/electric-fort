import Section from '@/components/Section/Section';
import SectionTitle from '@/components/Section/SectionTitle/SectionTitle';
import React from 'react';
import { categories } from '@/lib/db/categories';
import CategoryCard from '@/components/Categories/CategoryCard';
import styles from '@/components/Categories/CategoriesList.module.scss';
import Container from '@/components/Container/Container';
import Sidebar from '@/components/Sidebar/Sidebar';
import CatalogList from '@/components/Navigation/CatalogList';
import classNames from 'classnames';
import stylesFooter from '@/components/Footer/Footer.module.scss';
import ContactText from '@/components/Contact/ContactText/ContactText';
import ContactContent from '@/components/Contact/ContactContent/ContactContent';
import Map from '@/components/Map/Map';
import SidebarWithAttachments from '@/components/Sidebar/SidebarWithAttachments';
import ContentContainer from '@/components/Container/ContentContainer';
import Partners from '@/components/Partners/Partners';
import PageBredcramb from '@/components/Breadcrumb/PageBredcramb';

function Page() {
  return (
    <Container className="flex">
      <SidebarWithAttachments />
      <ContentContainer>
        <PageBredcramb />
        <Section>
          <div className=" pr-[64px] mx-auto overflow-hidden">
            <SectionTitle className="mb-4" title="Категорії товарів" />
            <ul className={styles.categories_list}>
              {categories.map((category) => (
                <li key={category.id} className="w-[220px] h-[228px]">
                  <CategoryCard
                    id={category.id}
                    name={category.name}
                    image={category.image}
                  />
                </li>
              ))}
            </ul>
          </div>
        </Section>
        <Partners />
      </ContentContainer>
    </Container>
  );
}

export default Page;
