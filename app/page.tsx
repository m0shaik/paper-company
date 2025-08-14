import React from 'react';
import HeroSection from '@/app/components/HomePage/Hero/Hero';
import AboutSection from '@/app/components/HomePage/About/About';
import MenuSection from '@/app/components/HomePage/Menu/Menu';
import Testimonies from '@/app/components/HomePage/Testimonies/Testimonies';
import { Metadata } from 'next';
import FeaturedMenuCard from '@/app/components/MenuCard/FeaturedMenuCard';
import { StoreSection } from '@/app/components/HomePage/StoreSection/StoreSection';
import { HomeGallery } from '@/app/components/HomePage/HomeGallery/HomeGallery';
import { getPageSEO } from '@/app/lib/seo';

export const metadata: Metadata = getPageSEO('home');

const galleryImages = [
  {
    id: 1,
    src: '/images/placeholder.jpg',
    title: 'Featured Products',
    description:
      'Discover our curated selection of top-quality products, carefully chosen to meet your highest standards.',
  },
  {
    id: 2,
    src: '/images/placeholder.jpg',
    title: 'Sustainable Solutions',
    description:
      'Explore our eco-friendly product line made from sustainable materials and responsible manufacturing practices.',
  },
  {
    id: 3,
    src: '/images/placeholder.jpg',
    title: 'Creative Collection',
    description:
      'Browse our innovative products with unique designs and features to inspire your next project.',
  },
  {
    id: 4,
    src: '/images/placeholder.jpg',
    title: 'Professional Quality',
    description:
      'Premium products designed to meet the demanding needs of professionals and businesses alike.',
  },
];

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <HeroSection />
      <StoreSection />
      <HomeGallery />
      {/* ... rest of your components ... */}
    </main>
  );
}
