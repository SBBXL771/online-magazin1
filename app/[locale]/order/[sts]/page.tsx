import React, { FC } from 'react';
import { CheckCircle2, XCircle, LoaderIcon } from 'lucide-react';

interface OrderStatusProps {
  params: {
    status: string;
  };
}

const OrderStatus: FC<OrderStatusProps> = ({ params }) => {
  const { status } = params;

  const renderStatus = () => {
    switch (status) {
      case 'success':
        return (
          <div className="flex flex-col items-center justify-center gap-4 bg-gradient-to-r from-green-100 to-emerald-50 p-8 rounded-3xl shadow-xl">
            <CheckCircle2 className="w-20 h-20 text-emerald-600" />
            <h2 className="text-3xl font-extrabold text-emerald-700">
              Buyurtmangiz muvaffaqiyatli!
            </h2>
            <p className="text-lg text-gray-700 text-center">
              Biz tez orada siz bilan aloqaga chiqamiz
            </p>
          </div>
        );
      case 'reject':
        return (
          <div className="flex flex-col items-center justify-center gap-4 bg-gradient-to-r from-rose-100 to-red-50 p-8 rounded-3xl shadow-xl">
            <XCircle className="w-20 h-20 text-rose-600" />
            <h2 className="text-3xl font-extrabold text-rose-700">
              Afsuski, buyurtma bekor qilindi
            </h2>
            <p className="text-lg text-gray-700 text-center">
              Iltimos, keyinroq qayta urinib koring
            </p>
          </div>
        );
      default:
        return (
          <div className="flex flex-col items-center justify-center gap-4 bg-gradient-to-r from-amber-100 to-yellow-50 p-8 rounded-3xl shadow-xl">
            <LoaderIcon className="w-20 h-20 text-blue-600" />
            <h2 className="text-3xl font-extrabold text-blue-700">
              Buyurtmangiz muvaffaqiyatli qabul qilinmoqda
            </h2>
            <p className="text-lg text-emerald-700 text-center">
              Jarayon davom etmoqda, iltimos biroz sabr qiling
            </p>
          </div>
        );
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-50">
      {renderStatus()}
    </div>
  );
};

export default OrderStatus;
