'use client';

import React, { useState } from 'react';
import {
  HeartIcon,
  MenuIcon,
  ShoppingCart,
  UserRoundIcon,
  X,
} from 'lucide-react';
import { Link } from '@/i18n/navigation';
import CatalogModal from './CatalogModal';
import SearchModal from '../SearchModal';
import { useCart } from '@/store/useCart';
import { ProductType } from '@/types';

const Header = () => {
  const [openCatalog, setOpenCatalog] = useState(false);

  const { products } = useCart();

  const totalCount = products.reduce(
    (acc: number, item: ProductType & { count: number }) =>
      acc + (item.count || 0),
    0,
  );

  const actions = [
    {
      title: 'Избранное',
      href: '/favorites',
      icon: HeartIcon,
    },
  ];

  return (
    <div className="relative">
      <div className="flex justify-end gap-6 mt-3">
        <Link href="/" className="text-xl translate-y-1">
          Main Page
        </Link>

        <button
          onClick={() => setOpenCatalog(!openCatalog)}
          className="h-11 cursor-pointer bg-primary px-5 py-3.5 rounded-md flex items-center gap-2 text-lg font-semibold text-white md:min-w-[144px]"
        >
          {openCatalog ? (
            <>
              <X size={20} />
              <span className="hidden md:inline-block text-white">Каталог</span>
            </>
          ) : (
            <>
              <MenuIcon size={20} />
              <span className="hidden md:inline-block text-white">Каталог</span>
            </>
          )}
        </button>

        <div className="w-full max-w-[642px] bg-gray-200 rounded-md h-11">
          <SearchModal />
        </div>

        <div className="hidden md:flex items-center gap-4 ml-5">
          {actions.map((action) => (
            <Link
              href={action.href}
              key={action.href}
              className="flex flex-col items-center"
            >
              <action.icon size={25} />
              <span>{action.title}</span>
            </Link>
          ))}

          <Link href="/cart" className="relative flex flex-col items-center">
            <ShoppingCart size={25} />
            <span>Корзина</span>
            {totalCount > 0 && (
              <span className="absolute -top-2 -right-[-5px] bg-red-500 text-white text-xs rounded-full w-[17px] h-[18px] flex items-center justify-center">
                {totalCount}
              </span>
            )}
          </Link>

          <button className="flex flex-col items-center">
            <UserRoundIcon size={25} />
            <span>Войти</span>
          </button>
        </div>
      </div>
      {openCatalog && <CatalogModal />}
    </div>
  );
};

export default Header;
