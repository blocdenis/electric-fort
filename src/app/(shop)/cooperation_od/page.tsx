import Breadcrumbs from '@/components/Breadcrumb/Breadcrumbs';
import Container from '@/components/Container/Container';
import ContentContainer from '@/components/Container/ContentContainer';
import TextContainer from '@/components/Container/TextContainer';
import Section from '@/components/Section/Section';
import SectionTitle from '@/components/Section/SectionTitle/SectionTitle';
import SidebarWithAttachments from '@/components/Sidebar/SidebarWithAttachments';
import { getCooperationOD } from '@/services/api/api';
import parse from 'html-react-parser';

export const revalidate = 0;

export default async function Page() {
  const text = await getCooperationOD();

  const links = [{ name: 'Офіційне дилерство' }];
  if (text) {
    return (
      <Container className="flex">
        <SidebarWithAttachments showFilters={false} />
        <ContentContainer>
          <Breadcrumbs items={links} />
          <Section>
            <SectionTitle className="mb-[10px]" title="Офіційне дилерство" />
            <TextContainer>
              <>{parse(text)}</>
            </TextContainer>
          </Section>
        </ContentContainer>
      </Container>
    );
  } else {
    return (
      <Container className="flex">
        <SidebarWithAttachments showFilters={false} />
        <ContentContainer>
          <Breadcrumbs items={links} />
          <Section>
            <SectionTitle className="mb-[10px]" title="Офіційне дилерство" />
            <TextContainer></TextContainer>
          </Section>
        </ContentContainer>
      </Container>
    );
  }
}
