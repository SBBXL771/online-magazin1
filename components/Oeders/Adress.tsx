import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Input } from '../ui/input';

const regions = [
  'Navoiy viloyati',
  'Buxoro viloyati',
  'Fargona viloyati',
  'Jizzax viloyati',
  'Andijon viloyati',
  'Toshkent viloyati',
  'Namangan viloyati',
  'Samarqand viloyati',
  'Xorazm viloyati',
  'Qoraqalpogiston Respublikasi viloyati',
  'Sirdaryo viloyati',
  'Surxondaryo viloyati',
  'Qashqadaryo viloyati',
];

const Address = () => {
  return (
    <form className="grid grid-cols-3 gap-4">
      <Select>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Viloyatni tanlang" />
        </SelectTrigger>
        <SelectContent>
          {regions.map((region, index) => (
            <SelectItem key={index} value={region}>
              {region}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Input placeholder="Manzil" />
      <Input placeholder="Kocha" />
      <Input placeholder="Uy" />
      <Input placeholder="Qoshimcha telefon raqami" />
      <Input placeholder="Kamentariya" />
    </form>
  );
};

export default Address;
