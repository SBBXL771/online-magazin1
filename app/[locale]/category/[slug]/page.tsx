'use client';

import ProductCarousel from '@/components/ProductCarausel';
import axios from 'axios';
import React from 'react';

interface Props {
  params: {
    slug: string;
  };
}

const CategoryDetailes = async ({ params }: Props) => {
  try {
    const { slug } = params;
    const result = await axios.get(
      `https://dummyjson.com/products/category/${slug}`,
    );
    return (
      <div>
        <h1 className="text-4xl font-semibold ">{slug}</h1>
        <ProductCarousel products={result.data.products} />
      </div>
    );
  } catch (error) {
    return <div>Serverda Hatolik</div>;
  }
};

export default CategoryDetailes;
