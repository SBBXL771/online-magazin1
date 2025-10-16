'use client';

import { CatalogData } from '@/data';
import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const CatalogModal = () => {
  const [filteredCatalog, setFilteredCatalog] = useState(
    CatalogData[0].subCatalog,
  );
  const [activeCatalog, setActiveCatalog] = useState(CatalogData[0].id);

  const handleFilterCatalog = (catalog: any) => {
    setActiveCatalog(catalog.id);
    console.log(catalog);
    setFilteredCatalog(catalog.subCatalog);
  };

  return (
    <div className="mt-8 flex gap-12 absolute z-50 bg-white pt-8 w-[1263px] left-[-10px] top-4">
      <div className="flex flex-col max-w-[393px] gap-4">
        {CatalogData.map((catalog) => (
          <button
            key={catalog.id}
            onMouseEnter={() => handleFilterCatalog(catalog)}
            className={cn(
              'text-start px-5 py-3 rounded-md flex justify-between items-center cursor-pointer',
              catalog.id === activeCatalog
                ? 'bg-white text-primary shadow-xl'
                : 'bg-background',
            )}
          >
            {catalog.catalogName}
            <ArrowRight />
          </button>
        ))}
      </div>

      {/* right side */}
      <div className="flex flex-col gap-1">
        {/* <div className="flex gap-7">
          <div className="flex justify-center w-[113px] h-[66px] items-center border border-gray-200 rounded-md bg-white">
            <Image src="/brands/brand1.png" alt="" width={50} height={50} />
          </div>
          <div className="flex justify-center w-[113px] h-[66px] items-center border border-gray-200 rounded-md bg-white">
            <Image src="//brand2.png" alt="" width={50} height={50} />
          </div>
          <div className="flex justify-center w-[113px] h-[66px] items-center border border-gray-200 rounded-md bg-white">
            <Image src="/assets/images/samsung.png" alt="" width={50} height={50} />
          </div>
          <div className="flex justify-center w-[113px] h-[66px] items-center border border-gray-200 rounded-md bg-white">
            <Image src="/assets/images/mi.png" alt="" width={50} height={50} />
          </div>
        </div> */}

        <div className="flex flex-wrap gap-8 mt-4">
          {filteredCatalog.map((catalog) => (
            <div key={catalog.id}>
              <Link
                className="font-bold mb-4 inline-block"
                href={`/catalog/${catalog.id}`}
              >
                {catalog.name}
              </Link>
              <div className="flex flex-col gap-6">
                {catalog.category.map((category) => (
                  <Link key={category.id} href={`/category/${category.id}`}>
                    {category.title}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CatalogModal;
