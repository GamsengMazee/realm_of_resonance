'use client';

import { Mail, Phone, MapPin, Facebook, Instagram } from 'lucide-react';
import { FaWhatsapp } from "react-icons/fa";
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const Footer = () => {
  const router = useRouter()
  
    const goto = (page: string) => {
      router.push(`${page}`)
    };
  return (
    <footer className="relative z-20 bg-black border-t border-gray-800">
      <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4 space-x-2">
              <Image onClick={() => goto('/')} src={"/images/ror.svg"} height={100} width={200} alt='logo'/> 
            </div>
            <p className="max-w-md mb-4 text-gray-400">
              Professional music studio and jamming house designed for musicians. 
              Unleash your sound in our state-of-the-art facility.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/share/1FHbY163n5/?mibextid=wwXIfr" target="_blank" className="text-white transition-colors duration-200 hover:text-red-600">
                <Facebook className="w-6 h-6 rounded hover:bg-blue-500" />
              </a>
              <a href="#" className="text-white transition-colors duration-200 hover:text-red-600">
                <Instagram className="w-6 h-6 rounded hover:bg-amber-700" />
              </a>
               <a href={`https://wa.me/918414973091`} className="text-white transition-colors duration-200 hover:text-red-600">
                <FaWhatsapp size={25} className='rounded hover:bg-green-500'/>
              </a>
             
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="mb-4 font-semibold text-white">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-red-600" />
                <span className="text-gray-400">+91 8414973091</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-red-600" />
                <span className="text-gray-400">realmofr@gmail.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-red-600" />
                <span className="text-gray-400">Teteng A⋅ja<br />Sunset Square</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 font-semibold text-white">Quick Links</h3>
            <div className="space-y-3">
              <button
                onClick={() => goto('/')}
                className="block text-gray-400 transition-colors duration-200 hover:text-white"
              >
                Home
              </button>
              <button
                onClick={() => goto("/about")}
                className="block text-gray-400 transition-colors duration-200 hover:text-white"
              >
                About Us
              </button>
              <button
                onClick={() => goto('/booking')}
                className="block text-gray-400 transition-colors duration-200 hover:text-white"
              >
                Booking
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 mt-8 text-center border-t border-gray-800">
          <p className="text-gray-400">
            © 2025 Realm of Resonance. All rights reserved.
            <span className="ml-1 text-gray-400">| <a className='hover:text-white' href='https://www.facebook.com/share/1Aa4Y2V7Mw/'>Designed by MarakLab </a>|</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;