import HeroSlider from '@/components/Hero/HeroSlider';

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
    <main className="flex min-h-screen flex-col items-center  p-24 ">
      <div className="text-white">
        <HeroSlider data={slides} />
      </div>
    </main>
  );
}
