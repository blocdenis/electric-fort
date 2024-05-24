import PageBredcramb from '@/components/Breadcrumb/PageBredcramb';
import Container from '@/components/Container/Container';
import ContentContainer from '@/components/Container/ContentContainer';
import TextContainer from '@/components/Container/TextContainer';
import Section from '@/components/Section/Section';
import SectionTitle from '@/components/Section/SectionTitle/SectionTitle';
import SidebarWithAttachments from '@/components/Sidebar/SidebarWithAttachments';
import React from 'react';
import styles from '@/components/Section/SectionTitle/SectionTitle.module.scss';
import Text from '@/components/Text/Text';

function Page() {
  return (
    <Container className="flex">
      <SidebarWithAttachments />
      <ContentContainer>
        <PageBredcramb />
        <Section>
          <SectionTitle title="Умови повернення та обміну" />
          <TextContainer></TextContainer>
        </Section>
      </ContentContainer>
    </Container>
  );
}

export default Page;
