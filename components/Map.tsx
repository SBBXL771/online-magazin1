'use client';

import React, { FC, useEffect, useRef, useState } from 'react';
import {
  YMaps,
  Map,
  Placemark,
  SearchControl,
  GeolocationControl,
} from '@pbe/react-yandex-maps';

interface StoreType {
  name: string;
  address: string;
  coords: number[];
}

interface MapType {
  stores: StoreType[];
  selected?: string;
}

interface ContentProps {
  open: boolean;
  name: string;
  address: string;
}

const ContentModal: FC<ContentProps> = ({ open, address, name }) => {
  return open ? (
    <div className="absolute top-0 right-0 z-30 w-[230px] h-[120px] bg-white  p-5 shadow-xl">
      <h2 className="text-lg font-semibold">{name}</h2>
      <p className="text-sm text-gray-600">{address}</p>
    </div>
  ) : null;
};

const YandexMap: FC<MapType> = ({ stores, selected }) => {
  const mapRef = useRef<any>(null);

  const [selectedStore, setSelectedStore] = useState<StoreType>(
    stores.find((s) => s.name === selected) || stores[0],
  );

  useEffect(() => {
    if (mapRef.current && selectedStore) {
      mapRef.current.setCenter(selectedStore.coords, 13, {
        duration: 300,
      });
    }
  }, [selectedStore]);

  return (
    <YMaps>
      <div className="relative">
        <Map
          width="100%"
          height="500px"
          defaultState={{
            center: stores[0].coords,
            zoom: 11,
          }}
          instanceRef={mapRef}
        >
          {stores.map((store, idx) => (
            <Placemark
              key={idx}
              geometry={store.coords}
              onClick={() => setSelectedStore(store)}
              options={{
                preset: 'location#circleIcon',
              }}
            />
          ))}
          <GeolocationControl options={{ float: 'left' }} />
        </Map>

        <ContentModal
          open={!!selectedStore}
          name={selectedStore.name}
          address={selectedStore.address}
        />
      </div>
    </YMaps>
  );
};

export default YandexMap;
