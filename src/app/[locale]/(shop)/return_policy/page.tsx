import Container from '@/components/Container/Container';
import ContentContainer from '@/components/Container/ContentContainer';
import TextContainer from '@/components/Container/TextContainer';
import Section from '@/components/Section/Section';
import SectionTitle from '@/components/Section/SectionTitle/SectionTitle';
import SidebarWithAttachments from '@/components/Sidebar/SidebarWithAttachments';
import Breadcrumbs from '@/components/Breadcrumb/Breadcrumbs';
import Text from '@/components/Text/Text';
import { useTranslations } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';

function Page({ params: { locale } }: { params: { locale: string } }) {
  const t = useTranslations('return_exchange');
  const breadcrumbsItems = [{ name: t('title') }];
  unstable_setRequestLocale(locale);
  return (
    <Container className="flex">
      <SidebarWithAttachments showFilters={false} />
      <ContentContainer>
        <Breadcrumbs items={breadcrumbsItems} />
        <Section>
          <SectionTitle
            title={
              <span className="flex flex-col">
                {t('title')}
                <span className="text-base mt-4 laptop:text-mid laptop:font-normal laptop:mt-0">
                  {t('subtitle')}
                </span>
              </span>
            }
            className="mb-6 laptop:mb-[10px]"
          />
          <TextContainer>
            <h2 className="text-md font-bold mb-6">
              {t('return_good_quality')}
            </h2>
            <Text className="mb-8">{t('good_quality_text')}</Text>
            <h2 className="text-md font-bold mb-6">{t('denied_reasons')}</h2>
            <ul className="list-disc list-inside">
              <li>{t('denied_conditions.used_item')}</li>
              <li>{t('denied_conditions.expired_time')}</li>
              <li>{t('denied_conditions.external_interference')}</li>
              <li>{t('denied_conditions.no_purchase_proof')}</li>
              <li>{t('denied_conditions.incomplete_item')}</li>
            </ul>
            <h2 className="text-md font-bold mb-6">{t('consumer_duties')}</h2>
            <ol className="list-decimal list-inside mb-8">
              <li>{t('consumer_duties_list.read_manual')}</li>
              <li>{t('consumer_duties_list.get_explanation')}</li>
              <li>{t('consumer_duties_list.use_properly')}</li>
              <li>{t('consumer_duties_list.follow_safety_rules')}</li>
            </ol>
            <Text className="mb-8">
              {t('return_exchange_process.process_description')}
            </Text>
            <Text className="mb-8">
              {t('return_exchange_process.contact_before_return')}
            </Text>
            <Text className="mb-8">
              {t('return_exchange_process.refund_method')}
            </Text>
            <Text className="mb-8">
              {t('return_exchange_process.return_shipping_cost')}
            </Text>
            <Text className="mb-8">
              {t('return_exchange_process.good_quality_shipping_cost')}
            </Text>
            <h2 className="text-md font-bold mb-6">
              {t('return_bad_quality.title')}
            </h2>
            <Text className="mb-8">
              {t('return_bad_quality.bad_quality_text')}
            </Text>
            <ol className="list-decimal list-inside mb-8">
              <li>
                {t('return_bad_quality.bad_quality_conditions.non_repairable')}
              </li>
              <li>
                {t(
                  'return_bad_quality.bad_quality_conditions.long_repair_time'
                )}
              </li>
              <li>
                {t(
                  'return_bad_quality.bad_quality_conditions.different_from_contract'
                )}
              </li>
            </ol>
            <Text className="mb-8">
              {t('return_bad_quality.satisfaction_process')}
            </Text>
            <Text className="mb-8">
              {t('return_bad_quality.expertise_process')}
            </Text>
            <Text>{t('technical_specs_note')}</Text>
          </TextContainer>
        </Section>
      </ContentContainer>
    </Container>
  );
}

export default Page;
