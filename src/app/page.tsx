'use client';

import { useRouter } from 'next/navigation';
import { HeroCarousel, HeroCarouselItem } from '@/components/HeroCarousel';
import { subjects } from '@/data/subjects';

const aestheticImages = [
  "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=2000&auto=format&fit=crop", // Film
  "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=2000&auto=format&fit=crop", // Law
  "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=2000&auto=format&fit=crop", // Design
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2000&auto=format&fit=crop", // Planning
  "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?q=80&w=2000&auto=format&fit=crop"  // Ancient
];

const accents = [
  "#e11d48", // rose
  "#7c3aed", // violet
  "#2563eb", // blue
  "#10b981", // emerald
  "#f59e0b"  // amber
];

export default function Dashboard() {
  const router = useRouter();

  const carouselItems: HeroCarouselItem[] = subjects.map((sub, i) => ({
    id: sub.id,
    title: sub.title.replace(' ', '\n'), // break title into two lines if possible
    image: aestheticImages[i],
    credit: "T.Y. B.A.M.M.C",
    meta: [sub.date.split(' ')[0], sub.date.split(' ')[1].replace(/[()]/g, '')],
    accent: accents[i]
  }));

  const handleSubjectClick = (item: HeroCarouselItem) => {
    router.push(`/${item.id}`);
  };

  return (
    <div className="h-screen w-screen bg-black overflow-hidden">
      <HeroCarousel 
        items={carouselItems} 
        brand="Audio Study Guide"
        onActiveClick={handleSubjectClick}
      />
    </div>
  );
}
