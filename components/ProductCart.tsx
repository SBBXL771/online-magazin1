import { ProductType } from '@/types';
import { Bell, ChartColumn, Heart, Star } from 'lucide-react';
import Image from 'next/image';
import React, { FC } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useCart } from '@/store/useCart';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const ProductCart: FC<ProductType> = ({
  title,
  id,
  images,
  price,
  discountPercentage,
  rating,
  tags,
  category,
}) => {
  const discountAmount = (price * discountPercentage) / 100;
  const discountPrice = price - discountAmount;

  const { addCart } = useCart();

  return (
    <div className="product-card mt-[15px] pt-[15px] px-[15px] rounded-md h-fit w-full">
      <Swiper slidesPerView={1} pagination className="relative">
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="flex justify-center items-center relative">
              <div className="flex gap-1 absolute text-white top-1 left-3">
                {tags.map((tag, i) => (
                  <span
                    key={i}
                    className="text-xs whitespace-nowrap rounded-[2px] bg-primary px-1 py-0.5 mt-10"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <Image
                src={image}
                alt={title}
                width={170}
                height={170}
                className="mt-18 max-h-[170px] object-cover"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="flex flex-col gap-2 mt-8">
        <div className="text-[#FFB000] flex items-center gap-1">
          <Star width={17} height={15} fill="#FFB000" />
          <span className="text-sm font-semibold">{rating}</span>
        </div>

        <span className="line-clamp-1 font-semibold">{title}</span>

        <div className="flex items-center gap-2">
          <span className="text-[20px] text-primary font-semibold">
            ${discountPrice.toFixed(2)}
          </span>
          <span className="text-sm line-through text-[#8C8C8C]">
            ${price.toFixed(2)}
          </span>
        </div>

        <button
          onClick={() =>
            addCart({
              title,
              id,
              images,
              price,
              discountPercentage,
              rating,
              tags,
              count: 1,
              category,
            })
          }
          className="bg-primary text-white py-2.5 w-full rounded-xl"
        >
          В корзину
        </button>
      </div>

      <div className="flex justify-between items-center py-5">
        <button>
          <Heart height={25} />
        </button>
        <button>
          <ChartColumn height={25} />
        </button>
        <button>
          <Bell height={25} />
        </button>
      </div>
    </div>
  );
};

export default ProductCart;
