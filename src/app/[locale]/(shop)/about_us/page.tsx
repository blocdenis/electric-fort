import Breadcrumbs from '@/components/Breadcrumb/Breadcrumbs';
import Container from '@/components/Container/Container';
import ContentContainer from '@/components/Container/ContentContainer';
import TextContainer from '@/components/Container/TextContainer';
import Section from '@/components/Section/Section';
import SectionTitle from '@/components/Section/SectionTitle/SectionTitle';
import SidebarWithAttachments from '@/components/Sidebar/SidebarWithAttachments';
import Text from '@/components/Text/Text';
import CheckMarkIcon from '@/components/icons/CheckMarkIcon';
import { useTranslations } from 'next-intl';
import React from 'react';

function Page() {
  const t = useTranslations('AboutUs');
  const links = [{ name: t('breadcrumbs') }];
  const electricalGoodsTypes = [
    'кабель, провід;',
    'розподільчі щити; монтажні бокси;',
    'розетки та вимикачі;',
    'світильники, лампи, прожектори, світлодіодні стрічки та блоки живлення;',
    'трансформатори струму;',
    'автоматичні вимикачі;',
    'реле на обладнання;',
    'кріплення різної характеристики;',
    'обладнання та лінійна фурнітура для СІП;',
    'універсальний набір інструментів для електриків-монтажників;',
    'металевий лоток, кабель-канал, труба гофрована.',
  ];
  return (
    <Container className="flex">
      <SidebarWithAttachments showFilters={false} />
      <ContentContainer>
        <Breadcrumbs items={links} />
        <Section>
          <div className=" mx-auto overflow-hidden">
            <SectionTitle
              className="mb-6 laptop:mb-8"
              title={t('breadcrumbs')}
            />
            <TextContainer>
              <h2 className=" text-md font-bold mb-6">{t('welcome')}</h2>
              <Text className="mb-6">{t('officialDealer')}</Text>
              <Text className="mb-8">{t('founded')}</Text>
              <h2 className=" text-md font-bold mb-6">{t('findHere')}</h2>
              <ul className="flex flex-col gap-4 mb-8">
                {electricalGoodsTypes.map((type) => (
                  <li
                    key={type}
                    className="flex items-center gap-2 laptop:gap-[34px]"
                  >
                    <div className="w-[17px] h-[17px]">
                      <CheckMarkIcon />
                    </div>
                    {type}
                  </li>
                ))}
              </ul>
              <div className=" bg-secondary_green py-4 px-4 laptop:py-6 laptop:px-0 mb-8">
                <h2 className="text-center font-bold text-lg laptop:text-xl laptop:mb-3">
                  <span className=" text-xl text-red-700">!</span>{' '}
                  {t('attention')}
                  <span className=" text-xl text-red-700">!</span>
                </h2>
                <Text className="text-center text-base laptop:text-lg laptop:font-bold">
                  <span className="text-base laptop:text-xl">✅</span>{' '}
                  {t('customOrders')}
                  <span className=" text-base laptop:text-xl">✅</span>
                </Text>
              </div>
              <h2 className=" text-md font-bold mb-6">{t('whyChooseUs')}</h2>
              <Text className="mb-8">{t('bestInKharkiv')}</Text>
              <h2 className=" text-md font-bold mb-6">
                {t('continuousImprovement')}
              </h2>
              <Text className="mb-8">{t('beforeWar')}</Text>
              <div className=" bg-secondary_green px-4 py-4 laptop:py-6 laptop:px-0 mb-8">
                <h1 className="text-center text-lg laptop:text-xl font-bold">
                  Наш принцип - <br></br>
                  {t('principle')}
                </h1>
              </div>
              <h2 className=" text-md font-bold mb-6">{t('difference')}</h2>
              <Text className="mb-6">{t('priority')} </Text>
              <Text className="mb-6">{t('exclusiveItems')}</Text>
              <Text className="mb-8">{t('efficiency')}</Text>
              <h2 className=" text-md font-bold">{t('anyBudget')}</h2>
            </TextContainer>
          </div>
        </Section>
      </ContentContainer>
    </Container>
  );
}

export default Page;
