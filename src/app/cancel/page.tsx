"use client";
import { Check, Search, X } from "lucide-react";
import React, { useState } from "react";
import Loading from "../../../component/Loading";
import Cancel_confirmation from "../../../component/Cancel_confirmation";
import Footer from "../../../component/Footer";

type UserBooking = {
  id: string;
  name: string; // User's name
  email: string; // User's email address
  contact: string; // User's contact number
  address: string; // User's address
  token_id: string;
  booked_on: string;
};

const userData_blank = {
    id: "",
    name: "",
    email: "",
    contact: "",
    address: "",
    token_id: "",
    booked_on: ""
  }

function page() {
  const [searchQuery, setSearchQuery] = useState<string>("ROR");
  const [showSpinner, setShowSpinner] = useState(false);
  const [userData, setUserData] = useState<UserBooking>(userData_blank);
  const [showUser, setShowUser] = useState(false)
  const [showInvalidMessage, setShowInvalidMessage] = useState(false)
    const [showCancelMessage, setShowCancelMessage] = useState(false)


  //handle search or form submission
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setShowUser(false)
    setShowSpinner(true)
    setShowInvalidMessage(false)
    setShowCancelMessage(false)
    try {
      const res = await fetch("/api/find", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token_id: searchQuery,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.log(errorData);
        throw new Error(errorData?.message || "User not found");
      }
      const data = await res.json();
      setUserData({
        id: data.user._id,
        name: data.user.name,
        email: data.user.email,
        contact: data.user.contact,
        address: data.user.address,
        booked_on: data.user.booked_on,
        token_id: data.user.token_id,
      });
      setShowSpinner(false)
      setShowUser(true)
      setShowInvalidMessage(false)
    } catch (error) {
      setShowSpinner(false)
      setShowInvalidMessage(true)
      console.log(error)
    }
  };

  const cancelBookingHandler = async () =>{
      setShowSpinner(true)
      setShowUser(false)
       try {
      const res = await fetch(`/api/cancel_booking/${userData.id}`, {
        method: "DELETE",
      });

      // Check if the response is a valid JSON
      if (res.ok) {
        const data = await res.json(); // This assumes the server sends JSON on success
        console.log('booking cancelled')
        setShowCancelMessage(true)
        setShowSpinner(false)
      } else {
        // If the response isn't OK, try to fetch text to inspect the error
        const errorText = await res.text(); // We get text in case it's HTML
        console.error("Error response:", errorText);
        alert(`Error: ${errorText}`);
      }
    } catch (error) {
      console.error("Network error:", error);
      alert("There was an issue with the request");
    }
  }

  const closeButtonHandler = () => {
     setUserData(userData_blank)
     setShowUser(false)
  }

  return (
    <div className="flex flex-col items-center w-full h-full mt-3 space-x-2">
      <div className="flex items-center justify-center w-full md:mt-16">
        <h1 className="mb-4 text-2xl font-bold text-center text-white">
          Cancel Booking
        </h1>
      </div>
      <div className="flex flex-col items-center justify-center w-full px-3 mt-5 md:flex-row">
        <input
          type="text"
          placeholder="Enter your Token ID"
          className="w-full px-4 py-2 text-gray-500 border border-gray-400 rounded-lg sm:w-1/3 focus:outline-none focus:ring-0"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          onClick={handleSearch}
          className="px-2 py-2 text-white rounded hover:text-blue-400"
        >
          <Search size={35} />
        </button>
      </div>
      {showUser && <div>
        <Cancel_confirmation data={userData}/>
        <div className="mt-5 text-[18px] md:text-2xl">
          <p className="text-white">Do you want to cancel this booking?</p>
        </div>
        <div className="flex items-center justify-center">
          <button onClick={cancelBookingHandler}>
            <Check className="mr-4 text-white" />
          </button>
          <button onClick={closeButtonHandler}>
            <X className="ml-4 text-white hover:text-red-500" />
          </button>
        </div>
      </div>}
      {showInvalidMessage && <div className="mt-4">
        <p className="text-center text-white">Booking Not Found!</p>
        <p className="text-center text-gray-500">Please enter the valid Token Id</p>
      </div>}
      {showCancelMessage && <div className="mt-4">
        <p className="text-center text-white">Your Booking has been cancelled! 👍🏻</p>
      </div>}
      <div className="mb-56">
      {showSpinner && <Loading />}
      </div>
      <div className="w-full">
      <Footer />
      </div>
    </div>
  );
}

export default page;
