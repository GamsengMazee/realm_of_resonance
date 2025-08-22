'use client';

import { useState } from 'react';
import { Menu, X, Volume2 } from 'lucide-react';
import { Button } from './ui/button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';


const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter()

  const goto = (page: string) => {
    router.push(`${page}`)
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 right-0 z-50 w-full border-b border-gray-800 bg-black/90 backdrop-blur-md">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center pt-3 space-x-2 cursor-pointer">
           <Image onClick={() => goto('/')} src={"/images/ror.svg"} height={180} width={180} alt='logo'/> 
          </div>

          {/* Desktop Navigation */}
          <div className="items-center hidden space-x-8 md:flex">
            <Link
            href="/"
            className="font-medium text-gray-300 no-underline list-none transition-colors duration-200 md:mr-5 hover:text-white"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="font-medium text-gray-300 list-none transition-colors duration-200 hover:text-white"
            >
              About
            </Link>

            <Link
              href="/cancel"
              className="font-medium text-gray-300 list-none transition-colors duration-200 hover:text-white"
            >
              Cancel Booking
            </Link>
          
            <Button 
              onClick={() => goto('/booking')}
              className="transition-transform duration-200 rounded fire-gradient hover:scale-105"
            >
              Book Now
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 transition-colors duration-200 hover:text-white"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="border-t border-gray-800 md:hidden bg-black/95 backdrop-blur-md">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <button
                onClick={() => goto('/')}
                className="block w-full px-3 py-2 text-left text-gray-300 transition-colors duration-200 hover:text-white"
              >
                Home
              </button>
              <button
                onClick={() => goto('/about')}
                className="block w-full px-3 py-2 text-left text-gray-300 transition-colors duration-200 hover:text-white"
              >
                About
              </button>

              <button
                onClick={() => goto('/cancel')}
                className="block w-full px-3 py-2 text-left text-gray-300 transition-colors duration-200 hover:text-white"
              >
                Cancel Booking
              </button>
              <Button 
                onClick={() => goto('/booking')}
                className="w-full mt-2 rounded fire-gradient"
              >
                Book Now
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;