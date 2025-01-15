import Container from '@/components/Container/Container';
import ContentContainer from '@/components/Container/ContentContainer';
import TextContainer from '@/components/Container/TextContainer';
import Section from '@/components/Section/Section';
import SectionTitle from '@/components/Section/SectionTitle/SectionTitle';
import SidebarWithAttachments from '@/components/Sidebar/SidebarWithAttachments';
import Breadcrumbs from '@/components/Breadcrumb/Breadcrumbs';
import Text from '@/components/Text/Text';
import { getReturnPolicy } from '@/services/api/api';
import parse from 'html-react-parser';

export const revalidate = 0;

export default async function Page() {
  const text = await getReturnPolicy();

  const breadcrambsItens = [{ name: 'Повернення та обмін' }];
  if (text) {
    return (
      <Container className="flex">
        <SidebarWithAttachments showFilters={false} />
        <ContentContainer>
          <Breadcrumbs items={breadcrambsItens} />
          <Section>
            <div className=" mx-auto overflow-hidden">
              <SectionTitle
                title={
                  <span className=" flex flex-col">
                    Умови повернення та обміну
                    <span className=" text-base mt-4 laptop:text-mid laptop:font-normal laptop:mt-0">
                      Повернення товару можливе при дотриманні наступних умов:
                    </span>
                  </span>
                }
                className="mb-6 laptop:mb-[10px]"
              />
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
          <Breadcrumbs items={breadcrambsItens} />
          <Section>
            <SectionTitle
              title={
                <span className=" flex flex-col">
                  Умови повернення та обміну
                  <span className=" text-base mt-4 laptop:text-mid laptop:font-normal laptop:mt-0">
                    Повернення товару можливе при дотриманні наступних умов:
                  </span>
                </span>
              }
              className="mb-6 laptop:mb-[10px]"
            />
            <TextContainer></TextContainer>
          </Section>
        </ContentContainer>
      </Container>
    );
  }
}

// export default Page;
