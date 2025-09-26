'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Guitar, Drum, Mic, Headphones, Clock, Shield } from 'lucide-react';

const About = () => {
  const features = [
    {
      icon: <Guitar className="w-8 h-8 text-red-600" />,
      title: "Guitar Amplifiers",
      description: "Boss Katana 100 Gen3 and Hartke Hd50 for that perfect tone"
    },
    {
      icon: <Drum className="w-8 h-8 text-orange-600" />,
      title: "Drum Kits",
      description: "Professional acoustic drum kits with high-quality cymbals and hardware"
    },
    {
      icon: <Mic className="w-8 h-8 text-red-600" />,
      title: "Microphones",
      description: "Shure SM57/58 and Sennheiser microphones for vocals and instruments"
    },
    {
      icon: <Headphones className="w-8 h-8 text-orange-600" />,
      title: "Monitoring",
      description: "Professional studio monitors with Yamaha dbr12 for clear sound"
    },
    {
      icon: <Clock className="w-8 h-8 text-red-600" />,
      title: "8:00 am - 10:00 pm",
      description: "Flexible booking hours to accommodate your band's schedule"
    },
    {
      icon: <Shield className="w-8 h-8 text-orange-600" />,
      title: "Secure Facility",
      description: "Safe and secure environment for your equipment and peace of mind"
    }
  ];

  return (
    <section id="about" className="py-16 select-none bg-gradient-to-br from-gray-900 to-black">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="mb-6 text-4xl font-bold md:text-5xl">
            <span className="text-white">About </span>
          </h2>
          <p className="max-w-4xl mx-auto text-left text-gray-300 text-xl/relaxed">
            <span className='md:ml-10'>Realm</span> of Resonance is a dedicated space for musicians and artists located at Sunset Square, Te⋅teng A⋅ja, Tura, Meghalaya. 
            Designed with creativity and comfort in mind, our fully soundproof Jamroom offers a professional environment equipped with high-quality amps, sound systems, and air-conditioning — perfect for rehearsals, recordings, or jam sessions. 
          </p>
          <p className="max-w-4xl mx-auto mt-1 text-left text-gray-300 text-xl/relaxed">
            <span className='md:ml-10'>Whether</span> you're a solo artist or part of a band, Realm of Resonance provides the ideal atmosphere to explore your sound and elevate your craft. 
            With easy online booking and a commitment to supporting local talent, 
            we aim to be the heartbeat of Tura’s growing music scene.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 mb-16 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <Card key={index} className="transition-transform duration-300 border-gray-800 bg-black/50 card-glow hover:scale-105">
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-gray-800 rounded-lg">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-white">{feature.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base text-gray-400">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-2">
          <div>
            <h3 className="mb-6 text-3xl font-bold text-white">
              Why Choose <span className="text-red-600">RoR</span>?
            </h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 mt-2 bg-red-600 rounded-full"></div>
                <p className="text-gray-300">
                  <strong className="text-white">Professional Sound:</strong> Acoustically treated rooms 
                  designed for metal music with proper sound isolation.
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 mt-2 bg-orange-600 rounded-full"></div>
                <p className="text-gray-300">
                  <strong className="text-white">Quality Equipment:</strong> Top-tier amplifiers, 
                  drums, and professional studio monitors maintained to perfection.
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 mt-2 bg-red-600 rounded-full"></div>
                <p className="text-gray-300">
                  <strong className="text-white">Flexible Booking:</strong> Hourly, daily, or 
                  weekly rates with extended hours for serious musicians.
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 mt-2 bg-orange-600 rounded-full"></div>
                <p className="text-gray-300">
                  <strong className="text-white">Community:</strong> Connect with other metal 
                  musicians and bands in our vibrant creative community.
                </p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="flex items-center justify-center border border-gray-800 rounded-lg aspect-square bg-gradient-to-br from-red-900/20 to-orange-900/20">
              <div className="text-center">
                <div className="flex items-center justify-center w-24 h-24 mx-auto mb-4 rounded-full bg-red-600/20">
                  <Guitar className="w-12 h-12 text-red-600" />
                </div>
                <h4 className="mb-2 text-2xl font-bold text-white">Studio Rooms</h4>
                <p className="text-gray-400">
                  Professionally equipped rooms available for booking
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;