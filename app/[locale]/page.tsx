import CategoriedProducts from '@/components/CategoriedProducts';
import Categories from '@/components/Categories';
import Hero from '@/components/Hero';
import axios from 'axios';
import { getTranslations } from 'next-intl/server';

export const metadata = {
  title: 'Arzon texnika',
  description: 'Arzon va sifatli maxsulotlar',
  keywords: ['texnika', 'arzon texnika', 'sifatli texnika'],
};

export const SalesCategory = [
  'Все',
  'Смартфоны',
  'Стиральные машины',
  'Пылесосы',
  'Холодильники',
  'Телевизоры',
  'Микроволновые печи',
];

const Home = async () => {
  try {
    const t = await getTranslations('HomePage');

    const [categoriesRes, productsRes] = await Promise.all([
      axios.get('https://dummyjson.com/products/categories'),
      axios.get('https://dummyjson.com/products'),
    ]);

    return (
      <div className="py-10">
        <Hero />
        <Categories />
        <CategoriedProducts
          categories={categoriesRes.data?.slice(0, 9)}
          // products={productsRes.data?.products}
          title={t('sales-xits')}
        />
      </div>
    );
  } catch (error: any) {
    return <div>Serverda xatolik: {error.message}</div>;
  }
};

export default Home;
