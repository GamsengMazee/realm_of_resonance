"use client";

import Image from "next/image";
import React, { useEffect, useState, useMemo } from "react";

interface PropsType {
  title: string;
}

const Loader = ({ title }: PropsType) => {
  const [device, setDevice] = useState<"mobile" | "desktop">("mobile");
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);

    const handleResize = () => {
      const isMobile = window.innerWidth < 800;
      setDevice(isMobile ? "mobile" : "desktop");
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const imageSize = useMemo(() => (device === "mobile" ? 130 : 200), [device]);

  // Wait for the client to mount to avoid hydration issues
  if (!hasMounted) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      role="status"
      aria-live="polite"
    >
      <div className="relative flex items-center">
        <Image
          className="z-10 pointer-events-none animate-pulse"
          src="/images/ror_background3.png"
          width={imageSize}
          height={imageSize}
          alt="Loading"
          priority
        />
        <p className="z-10 ml-5 text-lg font-medium text-white">{title}</p>
      </div>
    </div>
  );
};

export default Loader;
