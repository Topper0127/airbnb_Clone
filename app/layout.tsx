import './globals.css';
import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import Favicon from "@/public/favicon.png";
import Navbar from './components/navbar/Navbar';

import RegisterModal from './components/modals/RegisterModal';
import LoginModal from './components/modals/LoginModal';
import RentModal from './components/modals/RentModal';

import ToasterProvider from './providers/ToasterProvider';
import getCurrentUser from './actions/getCurrentUser';
import SearchModal from './components/modals/SearchModal';

const font = Nunito({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Holiday Homes & Apartment Rentals - Airbnb',
  description: 'Find the perfect place to stay at an amazing price in 191 countries. Belong anywhere with Airbnb.',
  icons: [{ rel: 'icon', url: Favicon.src }],
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider />
        <RegisterModal />
        <LoginModal />
        <RentModal />
        <SearchModal />
        <Navbar currentUser={currentUser} />
        <div className='pb-20 pt-28'>
          {children}
        </div>
      </body>
    </html>
  )
}
