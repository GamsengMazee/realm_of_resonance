import { DateTime } from "luxon";
import React from "react";

type UserBooking = {
  name: string; // User's name
  email: string; // User's email address
  contact: string; // User's contact number
  address: string; // User's address
  token_id: string;
  booked_on: string;
};

interface PropsType{
    data: UserBooking
}

function Cancel_confirmation({data}:PropsType) {
    console.log(data)
    const booking_data = DateTime.fromISO(data.booked_on.slice(0, 10)).toFormat('dd/MM/yyyy')
  return (
    <div className="px-4 py-4 mt-10 border-gray-500 rounded border-1">

        <div className="flex justify-around">
              <div>
                <p className="text-center text-white"><span className="font-bold text-white">Token Id:</span> {data.token_id}</p>
                <p className="text-white "><span className="font-bold text-white">Date:</span> {booking_data}</p>
              </div>
            </div>

            
            <ul className="p-0 m-0">
              <li className="text-white"><span className="font-bold text-white capitalize">Name:</span>{data.name}</li>
              <li className="text-white"><span className="font-bold text-white">Email:</span> {data.email}</li>
              <li className="text-white"><span className="font-bold text-white">Contact:</span> +91 {data.contact}</li>
              <li className="text-white"><span className="font-bold text-white capitalize">Address:</span> {data.address}</li>
            </ul>
    </div>
  );
}

export default Cancel_confirmation;
