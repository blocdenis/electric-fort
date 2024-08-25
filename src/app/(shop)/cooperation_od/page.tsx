import Breadcrumbs from '@/components/Breadcrumb/Breadcrumbs';
import Container from '@/components/Container/Container';
import ContentContainer from '@/components/Container/ContentContainer';
import TextContainer from '@/components/Container/TextContainer';
import Section from '@/components/Section/Section';
import SectionTitle from '@/components/Section/SectionTitle/SectionTitle';
import SidebarWithAttachments from '@/components/Sidebar/SidebarWithAttachments';
import React from 'react';

function Page() {
  const text = '';
  const links = [{ name: 'Офіційне дилерство' }];
  return (
    <Container className="flex">
      <SidebarWithAttachments showFilters={false} />
      <ContentContainer>
        <Breadcrumbs items={links} />
        <Section>
          <SectionTitle className="mb-[10px]" title="Офіційне дилерство" />
          <TextContainer>{text}</TextContainer>
        </Section>
      </ContentContainer>
    </Container>
  );
}

export default Page;
