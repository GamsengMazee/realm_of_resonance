"use client";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { Music, Zap, Users } from "lucide-react";
import Image from "next/image";

const Home = () => {
  const router = useRouter();

  return (
    <section
      id="home"
      className="relative z-10 flex items-center justify-center min-h-screen overflow-hidden md:pt-0 bg-gradient-to-br from-gray-900 to-black "
    >
      {/* Background */}
      <div className="fixed z-0 transition-all duration-500 ease-in-out -translate-x-1/2 -translate-y-1/2 bg-fixed bg-center bg-cover brightness-50 h-1/2 left-1/2 top-1/2">
        <Image
          className="z-0 pointer-events-none"
          src="/images/ror_background2.svg"
          width={400}
          height={400}
          alt="background"
        />
      </div>

      {/*  
   <Image height={400} width={400} alt='image' src='/image/bg.png' className='z-10' />
   */}

      <div className="relative z-10 max-w-4xl px-4 mx-auto mt-3 text-center md:mt-0">
        <p className="text-[22px] font-bold md:text-4xl text-gradient">Welcome to <span className="p-2 rounded text-amber-300">Realm of Resonance</span></p> 
        <p className="max-w-2xl mx-auto mb-8 text-xl text-white rounded md:text-2xl">
          <span> Soundproof room, fully-equipped jam space at Sunset Square, Te⋅teng A⋅ja, Tura. 
          Book your slots online and create, rehearse, or record in a professional, comfortable environment.</span> 
        </p>

        <div className="flex flex-col justify-center gap-4 mb-12 sm:flex-row">
          <Button
            size="lg"
            onClick={() => router.push("/booking")}
            className="px-8 py-4 text-lg transition-transform duration-200 rounded fire-gradient hover:scale-105"
          >
            Book Your Session
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => router.push("/about")}
            className="px-8 py-4 text-lg text-red-600 transition-colors duration-200 border-red-600 rounded hover:bg-red-600 hover:text-white"
          >
            Learn More
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-8 mt-20 md:grid-cols-3">
          <div className="text-center">
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-red-600/20">
              <Music className="w-8 h-8 text-red-600" />
            </div>
            <h3 className="mb-2 text-xl font-semibold text-white">
              Professional Equipment
            </h3>
            <p className="text-gray-400">
              High-end amplifiers, drums, and recording gear
            </p>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-orange-600/20">
              <Zap className="w-8 h-8 text-red-600" />
            </div>
            <h3 className="mb-2 text-xl font-semibold text-white">
              Perfect Acoustics
            </h3>
            <p className="text-gray-400">
              Soundproofed rooms designed for loud music.
            </p>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-red-600/20">
              <Users className="w-8 h-8 text-red-600" />
            </div>
            <h3 className="mb-2 text-xl font-semibold text-white">
              Band Friendly
            </h3>
            <p className="text-gray-400">
              Spacious rooms for full band practice sessions
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
