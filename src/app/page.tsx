import Advantages from '@/components/Advantages/Advantages';
import CategoriesSection from '@/components/Categories/CategoriesSection';
import HeroSlider from '@/components/Hero/HeroSlider';
import TextSection from '@/components/TextSection/TextSection';

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
    <>
      <HeroSlider data={slides} />
      <CategoriesSection />
      <Advantages />
      <TextSection />
    </>
  );
}

// className="flex min-h-screen flex-col items-center
