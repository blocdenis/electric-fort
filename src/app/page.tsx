import CategoriesSection from '@/components/Categories/CategoriesSection';
import HeroSlider from '@/components/Hero/HeroSlider';
import TextSection from '@/components/TextSection/TextSection';
import PopularProductsSection from '@/components/Products/PopularProductSection/PopularProductsSection';
import Advantages from '@/components/Advantages/Advantages';
import Partners from '@/components/Partners/Partners';
import Container from '@/components/Container/Container';
import SidebarWithAttachments from '@/components/Sidebar/SidebarWithAttachments';
import ContentContainer from '@/components/Container/ContentContainer';
import { getPopularProducts, getProducts } from '@/services/api/api';

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

export default async function Home() {
  const response = await getPopularProducts();
  const products = response.data;

  return (
    <Container className="flex">
      <SidebarWithAttachments />
      <ContentContainer>
        <HeroSlider data={slides} />
        <CategoriesSection />
        <PopularProductsSection title="Популярні товари" products={products} />
        <Advantages />
        <Partners />
        <TextSection />
      </ContentContainer>
    </Container>
  );
}
