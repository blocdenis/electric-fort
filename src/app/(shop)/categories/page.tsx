import Section from '@/components/Section/Section';
import SectionTitle from '@/components/Section/SectionTitle/SectionTitle';
import React from 'react';
import Breadcrumbs from '@/components/Breadcrumb/Breadcrumbs';
import CategoriesList from '@/components/Categories/CategoriesList';
import Container from '@/components/Container/Container';
import SidebarWithAttachments from '@/components/Sidebar/SidebarWithAttachments';
import ContentContainer from '@/components/Container/ContentContainer';

async function Page() {
  const links = [{ name: 'Категорії' }];

  return (
    <Container className="flex">
      <SidebarWithAttachments showFilters={false} />
      <ContentContainer>
        <Breadcrumbs items={links} />
        <Section>
          <div className=" mx-auto overflow-hidden">
            <SectionTitle className="mb-4" title="Категорії товарів" />
            <CategoriesList />
          </div>
        </Section>
      </ContentContainer>
    </Container>
  );
}

export default Page;
