'use client';

import React from 'react';
import ProductCart from './ProductCart';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { ProductType } from '@/types';
import 'swiper/css/navigation';

interface Props {
  products: ProductType[];
}

const ProductCarousel: React.FC<Props> = ({ products }) => {
  return (
    <Swiper
      slidesPerView={6}
      spaceBetween={10}
      navigation
      modules={[Navigation]}
      className="mt-4"
      breakpoints={{
        450: {
          slidesPerView: 1,
          spaceBetween: 10,
        },

        640: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 4,
          spaceBetween: 40,
        },
        1024: {
          slidesPerView: 6,
          spaceBetween: 50,
        },
      }}
    >
      {products.map((product: ProductType) => (
        <SwiperSlide key={product.id} className="w-full h-[500px]">
          <div className="w-full h-[500px]">
            <ProductCart key={product.id} {...product} />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ProductCarousel;
