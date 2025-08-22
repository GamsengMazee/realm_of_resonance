import Spinner from 'react-bootstrap/Spinner';

function Loading() {
  return (
     <div className="flex items-center mt-4">
      <div className="relative">
        <div className="w-12 h-12 border-4 border-blue-500 border-solid rounded-full border-t-transparent animate-spin"></div>
        <div className="absolute top-0 left-0 w-16 h-16 rounded-full opacity-25 animate-pulse"></div>
      </div>
    </div>
  );
}

export default Loading;