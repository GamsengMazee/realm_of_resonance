'use client'

import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

interface FormData {
  name: string;
  password: string;
}

interface PropsType{
  login: () => void;

}

export default function LoginCard({login}:PropsType) {
  // Initialize state for form data and password visibility
  const [formData, setFormData] = useState<FormData>({
    name: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showInvalid, setShowInvalid] = useState(false)

  // Handle input change for each field
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          password: formData.password,
        }),
      });

      if (!res.ok) {
          setShowInvalid(true)
          const errorData = await res.json();
          console.log(errorData)
          throw new Error(errorData?.message || "Unauthorize Access Forbidden");
        }
        
       const data = await res.json();
        login()     //change the login state to true in admin page
       console.log(data)
    } catch (error) {
      setShowInvalid(true)
      console.log(error)
    }
  };

  return (
    <div className="mt-[-90px] flex items-center justify-center min-h-screen bg-black">
      <div className="w-full max-w-sm p-8 border shadow-2xl backdrop-blur-lg bg-white/40 border-white/80 rounded-2xl">
        <h2 className="mb-6 text-2xl font-bold text-center text-white">Login</h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username" className="block mb-1 text-sm text-white">
              Username
            </label>
            <input
              id="username"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter your username"
              className="w-full px-4 py-2 text-black placeholder-gray-600 border rounded-md bg-white/60 border-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="relative">
            <label htmlFor="password" className="block mb-1 text-sm text-white">
              Password
            </label>
            <input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={handleInputChange}
              className="w-full px-4 py-2 text-black placeholder-gray-600 border rounded-md bg-white/60 border-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute text-white transform -translate-y-1/12 right-4 top-1/2"
            >
              {showPassword ? <Eye /> : <EyeOff />}
            </button>
          </div>
          <div className='h-5'>
            {showInvalid && <p className='text-center text-red-400'>Invalid credentials!</p>}
          </div>

          <button
            type="submit"
            className="w-full py-2 font-semibold text-white transition bg-blue-600 rounded-md hover:bg-blue-700"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
