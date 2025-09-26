import type { Metadata } from "next";
import "./globals.css";
import Bootror from "../../component/Bootror";


export const metadata: Metadata = {
  title: "Realm of Resonance - Premium Soundproof Space for Musicians",
  description: "Discover The Jamroom in Tura, Meghalaya – a soundproof room with high-quality amps, top-tier sound equipment, and air-conditioning, offering musicians a comfortable, professional space to rehearse, record, and create. Book Now and start rocking!",
  icons: {
    icon: '/images/favicon.ico'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <meta
        name="keywords"
        content="Jamroom, Tura, Meghalaya, soundproof room, music rehearsal, recording studio, professional space, music equipment"
      />
      <link rel="canonical" href="https://www.realmofr.in" />
       <meta httpEquiv="Pragma" content="no-cache" />
      <meta name="robots" content="index, follow" />
      <meta name="google" content="notranslate" />
      <meta property="og:url" content="https://realmofr.in" />
      <meta property="og:type" content="website" />
      <meta
        property="og:title"
        content="Realm of Resonance - Premium Soundproof Space for Musicians"
      />
      <meta
        property="og:description"
        content="The Jamroom in Tura, Meghalaya offers a soundproof, air-conditioned space with top-tier sound equipment for musicians to rehearse, record, and create. Book Now and start rocking!"
      />
      <meta
        property="og:image"
        content="https://realmofr.in/images/ror.svg"
      />
       <meta property="fb:app_id" content="1163317788977079" />
      <meta name="twitter:card" content="summary" />
      <meta
        name="twitter:title"
        content="The Jamroom - Premium Soundproof Space for Musicians"
      />
      <meta
        name="twitter:description"
        content="The Jamroom in Tura, Meghalaya offers a soundproof room with high-quality amps and professional sound equipment for musicians. Book Now and start rocking!"
      />
      <meta
        name="twitter:image"
        content="https://realmofr.in/images/ror.svg"
      />
      <body
        className={`antialiased`}
      >
        <div className="min-h-screen bg-black">
          <Bootror children={children}/>   
        </div>
      </body>
    </html>
  );
}
