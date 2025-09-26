"use client";
import React, { useEffect, useState, useMemo } from "react";
import { ArrowBigLeft, ArrowBigRight } from "lucide-react";
import { DateTime } from "luxon";

// Slot with user info
interface Slot {
  date: string;
  slot: string;
} 

interface SlotWithUser extends Slot {
  name: string;
  contact: string;
  token_id:string;
  email: string;
  address: string;
}

interface PropsType {
  booked_data: SlotWithUser[];
}

export default function Admin_booking({booked_data}:PropsType) {
  const [device, setDevice] = useState("mobile");
  const [currentStartDate, setCurrentStartDate] = useState(
    DateTime.now().startOf("day")
  );
  const [bookSlots, setBookedSlots] = useState<SlotWithUser[]>(booked_data);

  const timeSlots = useMemo(
    () =>
      Array.from({ length: 15 }, (_, i) =>
        DateTime.fromObject({ hour: 8 + i }).toFormat("h:mm a")
      ),
    []
  );

  useEffect(() => {
    const handleResize = () => {
      setDevice(window.innerWidth < 800 ? "mobile" : "desktop");
      // Removed resetting currentStartDate here to preserve navigation on resize
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

  const weekDays = useMemo(
    () =>
      Array.from({ length: device === "mobile" ? 2 : 7 }, (_, i) =>
        currentStartDate.plus({ days: i })
      ),
    [currentStartDate, device]
  );

  // Helper to parse slot hour from string like "8:00 AM"
  const parseSlotHour = (slotStr: string) =>
    DateTime.fromFormat(slotStr, "h:mm a").hour;

  return (
    <div className="md:p-4 md:m-4">
        <div>
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={goToPreviousWeek}
              className="flex items-center justify-center px-4 py-2 text-3xl text-white align-middle bg-blue-600 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
              aria-label="Previous week"
            >
              <ArrowBigLeft/> <span className="hidden md:block">Previous</span>
            </button>

            <span onClick={() => setCurrentStartDate(DateTime.now().startOf("day"))} className="text-sm font-semibold text-gray-500 cursor-pointer">
              {currentStartDate.toFormat("dd LLL")} -{" "}
              {currentStartDate
                .plus({ days: device === "mobile" ? 1 : 6 })
                .toFormat("dd LLL yyyy")}
            </span>

            <button
              onClick={goToNextWeek}
              className="flex items-center justify-center px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
              aria-label="Next week"
            >
              <span className="hidden md:block">Next</span> <ArrowBigRight/>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-7">
            {weekDays.map((day) => (
              <div
                key={day.toISODate()}
                className={`p-2 bg-white border rounded-lg shadow ${
                  day.hasSame(DateTime.now(), "day")
                    ? "border-blue-500 border-2"
                    : ""
                }`}
                aria-label={`Bookings for ${day.toFormat("cccc, dd LLL yyyy")}`}
              >
                <h6 className="mb-2 font-semibold text-center">
                  <span className="text-gray-400">{day.toFormat("cccc")}</span>
                  <div className="text-sm text-gray-500">{day.toFormat("dd LLL")}</div>
                </h6>
                <ul className="p-0 space-y-1 text-sm">
                  {timeSlots.map((slot, idx) => {
                    const slotHour = parseSlotHour(slot);

                    // Find booking for this date and slot hour (compare hour number)
                    const booking = bookSlots.find((b) => {
                      if (b.date !== day.toISODate()) return false;
                      const bookingSlotHour = parseSlotHour(b.slot);
                      return bookingSlotHour === slotHour;
                    });

                    return (
                      <li
                        key={idx}
                        className={`border px-2 py-1 rounded text-center flex flex-col justify-center items-center min-h-[52px] cursor-default
                          ${
                            booking
                              ? "bg-red-500 text-white"
                              : "text-black hover:bg-gray-100"
                          }
                          focus:outline-none focus:ring-2 focus:ring-blue-400`}
                        tabIndex={0}
                        title={
                          booking
                            ? `Booked by: ${booking.name} (${booking.contact})`
                            : "Available"
                        }
                        aria-label={
                          booking
                            ? `Booked slot at ${slot} by ${booking.name} +91 (${booking.contact})`
                            : `Available slot at ${slot}`
                        }
                      >
                        <span className="text-sm font-medium">{slot}</span>
                        <span className="text-xs opacity-90">
                          {booking?.name || "\u00A0" /* non-breaking space */}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>
    </div>
  );
}
