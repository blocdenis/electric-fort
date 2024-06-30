import CategoriesSection from '@/components/Categories/CategoriesSection';
import HeroSlider from '@/components/Hero/HeroSlider';
import TextSection from '@/components/TextSection/TextSection';
import PopularProductsSection from '@/components/Products/PopularProductSection/PopularProductsSection';
import Advantages from '@/components/Advantages/Advantages';
import Partners from '@/components/Partners/Partners';
import Container from '@/components/Container/Container';
import SidebarWithAttachments from '@/components/Sidebar/SidebarWithAttachments';
import ContentContainer from '@/components/Container/ContentContainer';
import { getPopularProducts } from '@/services/api/api';
import hero from '../../public/Hero.jpg';
import hero2 from '../../public/Hero2.jpg';
import getQueryClient from '@/lib/utils/getQueryClient';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';

const slides = [
  {
    src: hero,
    alt: 'Hero image Electric Fort',
  },
  {
    src: hero2,
    alt: 'Image 2 for carousel',
  },
  {
    src: hero2,
    alt: 'Image 3 for carousel',
  },
];

export default async function Home() {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['popularProducts'],
    queryFn: () => getPopularProducts(),
    staleTime: 10 * 1000,
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <Container className="flex">
        <SidebarWithAttachments />
        <ContentContainer>
          <HeroSlider data={slides} />
          <CategoriesSection />
          <PopularProductsSection title="Популярні товари" />
          <Advantages />
          <Partners />
          <TextSection />
        </ContentContainer>
      </Container>
    </HydrationBoundary>
  );
}
