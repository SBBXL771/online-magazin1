'use client';

import { cn } from '@/lib/utils';
import { ProductType } from '@/types';
import axios from 'axios';
import React, { FC, useEffect, useState } from 'react';
import ProductCart from './ProductCart';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

interface Category {
  slug: string;
  name: string;
  url: string;
}

interface Props {
  title: string;
  categories: Category[];
}

const CategoriedProduct: FC<Props> = ({ title, categories }) => {
  const [products, setProducts] = useState<ProductType[]>([]);

  const [activeTab, setActiveTab] = useState('all');

  const fetchData = async () => {
    try {
      const slug = activeTab === 'all' ? '' : `category/${activeTab}`;
      const products = await axios.get(
        `https://dummyjson.com/products/${slug}`,
      );
      setProducts(products.data.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [activeTab]);
  return (
    <div className="mt-8">
      <div className="flex justify-between items-center w-full">
        <h2 className="text-xl fond-xl grow sink">{title}</h2>
        <Swiper
          slidesPerView={6}
          spaceBetween={10}
          className=" h-[40px] flex items-center w-[610px]"
        >
          <SwiperSlide className="">
            <button
              onClick={() => setActiveTab('all')}
              className={cn(
                'text-sm px-3 py-2 rounded-sm',
                activeTab === 'all'
                  ? 'bg-white border border-gray-400'
                  : 'bg-gray-100 hover:bg-gray-200',
              )}
            >
              All
            </button>
          </SwiperSlide>

          {categories.map((category) => (
            <SwiperSlide key={category.slug}>
              <button
                onClick={() => setActiveTab(category.slug)}
                className={cn(
                  'text-sm px-3 py-2 rounded-sm',
                  activeTab === category.slug
                    ? 'bg-white border border-gray-400'
                    : 'bg-gray-100 hover:bg-gray-200',
                )}
                key={category.slug}
              >
                <span className="line-clamp-1">
                  {category.name.split(' ').join(' ')}
                </span>
              </button>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
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
    </div>
  );
};

export default CategoriedProduct;
