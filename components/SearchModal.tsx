'use client';

import { useDebaunce } from "@/hooks/useDebaunce";
import { Link } from "@/i18n/navigation";
import { ProductType } from "@/types";
import axios from "axios";
import { SearchIcon } from "lucide-react";
import React, { useEffect } from "react";

const SearchModal = () => {
  const [open, setOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [data, setData] = React.useState<ProductType[]>([]);
  const [warning, setWarning] = React.useState("");

  const debounce = useDebaunce(value);

  const handleChange = async () => {
    try {
      if (debounce.trim().length) {
        setIsLoading(true);
        const res = await axios.get(
          `https://dummyjson.com/products/search?q=${debounce}`
        );
        if (res.data.products.length > 0) {
          setData(res.data.products);
          setWarning("");
        } else {
          setData([]);
          setWarning("Maxsulot topilmadi!");
        }
      } else {
        setData([]);
        setWarning("");
      }
    } catch (error) {
      console.error(error);
      setWarning("Xatolik yuz berdi!");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleChange();
  }, [debounce]);

  const handleLinkClick = () => {
    setOpen(false);
    setValue("");
  };

  return (
    <div className="max-w-[642px] w-full relative">
      {/* input */}
      <div className="flex items-center px-4 h-[46px] bg-background rounded-md w-full">
        <input
          onFocus={() => setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 300)}
          onChange={(e) => setValue(e.target.value)}
          value={value}
          type="text"
          className="w-full grow outline-none border-none"
          placeholder="Поиск товара"
        />
        <SearchIcon />
      </div>

      {/* dropdown */}
      {open && value.length > 0 && (
        <div className="max-h-[400px] overflow-auto absolute top-11 z-50 bg-white w-full border border-gray-200 rounded-b-md p-4 border-t-0">
          {isLoading && (
            <div className="flex items-center gap-4 mb-4 bg-gray-200 animate-pulse rounded-md p-2">
              <h1 className="text-md font-semibold">Yuklanmoqda...</h1>
            </div>
          )}

          {!isLoading &&
            data.length > 0 &&
            data.map((item) => (
              <Link
                onClick={handleLinkClick}
                href={`/product/${item.id}`}
                key={item.id}
                className="flex items-center gap-4 mb-4 border-b border-b-gray-200 pb-2"
              >
                {item.images && item.images.length > 0 && (
                  <img
                    src={item.images[0]}
                    alt={item.title}
                    className="w-12 h-12 object-cover rounded-md"
                  />
                )}
                <h1 className="text-md font-semibold">{item.title}</h1>
              </Link>
            ))}

          {!isLoading && warning && (
            <h1 className="text-md font-semibold text-center">{warning}</h1>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchModal;
