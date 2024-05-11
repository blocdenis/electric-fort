import CategoriesSection from '@/components/Categories/CategoriesSection';
import HeroSlider from '@/components/Hero/HeroSlider';
import TextSection from '@/components/TextSection/TextSection';
import PopularProductsSection from '@/components/Products/PopularProductSection/PopularProductsSection';
import Advantages from '@/components/Advantages/Advantages';
import Partners from '@/components/Partners/Partners';
import Sidebar from '@/components/Sidebar/Sidebar';
import CatalogList from '@/components/Navigation/CatalogList';
import classNames from 'classnames';

import ContactText from '@/components/Contact/ContactText/ContactText';
import ContactContent from '@/components/Contact/ContactContent/ContactContent';
import Map from '@/components/Map/Map';
import Container from '@/components/Container/Container';
import SidebarWithAttachments from '@/components/Sidebar/SidebarWithAttachments';

const slides = [
  {
    src: 'https://picsum.photos/seed/img5/600/400',
    alt: 'Image 1 for carousel',
  },
  {
    src: 'https://picsum.photos/seed/img6/600/400',
    alt: 'Image 2 for carousel',
  },
  {
    src: 'https://picsum.photos/seed/img7/600/400',
    alt: 'Image 3 for carousel',
  },
];

export default function Home() {
  return (
    <Container className="flex">
      <SidebarWithAttachments />
      <div className="w-full laptop:w-[calc(100%-340px)] flex-shrink">
        <HeroSlider data={slides} />
        <CategoriesSection />
        <PopularProductsSection />
        <Advantages />
        <Partners />
        <TextSection />
      </div>
    </Container>
  );
}
