import Breadcrumbs from '@/components/Breadcrumb/Breadcrumbs';
import Container from '@/components/Container/Container';
import ContentContainer from '@/components/Container/ContentContainer';
import DeliveryBottomSection from '@/components/Delivery/DeliveryBottomSection';
import DeliveryStagesSection from '@/components/Delivery/DeliveryStagesSection';
import DeliveryTopSection from '@/components/Delivery/DeliveryTopSection';
import SectionTitle from '@/components/Section/SectionTitle/SectionTitle';
import SidebarWithAttachments from '@/components/Sidebar/SidebarWithAttachments';
import { getDelivery } from '@/services/api/api';
import parse from 'html-react-parser';

export const revalidate = 0;

export default async function Page() {
  const text = await getDelivery();

  const links = [{ name: 'Доставка і оплата' }];

  if (text) {
    return (
      <Container className="flex">
        <SidebarWithAttachments showFilters={false} />
        <ContentContainer>
          <Breadcrumbs items={links} />
          <div className=" ">
            <SectionTitle
              title="Доставка і оплата"
              className=" mt-6 mb-[60px]"
            />
            <>{parse(text)}</>
          </div>
        </ContentContainer>
      </Container>
    );
  } else
    return (
      <Container className="flex">
        <SidebarWithAttachments showFilters={false} />
        <ContentContainer>
          <Breadcrumbs items={links} />
          <div className=" ">
            <SectionTitle
              title="Доставка і оплата"
              className=" mt-6 mb-[60px]"
            />
          </div>
          <DeliveryTopSection />
          <DeliveryStagesSection />
          <DeliveryBottomSection />
        </ContentContainer>
      </Container>
    );
}
