"use client";
import { Check, X } from "lucide-react";
import { DateTime } from "luxon";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

// Interfaces
interface Slot {
  date: string; // Format: YYYY-MM-DD
  slot: string; // Format: "10:00 AM"
}

interface BookingType {
  _id: string;
  name: string;
  email: string;
  contact: string;
  address: string;
  token_id: string;
  slots: Slot[];
  __v?: number;
}

interface typeProps {
  modalShow: boolean;
  handleClose: () => void;
  data: BookingType;
  apiParam: string; //determines whether the data is from booking page or cancelled page
}

function AdminModalComponent({
  modalShow,
  handleClose,
  data,
  apiParam,
}: typeProps) {
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  // Check if slots are available (not empty)
  const hasSlots = data.slots && data.slots.length > 0;
 
  // Safely get the date if available
  const date = hasSlots
    ? DateTime.fromISO(data.slots[0].date).toFormat("dd/MM/yyyy")
    : "Invalid Date";

  // Safely get the slot timings if available
  const timing = hasSlots
    ? `${data.slots[0].slot} - ${data.slots[data.slots.length - 1].slot}`
    : "No available timings";

  const deleteUser = async () => {

    try {
      const res = await fetch(`/api/${apiParam}/${data._id}`, {
        method: "DELETE",
      });

      // Check if the response is a valid JSON
      if (res.ok) {
        const data = await res.json(); // This assumes the server sends JSON on success
        handleClose();
        alert("User deleted successfully");
        window.location.reload();
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
  };

  const deleteButtonHandler = () => {
    setShowDeleteConfirmation(true);
  };

  const closeButtonHandler = () => {
    setShowDeleteConfirmation(false);
  };

  return (
    <>
      <Modal
        show={modalShow}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header className="flex items-center justify-center">
          <Modal.Title
            className="flex items-center justify-center w-full text-center"
            id="contained-modal-title-vcenter"
          >
            <p className="px-3 py-2 text-2xl font-bold text-center text-white bg-green-600 rounded">
              Booking Details
            </p>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            <div className="flex flex-col justify-around md:flex-start">
              <div className="flex flex-col md:flex-start">
                <p className="text-sm text-center md:text-base">
                  <span className="text-sm font-bold md:text-base">
                    Token Id:
                  </span>{" "}
                  {data.token_id}
                </p>
                <p className="text-sm text-center md:text-base">
                  <span className="text-sm font-bold md:text-base">Date:</span>{" "}
                  {date}
                </p>
              </div>

              <p className="text-sm text-center md:text-base md:text-left">
                <span className="text-sm font-bold md:text-base">Timing:</span>{" "}
                {timing}
              </p>
            </div>

            <hr />
            <ul className="flex-1/2">
              <li>
                <span className="font-bold capitalize">Name:</span> {data.name}
              </li>
              <li>
                <span className="font-bold">Email:</span> {data.email}
              </li>
              <li>
                <span className="font-bold">Contact:</span> +91 {data.contact}
              </li>
              <li>
                <span className="font-bold capitalize">Address:</span>{" "}
                {data.address}
              </li>
            </ul>
          </div>
        </Modal.Body>
        <Modal.Footer className="d-block">
          {!showDeleteConfirmation && (
            <div className="flex justify-end w-full">
              <Button
                className="mx-3"
                variant="danger"
                onClick={deleteButtonHandler}
              >
                Delete
              </Button>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
            </div>
          )}
          {showDeleteConfirmation && (
            <div className="flex flex-row">
              <div className="flex items-center justify-center">
                <p className="flex mt-3 text-black">
                  Do you want to delete this booking?
                </p>
              </div>
              <div className="flex items-center justify-center ml-3">
                <button onClick={deleteUser}>
                  <Check className="mr-4 text-red-500 hover:text-red-400" />
                </button>
                <button onClick={closeButtonHandler}>
                  <X className="ml-4 text-green-500 hover:text-green-400" />
                </button>
              </div>
            </div>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AdminModalComponent;
