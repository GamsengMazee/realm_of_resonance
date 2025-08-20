"use client";
import React, { useEffect, useState, useMemo, useRef, useCallback } from "react";
import { DateTime } from "luxon";
import ModalComponent from "../../../component/ModalComponent";
import Loader from "../../../component/Loader";
import Footer from "../../../component/Footer";
import { ArrowBigLeft, ArrowBigRight } from "lucide-react";

// Type for a single slot
interface Slot {
  date: string; // ISO date string (e.g., '2025-07-27')
  slot: string; // The time of the slot (e.g., '8:00 AM')
}

// Type for a single booking
interface BookingType {
  _id: string; // Unique ID of the booking
  name: string; // Name of the person
  email: string; // Email of the person
  contact: string; // Contact number
  address: string; // Address of the person
  slots: Slot[]; // Array of slots selected by the person
  __v?: number; // Version key from MongoDB (optional)
}

export default function BookingPage() {
 const initialDateRef = useRef(DateTime.now().startOf("day"));
  const [currentStartDate, setCurrentStartDate] = useState(initialDateRef.current);
  const [device, setDevice] = useState("mobile");
  const [modalShow, setModalShow] = useState(false);
  const [selectedSlots, setSelectedSlots] = useState<{ day: DateTime; slot: string }[]>([]);
  const [payload, setPayload] = useState<Slot[]>([]);
  const [bookedSlots, setBookedSlots] = useState<Slot[]>([]);
  const [isLoading, setIsLoading] = useState(true);  //loader state while fetching data

  // Detect screen size
  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 800;
      setDevice(isMobile ? "mobile" : "desktop");
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  
  const timeSlots = useMemo(
    () =>
      Array.from({ length: 15 }, (_, i) =>
        DateTime.fromObject({ hour: 8 + i }).toFormat("h:mm a")
      ),
    []
  );


  //fetch booked slots
  const fetchBookedSlots =  useCallback( async() => {
    try {
      const res = await fetch("/api/bookslot");
      const data = await res.json();

      const flatSlots = data.bookings.flatMap((booking: BookingType) => {
        const slots: Slot[] = booking.slots;

        if (!Array.isArray(slots) || slots.length === 0) return [];

        const lastSlot = slots[slots.length - 1];
        const rest = slots.slice(0, -1);

        // If the last slot is 10:00 PM, keep it
        if (lastSlot.slot === "10:00 PM") {
          return [...rest, lastSlot];
        }

        const lastIndex = timeSlots.indexOf(lastSlot.slot);
        const nextSlot = timeSlots[lastIndex + 1];

        const isNextSlotBooked = data.bookings.some(
          (otherBooking: BookingType) =>
            otherBooking.slots.some(
              (s: Slot) =>
                s.date === lastSlot.date && // 🔧 this ensures same day
                s.slot === nextSlot
            )
        );

        if (isNextSlotBooked) {
          return [...rest, lastSlot]; // next is taken, keep this last one
        }

        return rest; // next is free, let user extend into it
      });

      setBookedSlots(flatSlots);
    } catch (error) {
      console.error("Error fetching slots:", error);
    } finally {
      setIsLoading(false); //disable loader when the bookedslot is fetched
    }
  },[timeSlots]);

  useEffect(() => {
    fetchBookedSlots();
  }, [fetchBookedSlots]);

  // Navigation
  const goToNextWeek = () => {
    setCurrentStartDate((prev) =>
      device === "mobile" ? prev.plus({ days: 2 }) : prev.plus({ weeks: 1 })
    );
  };

  const goToPreviousWeek = () => {
    setCurrentStartDate((prev) =>
      device === "mobile" ? prev.minus({ days: 2 }) : prev.minus({ weeks: 1 })
    );
  };

  const isPrevDisabled = useMemo(() => {
    const today = DateTime.now().startOf("day");
    // Disable the previous button if the currentStartDate is today
    return currentStartDate <= today;
  }, [currentStartDate]);

  // Generate week days and time slots
  const weekDays = useMemo(
    () =>
      Array.from({ length: device === "mobile" ? 2 : 7 }, (_, i) =>
        currentStartDate.plus({ days: i })
      ),
    [currentStartDate, device]
  );

  
  //*********** */ Select or deselect a slot*************
  const selectHandler = (day: DateTime, slot: string) => {
    const date = day.toISODate();

    const isAlreadyBooked = bookedSlots.some(
      (s: Slot) => s.date === date && s.slot === slot
    );
    if (isAlreadyBooked) return;

    const alreadySelectedOnSameDay = selectedSlots
      .filter((s) => s.day.toISODate() === date)
      .map((s) => s.slot);

    const isAlreadySelected = alreadySelectedOnSameDay.includes(slot);

    // ❌ Prevent deselecting a single slot — instead, clear all
    if (isAlreadySelected) {
      const userConfirmed = window.confirm(
        "This slot is part of a continuous block.\nDo you want to clear all selected slots for this day?"
      );

      if (userConfirmed) {
        setSelectedSlots((prev) =>
          prev.filter((s) => s.day.toISODate() !== date)
        );
      }

      return;
    }

    // ✅ Auto-fill selection range
    const slotIndexes = [...alreadySelectedOnSameDay, slot]
      .map((s) => timeSlots.indexOf(s))
      .filter((i) => i !== -1)
      .sort((a, b) => a - b);

    const min = slotIndexes[0];
    const max = slotIndexes[slotIndexes.length - 1];

    const slotsToSelect = timeSlots.slice(min, max + 1).filter((s) => {
      const isBooked = bookedSlots.some((b) => b.date === date && b.slot === s);
      return !isBooked;
    });

    const newSelected = slotsToSelect.map((s) => ({ day, slot: s }));

    // Remove existing slots for the day, replace with new full range
    setSelectedSlots((prev) => {
      const filtered = prev.filter((s) => s.day.toISODate() !== date);
      return [...filtered, ...newSelected];
    });
  };

  //********End of select dis-select slot****** */

  //clear the selected slots
  const clearSelectedSlots = () => {
    setSelectedSlots([]);
  };

  // Booking handler
  const handleBooking = async () => {
    if (selectedSlots.length === 0) return;

    const selectedSlotData = selectedSlots.map((s) => ({
      date: s.day.toISODate() ?? "", // Fallback to an empty string if it's null
      slot: s.slot,
    }));

    setPayload(selectedSlotData);
    setModalShow(true);
  };

  return (
    <div className="m-2 md:p-4 md:m-4">
      <ModalComponent
        fetchedBookedSlots={() => fetchBookedSlots()}
        clear_selected={() => clearSelectedSlots()}
        payload={payload}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />

      <h1 className="mb-4 text-2xl font-bold text-center text-white">
        Booking
      </h1>

      {isLoading ? (
        <div className="flex items-center justify-center min-h-[300px]">
          <Loader title="" />
        </div>
      ) : (
        <div>
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={goToPreviousWeek}
              disabled={isPrevDisabled}
              className={`px-4 py-2 text-3xl text-white flex items-center justify-center ${
                isPrevDisabled ? "bg-gray-300" : "bg-blue-600 hover:bg-blue-700"
              } rounded`}
            >
              <ArrowBigLeft/> <span className="hidden md:block">Previous</span>
            </button>

            <span className="text-sm font-semibold text-gray-500">
              {currentStartDate.toFormat("dd LLL")} -{" "}
              {currentStartDate
                .plus({ days: device === "mobile" ? 1 : 6 })
                .toFormat("dd LLL yyyy")}
            </span>

            <button
              onClick={goToNextWeek}
              className="flex items-center justify-center px-4 py-2 text-white bg-blue-600 rounded font sm:text-sm hover:bg-blue-700"
            >
             <span className="hidden md:block">Next</span> <ArrowBigRight/>
            </button>
          </div>
          {/* -----Button for booking----- */}
          <div className="mt-3 mb-2 text-center" style={{ minHeight: "70px" }}>
            {selectedSlots.length > 1 && (
              <button
                onClick={handleBooking}
                title="please select at least two slots"
                className="px-4 py-2 mt-4 text-white bg-green-600 rounded hover:bg-green-700"
              >
                Book {selectedSlots.length - 1} Hour
                {selectedSlots.length > 1 ? "s" : ""}
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-7">
            {weekDays.map((day) => (
              <div
                key={day.toISODate()}
                className="p-2 bg-white border rounded-lg shadow"
              >
                <h5 className="mb-2 font-semibold text-center">
                  <span className="text-gray-400">{day.toFormat("cccc")}</span>
                  <div className="text-sm text-gray-500">
                    {day.toFormat("dd LLL")}
                  </div>
                </h5>
                <ul className="p-0 space-y-1 text-sm">
                  {timeSlots.map((slot, idx) => {
                    const isSelected = selectedSlots.some(
                      (s) =>
                        s.day.toISODate() === day.toISODate() && s.slot === slot
                    );

                    const slotTime = DateTime.fromFormat(slot, "h:mm a");
                    const slotDateTime = day.set({
                      hour: slotTime.hour,
                      minute: slotTime.minute,
                      second: 0,
                    });

                    const isDisabled =
                      slotDateTime <= DateTime.now().plus({ minutes: 30 });
                    const isBooked = bookedSlots.some(
                      (b) => b.date === day.toISODate() && b.slot === slot
                    );
                    return (
                      <li
                        key={idx}
                        onClick={() => {
                          if (!isDisabled) selectHandler(day, slot);
                        }}
                        className={`border px-2 py-1 rounded text-center
                      ${
                        isDisabled
                          ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                          : isBooked
                          ? "bg-red-500 text-white cursor-not-allowed"
                          : isSelected
                          ? "bg-green-500 text-white cursor-pointer"
                          : "text-black cursor-pointer hover:bg-blue-100"
                      }`}
                        title={
                          isDisabled
                            ? "Slot unavailable (must book at least 30 minutes in advance)"
                            : isBooked
                            ? "Slot already booked"
                            : "Click to select"
                        }
                      >
                        {slot}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {!isLoading && <Footer />}
    </div>
  );
}
