import type { Metadata } from "next";
import "./globals.css";
import Bootror from "../../component/Bootror";


export const metadata: Metadata = {
  title: "Realm of Resonance - Book Jamhouse in Tura, Meghalaya",
  description: "Come and Jam with us!",
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
