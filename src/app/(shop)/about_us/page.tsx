import Breadcrumbs from '@/components/Breadcrumb/Breadcrumbs';
import Container from '@/components/Container/Container';
import ContentContainer from '@/components/Container/ContentContainer';
import TextContainer from '@/components/Container/TextContainer';
import Section from '@/components/Section/Section';
import SectionTitle from '@/components/Section/SectionTitle/SectionTitle';
import SidebarWithAttachments from '@/components/Sidebar/SidebarWithAttachments';
import { getAboutUs } from '@/services/api/api';
import parse from 'html-react-parser';

export const revalidate = 0;

export default async function Page() {
  const text = await getAboutUs();

  const links = [{ name: 'Про нас' }];

  if (text) {
    return (
      <Container className="flex">
        <SidebarWithAttachments showFilters={false} />
        <ContentContainer>
          <Breadcrumbs items={links} />
          <Section>
            <div className=" mx-auto overflow-hidden">
              <SectionTitle className="mb-6 laptop:mb-8" title="Про нас" />
              <>{parse(text)}</>
            </div>
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
            <div className=" mx-auto overflow-hidden">
              <SectionTitle className="mb-6 laptop:mb-8" title="Про нас" />
              <TextContainer></TextContainer>
            </div>
          </Section>
        </ContentContainer>
      </Container>
    );
  }
}
