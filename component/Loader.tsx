import React from 'react';

interface propsType {
  title: string;
}

const Loader = ({ title }: propsType) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-center bg-black bg-opacity-50 top-16">
      <div className="w-16 h-16 border-t-4 border-b-4 border-white rounded-full animate-spin"></div>
      <p className="ml-5 text-white">{title}</p>
    </div>
  );
};

export default Loader;
