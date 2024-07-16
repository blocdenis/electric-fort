import Breadcrumbs from '@/components/Breadcrumb/Breadcrumbs';
import Container from '@/components/Container/Container';
import ContentContainer from '@/components/Container/ContentContainer';
import TextContainer from '@/components/Container/TextContainer';
import Section from '@/components/Section/Section';
import SectionTitle from '@/components/Section/SectionTitle/SectionTitle';
import SidebarWithAttachments from '@/components/Sidebar/SidebarWithAttachments';
import Text from '@/components/Text/Text';
import CheckMarkIcon from '@/components/icons/CheckMarkIcon';
import React from 'react';

function Page() {
  const links = [{ name: 'Про нас' }];
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
            <SectionTitle className="mb-6 laptop:mb-8" title="Про нас" />
            <TextContainer>
              <h2 className=" text-md font-bold mb-6">
                Вітаємо вас на офіційному сайті ТОВ “Електрична Фортеця”!
              </h2>
              <Text className="mb-6">
                ТОВ “Електрична Фортеця”- є офіційним дилером з продажу
                оригінальної продукції від світових брендів електротоварів.
                Оптова та роздрібна торгівля.
              </Text>
              <Text className="mb-8">
                Організація була заснована у лютому 2023 року. Засновниця ТОВ
                “Електричної Фортеці”, підприємиця з 30 річним досвідом роботи у
                сфері підприємництва та управління- Беспала Наталія
                Володимирівна. ТОВ “Електрична Фортеця” офіційно співпрацює з
                такими  брендами як: Schneider Electric, Hager, Legrand, ABB,
                Viko, JUNG, Videx, Gira, ЗЗКМ, ДКС, Одескабель, Укркабель, СКЗ,
                Копос, ПВ3, ПВ1, ШВВП, ПВС, СІП, ВВГНГ/ВВГНГД та інші.
              </Text>
              <h2 className=" text-md font-bold mb-6">
                В нас ви знайдете такі види електротоварів як:
              </h2>
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
                  <span className=" text-xl text-red-700">!</span> УВАГА{'  '}
                  <span className=" text-xl text-red-700">!</span>
                </h2>
                <Text className="text-center text-base laptop:text-lg laptop:font-bold">
                  <span className="text-base laptop:text-xl">✅</span> Ми,
                  також, приймаємо заявки на спец. замовдення{' '}
                  <span className=" text-base laptop:text-xl">✅</span>
                </Text>
              </div>
              <h2 className=" text-md font-bold mb-6">
                Чому обирати варто, саме “Електричну Фортецю”?
              </h2>
              <Text className="mb-8">
                Тому що, ми найкращі у Харкові! Без перебільшення! Цьому є
                дійсні підтвердження! По-перше: ми співпрацюємо з усіма брендами
                ОФІЦІЙНО, НАПРЯМУ! По-друге, багато років поспіль, “Електрична
                Фортеця” посідає рейтинг ТОП 5 СЕРЕД УСІХ МІСТ УКРАЇНИ з
                дилерської діяльності бренду Schneider Electric!
              </Text>
              <h2 className=" text-md font-bold mb-6">
                Ми постійно розвиваємося та вдосконалюємося!
              </h2>
              <Text className="mb-8">
                До початку повномасштабного вторгнення, засновниця ТОВ
                “Електрична Фортеця ” - Беспала Н.В., регулярно їздила у
                відрядження разом із командою Schneider Electric Ukraine.
                Наталія Володимирівна у складі групи, відвідала заводи партнерів
                у таких країнах як Італія та Болгарія, з метою обміну досвідом,
                вивчення нових технологій та інновацій та отримання нових знань.
              </Text>
              <div className=" bg-secondary_green px-4 py-4 laptop:py-6 laptop:px-0 mb-8">
                <h1 className="text-center text-lg laptop:text-xl font-bold">
                  Наш принцип - <br></br>
                  «Електрична фортеця працює для людей та заради людей!»
                </h1>
              </div>
              <h2 className=" text-md font-bold mb-6">
                Що відрізняє ТОВ «Електричну Фортецю» від інших?
              </h2>
              <Text className="mb-6">
                У нас в пріоритеті швидкість та точність! Оформлюючи замовлення
                з нами, ви заощаджуєте багато часу, тому що продукція завжди є у
                наявності на нашому особистому складі; продукція на складі
                регулярно оновлюється та поповнюється.  
              </Text>
              <Text className="mb-6">
                Якщо, ви захочете придбати товар з ексклюзивних колекцій
                (рідкісну модель/колір товару), яких тимчасово не буде в
                наявності - ми зможемо дістати це швидко!
              </Text>
              <Text className="mb-8">
                Також,  для нас важлива ефективність вирішення усіх питань. Не
                переймайтеся, ми знайдемо рішення для кожного покупця
                індивідуально!
              </Text>
              <h2 className=" text-md font-bold">
                Ми задовільнимо попит клієнта на будь-який чек!
              </h2>
            </TextContainer>
          </div>
        </Section>
      </ContentContainer>
    </Container>
  );
}

export default Page;
