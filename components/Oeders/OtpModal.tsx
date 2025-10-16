'use client';
import React, { FC } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogOverlay,
} from '../ui/dialog';
import { REGEXP_ONLY_DIGITS } from 'input-otp';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { Button } from '../ui/button';

interface OtpModalProps {
  open: boolean;
  onClose: () => void;
}

const OtpModal: FC<OtpModalProps> = ({ open, onClose }) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogOverlay className="bg-white/95" />

      <DialogContent className="sm:max-w-[325px]">
        <DialogHeader>
          <DialogTitle>6 xonali sms parolni kiriting</DialogTitle>
        </DialogHeader>
        <div className="flex justify-center">
          <InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </div>
        <Button>Tasdiqlash</Button>
      </DialogContent>
    </Dialog>
  );
};

export default OtpModal;
