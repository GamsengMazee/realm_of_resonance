import { DateTime } from "luxon";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

type SlotBooking = {
  date: string;
  slot: string;
};

type UserBooking = {
  name: string; // User's name
  email: string; // User's email address
  contact: string; // User's contact number
  address: string; // User's address
  token_id: string; //Token ID
  slots: SlotBooking[]; // Array of SlotBooking objects
};

interface typeProps {
  modalShow: boolean;
  handleClose: () => void;
  data: UserBooking;
}

function BookingConfirmation({ modalShow, handleClose, data }: typeProps) {
  // Check if slots are available (not empty)
  const hasSlots = data.slots && data.slots.length > 0;
  
  // Safely get the date if available
  const date = hasSlots
    ? DateTime.fromISO(data.slots[0].date).toFormat('dd/MM/yyyy')
    : 'Invalid Date';

  // Safely get the slot timings if available
  const timing = hasSlots
    ? `${data.slots[0].slot} - ${data.slots[data.slots.length - 1].slot}`
    : 'No available timings';

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
            <p className="px-3 py-2 font-bold text-center text-white bg-green-600 rounded">
              Booking Confirmation
            </p>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            <div className="flex justify-around">
              <div>
                <p className="text-center"><span className="font-bold">Token Id:</span> {data.token_id}</p>
                <p><span className="font-bold">Date:</span> {date}</p>
              </div>

              <p className="text-center"><span className="font-bold">Timing:</span> {timing}</p>
            </div>

            <hr />
            <ul className="flex-1/2">
              <li><span className="font-bold capitalize">Name:</span> {data.name}</li>
              <li><span className="font-bold">Email:</span> {data.email}</li>
              <li><span className="font-bold">Contact:</span> +91 {data.contact}</li>
              <li><span className="font-bold capitalize">Address:</span> {data.address}</li>
            </ul>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default BookingConfirmation;
