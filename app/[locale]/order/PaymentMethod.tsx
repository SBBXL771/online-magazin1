import OtpModal from '@/components/Oeders/OtpModal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useState } from 'react';

const PaymentMethod = () => {
  const [paymentMethod, setPaymentMethod] = useState('payme');
  const [cardNumber, setCardNumber] = useState('');
  const [openOtp, setOpenOtp] = useState(false);
  const [expiryDate, setExpiryDate] = useState('');

  const paymentLinks: Record<string, string> = {
    payme: 'https://payme.uz',
    click: 'https://click.uz',
    uzum: 'https://uzum.uz',
    xazna: 'https://xazna.uz',
    upay: 'https://upay.uz',
  };

  const isCardValid = /^\d{16}$/.test(cardNumber.replace(/\s/g, ''));
  const isExpiryValid = (() => {
    if (!/^\d{2}\/\d{2}$/.test(expiryDate)) return false;
    const [month] = expiryDate.split('/').map(Number);
    return month >= 1 && month <= 12;
  })();

  const formatCard = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 16);
    const parts = digits.match(/.{1,4}/g);
    return parts ? parts.join(' ') : '';
  };

  const formatExpiry = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 4);
    if (digits.length <= 2) return digits;
    return digits.slice(0, 2) + '/' + digits.slice(2);
  };

  const handleRedirect = () => {
    if (paymentLinks[paymentMethod]) {
      window.location.href = paymentLinks[paymentMethod];
    }
  };

  return (
    <div>
      <RadioGroup
        className="mt-4 flex gap-2 items-center"
        onValueChange={(value) => {
          setPaymentMethod(value);
          setCardNumber('');
          setExpiryDate('');
        }}
        defaultValue="payme"
      >
        <div className="flex gap-2 items-center rounded-md border border-e-gray-200 p-2">
          <RadioGroupItem value="payme" id="payme" />
          <Label htmlFor="payme">Payme</Label>
        </div>
        <div className="flex gap-2 items-center rounded-md border border-e-gray-200 p-2">
          <RadioGroupItem value="upay" id="upay" />
          <Label htmlFor="upay">Upay</Label>
        </div>

        <div className="flex gap-2 items-center rounded-md border border-e-gray-200 p-2">
          <RadioGroupItem value="click" id="click" />
          <Label htmlFor="click">Click</Label>
        </div>
        <div className="flex gap-2 items-center rounded-md border border-e-gray-200 p-2">
          <RadioGroupItem value="xazna" id="xazna" />
          <Label htmlFor="xazna">Xazna</Label>
        </div>

        <div className="flex gap-2 items-center rounded-md border border-e-gray-200 p-2">
          <RadioGroupItem value="uzum" id="uzum" />
          <Label htmlFor="uzum">Uzum</Label>
        </div>

        <div className="flex gap-2 items-center rounded-md border border-e-gray-200 p-2">
          <RadioGroupItem value="card" id="card" />
          <Label htmlFor="card">Card</Label>
        </div>
      </RadioGroup>

      {paymentMethod !== 'card' && (
        <Button className="mt-4" onClick={handleRedirect}>
          {paymentMethod} ga o'tish
        </Button>
      )}

      {paymentMethod === 'card' && (
        <div className="flex flex-col gap-3 mt-4">
          <Input
            placeholder="Karta raqamini kiriting"
            value={cardNumber}
            onChange={(e) => setCardNumber(formatCard(e.target.value))}
            className="max-w-[360px]"
          />

          <Input
            placeholder="MM/YY"
            value={expiryDate}
            onChange={(e) => setExpiryDate(formatExpiry(e.target.value))}
            className="max-w-[120px]"
          />

          <div className="flex">
            <Button
              onClick={() => setOpenOtp(true)}
              disabled={!isCardValid || !isExpiryValid}
            >
              Tolovni tasdiqlash
            </Button>
          </div>
        </div>
      )}

      <OtpModal open={openOtp} onClose={() => setOpenOtp(false)} />
    </div>
  );
};

export default PaymentMethod;
