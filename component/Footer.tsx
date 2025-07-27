'use client';

import { Volume2, Mail, Phone, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black border-t border-gray-800">
      <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4 space-x-2">
              <Volume2 className="w-8 h-8 text-red-600" />
              <span className="text-xl font-bold text-white">
                <span className="text-red-600">RoR</span> Realm of Resonance
              </span>
            </div>
            <p className="max-w-md mb-4 text-gray-400">
              Professional music studio and jamming house designed for metal musicians. 
              Unleash your sound in our state-of-the-art facility.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 transition-colors duration-200 hover:text-red-600">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 transition-colors duration-200 hover:text-red-600">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 transition-colors duration-200 hover:text-red-600">
                <Twitter className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="mb-4 font-semibold text-white">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-red-600" />
                <span className="text-gray-400">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-red-600" />
                <span className="text-gray-400">info@realmofresonance.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-red-600" />
                <span className="text-gray-400">123 Metal Street<br />Rock City, RC 12345</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 font-semibold text-white">Quick Links</h3>
            <div className="space-y-3">
              <button
                onClick={() => document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' })}
                className="block text-gray-400 transition-colors duration-200 hover:text-white"
              >
                Home
              </button>
              <button
                onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
                className="block text-gray-400 transition-colors duration-200 hover:text-white"
              >
                About Us
              </button>
              <button
                onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}
                className="block text-gray-400 transition-colors duration-200 hover:text-white"
              >
                Booking
              </button>
              <a href="#" className="block text-gray-400 transition-colors duration-200 hover:text-white">
                FAQ
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 mt-8 text-center border-t border-gray-800">
          <p className="text-gray-400">
            © 2025 Realm of Resonance. All rights reserved.
            <span className="ml-1 text-gray-400">| Designed by MarakLab |</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;