import Container from '@/components/Container/Container';
import ContentContainer from '@/components/Container/ContentContainer';
import TextContainer from '@/components/Container/TextContainer';
import Section from '@/components/Section/Section';
import SectionTitle from '@/components/Section/SectionTitle/SectionTitle';
import SidebarWithAttachments from '@/components/Sidebar/SidebarWithAttachments';
import Breadcrumbs from '@/components/Breadcrumb/Breadcrumbs';

function Page() {
  const breadcrambsItens = [{ name: 'Умови повернення та обміну' }];
  return (
    <Container className="flex">
      <SidebarWithAttachments />
      <ContentContainer>
        <Breadcrumbs items={breadcrambsItens} />
        <Section>
          <SectionTitle title="Умови повернення та обміну" />
          <TextContainer></TextContainer>
        </Section>
      </ContentContainer>
    </Container>
  );
}

export default Page;
