'use client';

import Address from '@/components/Oeders/Adress';
import Selfpickup from '@/components/Oeders/SelfPickup';
import useOrder from '@/store/useOrder';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Image from 'next/image';
import React from 'react';
import PaymentMethod from './PaymentMethod';

const Order = () => {
  const { products } = useOrder();
  const [activeTab, setActiveTab] = React.useState('address');

  return (
    <div className="mt-9">
      <div className="flex gap-5">
        <div className="grow">
          <div>
            <Tabs
              onValueChange={(value) => setActiveTab(value)}
              defaultValue="address"
              className="w-full"
            >
              <TabsList className="w-full mb-4">
                <TabsTrigger
                  value="address"
                  className="data-[state=active]:bg-primary data-[state=active]:text-white"
                >
                  Address
                </TabsTrigger>
                <TabsTrigger
                  value="pickup"
                  className="data-[state=active]:bg-primary data-[state=active]:text-white"
                >
                  Pick up
                </TabsTrigger>
                <TabsTrigger
                  value="delivery"
                  className="data-[state=active]:bg-primary data-[state=active]:text-white"
                >
                  Yandex delivery
                </TabsTrigger>
              </TabsList>

              <TabsContent value="address">
                <Address />
              </TabsContent>
              <TabsContent value="pickup">
                <Selfpickup />
              </TabsContent>
              <TabsContent value="delivery">
                <Address />
              </TabsContent>
            </Tabs>

            {activeTab !== 'pickup' && <PaymentMethod />}
          </div>
        </div>
        <div className="max-w-[300px] border border-gray-200 w-full p-4 rounded-md ">
          <ul>
            {products.map((product) => (
              <li
                key={product.id}
                className="flex items-center not-last:border-b  not-last:border-gray-300"
              >
                <Image
                  src={product.images[0]}
                  alt="product"
                  width={100}
                  height={100}
                />
                <div>
                  <h2>{product.title}</h2>
                  <p>{product.price}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Order;
