'use client';

import { Link, usePathname } from '@/i18n/navigation';
import PhoneIcon from '@/assets/icons/phone.svg';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';

const TopHeader = () => {
  const links = [
    {
      title: 'about',
      href: '/about-us',
    },
    {
      title: 'stores',
      href: '/stores',
    },
    {
      title: 'payment-and-delivery',
      href: '/payment-and-delivery',
    },
    {
      title: 'order-status',
      href: '/order-status',
    },
    {
      title: 'returned',
      href: '/returned',
    },
    {
      title: 'contacts',
      href: '/contacts',
    },
  ];

  const t = useTranslations('TopHeader');
  const locale = useLocale();
  const pathname = usePathname();
  return (
    <div className="container mx-auto px-4 flex lg:justify-end items-center py-4 gap-[40px] xl:gap-[74px]">
      <nav className="hidden lg:flex gap-5">
        {links.map((link) => (
          <Link key={link.href} href={link.href}>
            {t(link.title)}
          </Link>
        ))}
      </nav>
      <div className="flex gap-5 items-center">
        <div className="flex items-center gap-2 bg-background px-2 py-1 rounded-full">
          <div className="flex items-center gap-2 bg-gray-300 px-2 py-1 rounded-full">
            <Link
              className={cn(
                'px-2 py-1 rounded-full text-sm font-medium transition-colors duration-500 ease-in-out',
                locale === 'uz'
                  ? 'bg-white text-black shadow-md'
                  : 'text-gray-900 hover:bg-blue-600 hover:text-white',
              )}
              href={{ href: '/', pathname }}
              locale="uz"
            >
              uz
            </Link>
            <Link
              className={cn(
                'px-2 py-1 rounded-full text-sm font-medium transition-colors duration-500 ease-in-out',
                locale === 'ru'
                  ? 'bg-white shadow-md'
                  : 'text-gray-900 hover:bg-blue-600 hover:text-white',
              )}
              href={{ href: '/', pathname }}
              locale="ru"
            >
              ru
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Image src={PhoneIcon} width={18} height={17} alt="phone icon" />
          <span>+7 (812) 834-84-88</span>
        </div>
      </div>
    </div>
  );
};

export default TopHeader;
