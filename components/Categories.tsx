"use client";

import { Link } from "@/i18n/navigation";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

interface CategoryType {
  id: number;
  title: string;
  thumbnail: string;
  slug: string;
}

const Categories = () => {
  const [Categories, setCategories] = useState([]);
  const fetchCategories = async () => {
    try {
      const category = await axios.get("https://dummyjson.com/categories");
      setCategories(category.data);
    } catch (error) {}
  };

  useEffect(() => {
    fetchCategories();
  }, []);
  return (
    <div className="mt-8">
      <h1 className="whitespace-nowrap text-2xl font-bold mb-4">Популярные категории</h1>
      <Swiper
        slidesPerView={6}
        spaceBetween={25}
        navigation
        className="h-fit w-full"
        breakpoints={{
          450: {
            slidesPerView: 1.5,
            spaceBetween: 10,
          },

          640: {
            slidesPerView: 2.5,
            spaceBetween: 20,

          },
          768: {
            slidesPerView: 4.5,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 6.5,
            spaceBetween: 50,
          },
        }}
        modules={[Navigation]}
      >
        {Categories.map((category: CategoryType) => (
          <SwiperSlide className="cursor-pointer border border-gray-300 py-[22px] rounded-md px-9 ">
            <div className="flex flex-col items-center">
              <Link href={`/category/${category.slug}`}>
              <Image
                src={category.thumbnail}
                alt={category.title}
                width={200}
                height={200}
              />
              <h1 className="line-clamp-1 font-semibold text-center">
                {category.title.split(" ").slice(0, 1).join(" ")}
              </h1>
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Categories;
