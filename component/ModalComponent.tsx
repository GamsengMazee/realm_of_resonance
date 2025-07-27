"use client";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { validate } from "../utils/formValidation";
import Loader from "./Loader";
import BookingConfirmation from "./ModalBookingConfirmation";
import { random_number } from "../utils/random";
import { DateTime } from "luxon";
type SlotBooking = {
  date: string;
  slot: string;
};

type UserBooking = {
  name: string; // User's name
  email: string; // User's email address
  contact: string; // User's contact number
  address: string; // User's address
  token_id: string;
  slots: SlotBooking[]; // Array of SlotBooking objects
};

interface FormData {
  name: string;
  email: string;
  contact: string;
  address: string;
}

interface Errors {
  name: string;
  email: string;
  contact: string;
  address: string;
}

interface ModalComponentProps {
  fetchedBookedSlots: () => void;
  onHide: () => void;
  clear_selected: () => void;
  show: boolean;
  payload: SlotBooking[];
}

function ModalComponent({
  show,
  onHide,
  payload,
  clear_selected,
  fetchedBookedSlots,
}: ModalComponentProps) {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    contact: "",
    address: "",
  });

  const [errors, setErrors] = useState<Errors>({
    name: "",
    email: "",
    contact: "",
    address: "",
  });

  const [showLoader, setShowLoader] = useState(false); //spinner Lodader
  const [successfulModal, setSuccessfulModal] = useState(false); // for successful booking
  const [bookedData, setBookedData] = useState<UserBooking>({
    name: "",
    email: "",
    contact: "",
    address: "",
    token_id: "",
    slots: [],
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    onHide(); // Hide the modal
    setShowLoader(true); // Show loader

    const validationErrors = validate(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors as Errors);
      setShowLoader(false); // Hide loader if validation fails
    } else {
      try { 
        const random_no = random_number()
        
        const res = await fetch("/api/bookslot", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            contact: formData.contact,
            address: formData.address,
            token_id: `ROR${random_no}${DateTime.local().year}`,
            slots: payload,
          }),
        });

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData?.message || "Booking failed");
        }

        const data = await res.json();
        console.log(data.data.saved);
        /*----response is stored in state-----*/
        setBookedData({
          name: data.data.saved.name,
          email: data.data.saved.email,
          contact: data.data.saved.contact,
          address: data.data.saved.address,
          token_id: data.data.saved.token_id,
          slots: data.data.saved.slots,
        });

        // Clear selected slots, hide loader, and show success modal
        clear_selected();
        setShowLoader(false);
        setSuccessfulModal(true);

        // Fetch booked slots again
        fetchedBookedSlots();

        // Reset form data
        setFormData({
          name: "",
          email: "",
          contact: "",
          address: "",
        });
      } catch (err) {
        console.error(err);
        alert(`Something Went Wrong! Failed to book slots`);
        setShowLoader(false); // Hide loader on error
      }
    }
  };

  return (
    <>
      {/*Loader while submitting forms*/}
      {showLoader && <Loader title="Please Wait" />}
      {/*Modal after successful booking*/}
      <BookingConfirmation
      data={bookedData}
        modalShow={successfulModal}
        handleClose={() => setSuccessfulModal(false)}
      />

      {/*Modal with forms*/}
      <Modal
        show={show}
        onHide={onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header className="flex items-center justify-center" closeButton>
          <Modal.Title
            className="flex items-center justify-center w-full text-center"
            id="contained-modal-title-vcenter"
          >
            <p className="px-3 py-2 font-bold text-center text-white bg-green-600 rounded">
              Booking Details
            </p>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-0">
          <div className="max-w-xl px-10 pb-3 mx-auto mt-3 bg-white rounded-lg shadow-md">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block mb-1 text-gray-700">
                  Name:
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded focus:outline-none ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter your name"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block mb-1 text-gray-700">
                  Email (optional):
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded focus:outline-none ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter your email"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                )}
              </div>

              {/* Contact */}
              <div>
                <label htmlFor="contact" className="block mb-1 text-gray-700">
                  Contact No.:
                </label>
                <input
                  type="tel"
                  name="contact"
                  id="contact"
                  value={formData.contact}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded focus:outline-none ${
                    errors.contact ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter your contact number"
                />
                {errors.contact && (
                  <p className="mt-1 text-sm text-red-500">{errors.contact}</p>
                )}
              </div>

              {/* Address */}
              <div>
                <label htmlFor="address" className="block mb-1 text-gray-700">
                  Address:
                </label>
                <textarea
                  name="address"
                  id="address"
                  value={formData.address}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded focus:outline-none ${
                    errors.address ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter your address"
                  rows={3}
                />
                {errors.address && (
                  <p className="mt-1 text-sm text-red-500">{errors.address}</p>
                )}
              </div>

              {/* Submit */}
              <div>
                <button
                  type="submit"
                  className="w-full py-2 text-white transition duration-200 bg-blue-600 rounded hover:bg-blue-700"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ModalComponent;
