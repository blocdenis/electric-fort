import Breadcrumbs from '@/components/Breadcrumb/Breadcrumbs';
import Container from '@/components/Container/Container';
import ContentContainer from '@/components/Container/ContentContainer';
import DeliveryStagesSection from '@/components/Delivery/DeliveryStagesSection';
import DeliveryTopSection from '@/components/Delivery/DeliveryTopSection';
import SectionTitle from '@/components/Section/SectionTitle/SectionTitle';
import SidebarWithAttachments from '@/components/Sidebar/SidebarWithAttachments';

function Page() {
  const links = [{ name: 'Доставка і оплата' }];
  return (
    <Container className="flex">
      <SidebarWithAttachments showFilters={false} />
      <ContentContainer>
        <Breadcrumbs items={links} />
        <div className=" ">
          <SectionTitle title="Доставка і оплата" className=" mt-6 mb-[60px]" />
        </div>
        <DeliveryTopSection />
        <DeliveryStagesSection />
      </ContentContainer>
    </Container>
  );
}

export default Page;
