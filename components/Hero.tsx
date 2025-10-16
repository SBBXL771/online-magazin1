'use client';

import Image from 'next/image';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Hero = () => {
  const images = [
    'https://images.uzum.uz/d2mo6fr4eu2h0tmp0s20/main_page_banner.jpg',
    'https://images.uzum.uz/d2quubd2llnd6juk9feg/main_page_banner.jpg',
    'https://images.uzum.uz/d0gut78n274j5scme49g/main_page_banner.jpg',
  ];

  return (
    <div className="mt-4">
      <Swiper
        className="w-313 h-[400px]"
        navigation
        pagination={{ clickable: true }}
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={50}
        slidesPerView={1}
        loop
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
      >
        {images.map((src, index) => (
          <SwiperSlide key={index} className="relative w-full h-[400px]">
            <Image
              className="aspect-auto w-full rounded-xl"
              src={src}
              alt={`banner-${index}`}
              fill
              priority={index === 0}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Hero;
