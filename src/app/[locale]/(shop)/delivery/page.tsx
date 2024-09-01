import Breadcrumbs from '@/components/Breadcrumb/Breadcrumbs';
import Container from '@/components/Container/Container';
import ContentContainer from '@/components/Container/ContentContainer';
import DeliveryBottomSection from '@/components/Delivery/DeliveryBottomSection';
import DeliveryStagesSection from '@/components/Delivery/DeliveryStagesSection';
import DeliveryTopSection from '@/components/Delivery/DeliveryTopSection';
import SectionTitle from '@/components/Section/SectionTitle/SectionTitle';
import SidebarWithAttachments from '@/components/Sidebar/SidebarWithAttachments';
import { useTranslations } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';

function Page({ params: { locale } }: { params: { locale: string } }) {
  const t = useTranslations('Delivery');
  const links = [{ name: t('breadcrumbs') }];
  unstable_setRequestLocale(locale);
  return (
    <Container className="flex">
      <SidebarWithAttachments showFilters={false} />
      <ContentContainer>
        <Breadcrumbs items={links} />
        <div className=" ">
          <SectionTitle title={t('title')} className=" mt-6 mb-[60px]" />
        </div>
        <DeliveryTopSection />
        <DeliveryStagesSection />
        <DeliveryBottomSection />
      </ContentContainer>
    </Container>
  );
}

export default Page;
