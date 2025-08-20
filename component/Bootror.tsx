"use client";
import React, { useState } from "react";
import Loader from "./Loader";
import Navigation from "./Navigation";

function Bootror({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [bootLoader, setBootLoader] = useState(true);

//fake loading effect while the app starts
  setTimeout(() => {
    setBootLoader(false);
  }, 3000);
  return (
    <>
      {bootLoader ? (
        <Loader title="" />
      ) : (
        <>
          <Navigation />
          <div className="pt-16">{children}</div>
        </>
      )}
    </>
  );
}

export default Bootror;
