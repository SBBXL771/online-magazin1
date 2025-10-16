'use client';

import { useCart } from '@/store/useCart';
import useOrder from '@/store/useOrder';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { ProductType } from '@/types';
import { Minus, Plus, Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useRouter } from '@/i18n/navigation';

interface CartProps {
  type?: 'cart' | 'favorites';
}

const Cart = ({ type = 'cart' }: CartProps) => {
  const {
    clearCart,
    removeProduct,
    products,
    decrementProduct,
    incrementProduct,
  } = useCart();

  const [orderData, setOrderData] = React.useState<ProductType[]>([]);
  const { setProducts } = useOrder();

  const router = useRouter();

  const getOrder = () => {
    setProducts(orderData);
    router.push('/order');
  };

  const handleOrder = (checked: boolean, product: ProductType) => {
    if (checked) {
      setOrderData([...orderData, product]);
    } else {
      const newData = orderData.filter(
        (item: ProductType) => item.id !== product.id,
      );
      setOrderData(newData);
    }
  };

  const pageTitle = type === 'favorites' ? 'Избранное' : 'Корзина';

  return (
    <div className="mt-8 px-4 md:px-0">
      <nav className="text-sm text-gray-500 mb-4">
        <Link href="/" className="hover:underline text-gray-700">
          Главная
        </Link>{' '}
        — <span className="text-gray-900 font-medium">{pageTitle}</span>
      </nav>

      <h1 className="text-2xl font-bold mb-6">{pageTitle}</h1>

      <ul>
        {products.map((product) => (
          <li
            key={product.id}
            className="flex flex-col md:flex-row md:items-center justify-between py-4 border-b last:border-b-0 gap-4 md:gap-2"
          >
            <Checkbox
              onCheckedChange={(checked: boolean) =>
                handleOrder(checked, product)
              }
            />

            <div className="flex items-center gap-14 flex-1">
              <Image
                src={product.images[0]}
                alt={product.title}
                width={100}
                height={100}
              />
              <h2 className="font-semibold text-lg">{product.title}</h2>
            </div>

            <div className="flex items-center gap-14">
              <div className="font-bold text-primary ">
                ${product.discountPercentage}
              </div>

              <div>
                <div className="flex items-center justify-between border rounded-md bg-background px-2 py-1">
                  <button
                    onClick={() => decrementProduct(product.id)}
                    className="cursor-pointer"
                  >
                    <Minus />
                  </button>
                  <span className="px-4 text-lg font-bold">
                    {product.count}
                  </span>
                  <button
                    onClick={() => incrementProduct(product.id)}
                    className="cursor-pointer"
                  >
                    <Plus />
                  </button>
                </div>
              </div>

              <div>
                <Button onClick={() => removeProduct(product.id)}>
                  <Trash2 />
                </Button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {products.length ? (
        <div className="mt-10 relative w-full max-w-3xl mx-auto h-[50px]">
          <div className="absolute left-[-240px] top-0">
            <Button
              onClick={clearCart}
              className="flex items-center justify-center w-[160px] h-[37px] ml-[0px]"
            >
              Clear All
            </Button>
          </div>

          <div className="absolute right-[-240px] top-0">
            <Button
              onClick={getOrder}
              disabled={!orderData.length}
              className="disabled:cursor-not-allowed disabled:opacity-50 flex items-center justify-center w-[178px] h-[37px] mr-[0px] bg-primary text-white rounded-md"
            >
              <span>Place an order</span>
            </Button>
          </div>
        </div>
      ) : (
        <div className="mt-[200px] flex flex-col items-center justify-center gap-3">
          <h2 className="text-md text-gray-600">{pageTitle} пуста</h2>
          <Link
            href={'/'}
            className="flex items-center justify-center w-[178px] h-[37px] bg-primary text-white rounded-md"
          >
            Перейти в каталог
          </Link>
        </div>
      )}
    </div>
  );
};

export default Cart;
