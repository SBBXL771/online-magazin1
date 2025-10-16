import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Label } from '../ui/label';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import YandexMap from '../Map';
import { Link } from '@/i18n/navigation';

const shops = [
  {
    name: 'Next Mall',
    address: 'Amir Temur shoh ko‘chasi 98, Toshkent',
    coords: [41.3223, 69.2797],
  },
  {
    name: 'Mediapark Mega Planet',
    address: 'Amir Temur shoh ko‘chasi 13, Toshkent',
    coords: [41.3385, 69.3345],
  },
  {
    name: 'Samarqand Darvoza',
    address: 'Beruniy ko‘chasi 2, Toshkent',
    coords: [41.3277, 69.2282],
  },
  {
    name: 'Compass Mall',
    address: 'Yunusobod 19-mavze, Toshkent',
    coords: [41.3666, 69.2864],
  },
  {
    name: 'Mega Planet',
    address: 'Buyuk Ipak Yo‘li ko‘chasi 17, Toshkent',
    coords: [41.341, 69.3342],
  },
  {
    name: 'Malika Bozori',
    address: 'Chilonzor 15, Toshkent',
    coords: [41.2645, 69.2108],
  },
  {
    name: 'Parkent Bozori',
    address: 'Mirzo Ulug‘bek tumani, Toshkent',
    coords: [41.3358, 69.3675],
  },
  {
    name: 'Oloy Bozori',
    address: 'Shayxontohur tumani, Toshkent',
    coords: [41.3166, 69.2802],
  },
  {
    name: 'NEXT Hypermarket Sergeli',
    address: 'Sergeli 5-mavze, Toshkent',
    coords: [41.2166, 69.2055],
  },
  {
    name: 'Mega Silk Way Market',
    address: 'Qorasu 4, Toshkent',
    coords: [41.299, 69.315],
  },
];

const Selfpickup = () => {
  const [selected, setSelected] = React.useState(shops[0].name);
  return (
    <div>
      <Tabs defaultValue="list">
        <div className="flex justify-end">
          <TabsList className="w-[200px]">
            <TabsTrigger
              value="list"
              className="data-[state=active]:bg-primary data-[state=active]:text-white"
            >
              List
            </TabsTrigger>
            <TabsTrigger
              value="map"
              className="data-[state=active]:bg-primary data-[state=active]:text-white"
            >
              Map
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="list">
          <RadioGroup
            onValueChange={(value) => setSelected(value)}
            defaultValue={shops[0].name}
            className="flex flex-col gap-2"
          >
            {shops.map((shop) => (
              <div key={shop.coords[0]} className=" flex items-center py-2">
                <RadioGroupItem
                  className="opacity-0"
                  value={shop.name}
                  id={shop.name}
                ></RadioGroupItem>
                <Label
                  className={cn(
                    'w-full flex items-start px-4 flex-col border border-gray-300 py-2 text-md rounded-md',
                    selected === shop.name && 'text-primary border-primary',
                  )}
                  htmlFor={shop.name}
                >
                  <p>{shop.name}</p>
                  <p>{shop.address}</p>
                </Label>
              </div>
            ))}
          </RadioGroup>
        </TabsContent>
        <TabsContent value="map">
          <YandexMap stores={shops} />
        </TabsContent>
      </Tabs>
      <Link href={'/order/success'} className="flex justify-center">
        <Button className="mt-6 mb-4 w-full max-w-[910px] h-[43px] text-lg">
          Buyurtma berish
        </Button>
      </Link>
    </div>
  );
};
export default Selfpickup;