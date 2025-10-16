"use client";

import { useState, useEffect, use } from "react";
import Image from "next/image";
import { Store, Truck, Heart, BarChart2, Bell } from "lucide-react";

async function getProduct(id: string) {
  const res = await fetch(`https://dummyjson.com/products/${id}`);
  if (!res.ok) throw new Error("Failed to fetch product");
  return res.json();
}

export default function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const [product, setProduct] = useState<any>(null);
  const [mainImage, setMainImage] = useState<string>("");

  useEffect(() => {
    getProduct(id).then((data) => {
      setProduct(data);
      setMainImage(data.images[0]);
    });
  }, [id]);

  if (!product) return <p className="p-6">Loading...</p>;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">{product.title}</h1>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-5">
          <div className="relative w-full aspect-square border-2 border-gray-300 rounded-lg overflow-hidden">
            <div className="absolute top-2 left-2 flex gap-2 z-10">
              <span className="bg-red-600 text-white text-sm px-2 py-1 rounded-md">
                -39%
              </span>
              <span className="bg-red-600 text-white text-sm px-2 py-1 rounded-md">
                Товар из рекламы
              </span>
            </div>
            <Image
              src={mainImage}
              alt={product.title}
              fill
              className="object-contain bg-white"
            />
          </div>

          <div className="flex gap-2 mt-3">
            {product.images.slice(0, 5).map((img: string, idx: number) => (
              <div
                key={idx}
                className={`relative w-16 h-16 border rounded-md overflow-hidden cursor-pointer ${
                  mainImage === img ? "ring-2 ring-red-500" : ""
                }`}
                onClick={() => setMainImage(img)}
              >
                <Image
                  src={img}
                  alt={`thumb-${idx}`}
                  fill
                  className="object-contain bg-white"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="md:col-span-4">
          <p className="text-gray-600 mb-4">{product.brand}</p>

          <div className="mb-4">
            <p className="font-medium mb-2">Цвет корпуса</p>
            <button className="px-4 py-2 bg-gray-200 rounded-md mr-2">
              Серый
            </button>
            <button className="px-4 py-2 bg-gray-200 rounded-md">Черный</button>
          </div>

          <h3 className="font-semibold mb-1">Основные характеристики:</h3>
          <ul className="text-gray-700 space-y-1 text-sm mb-4">
            <li>Категория: {product.category}</li>
            <li>Описание: {product.description}</li>
          </ul>

          <a href="" className="text-red-600 text-sm underline">
            Все характеристики
          </a>
        </div>

        <div className="md:col-span-3 border-2 border-gray-300 rounded-lg p-3 shadow-sm flex flex-col max-h-[400px]">
          <div>
            <div className="flex items-baseline gap-3 mb-2">
              <p className="text-2xl font-bold text-red-600">299.99 ₽</p>
              <p className="text-sm text-gray-400 line-through">120 ₽</p>
            </div><br />

            <p className="text-sm text-gray-700 mb-4">
              Рассрочка от <b>267 ₽/мес.</b><br />
            </p>

            <button className="w-full bg-red-600 text-white py-3 rounded-lg font-medium mb-4">
              Добавить в корзину
            </button><br />

            <div className="space-y-1 text-sm text-gray-700 mb-2">
              <div className="flex items-center gap-2">
                <Store className="w-5 h-5 text-green-600" />
                <span>Самовывоз завтра, бесплатно</span><br />
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-5 h-5 text-blue-600" />
                <span>Доставка завтра</span><br /><br />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between -t pt-1">
            <button className="p-2  rounded-lg">
              <Heart className="w-6 h-6 text-gray-600" />
            </button>
            <button className="p-2  rounded-lg">
              <BarChart2 className="w-6 h-6 text-gray-600" />
            </button>
            <button className="p-2  rounded-lg">
              <Bell className="w-6 h-6 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}