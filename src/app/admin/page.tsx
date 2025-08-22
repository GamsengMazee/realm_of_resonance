"use client";
import {
  LayoutDashboard,
  Calendar,
  Clock,
  ArrowDown,
  ArrowUp,
  Ban,
} from "lucide-react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import DashboardContent from "../../../component/DashboardContent";
import Admin_booking from "../../../component/Admin_booking";
import Loader from "../../../component/Loader";
import { DateTime } from "luxon";
import AdminSlots from "../../../component/AdminSlots";
import {
  calculateCurrentMonthStats,
  calculatePreviousMonthStats,
  getTotalStats,
} from "../../../utils/calculateMontly";
import LoginCard from "../../../component/LoginCard";
import Admin_cancelList from "../../../component/Admin_cancelList";

const menuItems = [
  { name: "Dashboard", id: "dashboard", icon: <LayoutDashboard /> },
  { name: "All Bookings", id: "all-bookings", icon: <Calendar /> },
  { name: "Slots", id: "slots", icon: <Clock /> },
  { name: "Cancelled", id: "cancel", icon: <Ban /> },
];

// Slot with user info
interface Slot {
  date: string;
  slot: string;
}

// Booking type
interface BookingType {
  _id: string;
  name: string;
  email: string;
  contact: string;
  booked_on: string;
  address: string;
  token_id: string;
  slots: Slot[];
  __v?: number;
}

interface SlotWithUser extends Slot {
  name: string;
  contact: string;
  token_id: string;
  email: string;
  address: string;
}

export default function AdminDashboard() {
  const [activeMenu, setActiveMenu] = useState("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [bookSlots, setBookedSlots] = useState<SlotWithUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [bookedData, setBookedData] = useState<BookingType[]>([]);
  const [cancelledSlots, setCancelledSlots] = useState<BookingType[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [todayBookingData, setTodaysBookingData] = useState({
    todays_booking: "",
    hours_booked_today: "",
    total_bookings: "",
    total_hours: "",
    currentMonth_bookings: "",
    currentMonth_hours: "",
    prevMonths_bookings: "",
    prevMonths_hours: "",
    user_1: { user_name: "", slots_booked: "", booked_on: "" },
    user_2: { user_name: "", slots_booked: "", booked_on: "" },
    user_3: { user_name: "", slots_booked: "", booked_on: "" },
  });

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close on outside click or ESC key
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsSidebarOpen(false);
      }
    }

    function handleEscapeKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setIsSidebarOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, []);

  const fetchBookedSlots = async () => {
    try {
      const res = await fetch("/api/adminapi");
      const data = await res.json();
      setBookedData(data.bookings);

      //how many bookings occured today
      const today = DateTime.local().toISODate();

      const todayBookings: string = data.bookings.filter(
        (booking: BookingType) =>
          booking.slots.some((slot) => slot.date === today)
      ).length;

      //calculate how many hours are booked today
      const todayTotalHours: number = data.bookings.reduce(
        (total: number, booking: BookingType) => {
          const todaySlots = booking.slots.filter(
            (slot) => slot.date === today
          );
          return total + todaySlots.length;
        },
        0
      );

      const thisMonthStats = calculateCurrentMonthStats(data.bookings);
      const previousMonthStats = calculatePreviousMonthStats(data.bookings);
      const totalStats = getTotalStats(data.bookings);

      const flatSlotsWithUser: SlotWithUser[] = data.bookings.flatMap(
        (booking: BookingType) =>
          booking.slots.map((slot) => ({
            ...slot,
            name: booking.name,
            token_id: booking.token_id,
            contact: booking.contact,
            email: booking.email,
            address: booking.address,
          }))
      );

      setBookedSlots(flatSlotsWithUser);

      const getRecentUser = (index: number) => {
        const booking = data.bookings[data.bookings.length - index];
        return booking
          ? {
              user_name: booking.name,
              slots_booked: `${Math.max(booking.slots.length - 1, 0)}`,
              booked_on: booking.booked_on,
            }
          : { user_name: "", slots_booked: "0", booked_on: "" };
      };

      //data for dashboard content
      setTodaysBookingData({
        todays_booking: `${todayBookings}`,
        hours_booked_today: `${todayTotalHours - 1}`,
        total_bookings: `${data.bookings.length}`,
        currentMonth_bookings: `${thisMonthStats.currentMonthBookings_stats}`,
        currentMonth_hours: `${thisMonthStats.currentMonthBookings_hours}`,
        prevMonths_bookings: `${previousMonthStats.prevMonthBookings_stats}`,
        prevMonths_hours: `${previousMonthStats.prevMonthBookings_hours}`,
        total_hours: `${totalStats.totalHours}`,
        user_1: getRecentUser(1),
        user_2: getRecentUser(2),
        user_3: getRecentUser(3),
      });
    } catch (error) {
      console.error("Error fetching slots:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // fetch all the cancelled data
  const fetchCancelledSlots = async () => {
    try {
      const res = await fetch("/api/admin_cancelled_user");
      const data = await res.json();
      setCancelledSlots(data.cancelled);
    } catch (error) {
      console.error("Error fetching slots:", error);
    }
  };

  //Redirect to homepage if cookie does not exist or verify cookie if it exist
  const authenticate = useCallback(async () => {
    try {
      const response = await fetch("/api/auth0", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 201) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchBookedSlots();
    authenticate();
    fetchCancelledSlots();
  }, []);

  const loginHandler = async () => {
    setIsLoggedIn(true);
  };

  if (!isLoggedIn) {
    return (
      <>
        {isLoading ? (
          <div className="flex items-center justify-center min-h-[300px]">
            <Loader title="" />
          </div>
        ) : (
          <LoginCard login={loginHandler} />
        )}
      </>
    );
  } else {
    return (
      <>
        {isLoading ? (
          <div className="flex items-center justify-center min-h-[300px]">
            <Loader title="" />
          </div>
        ) : (
          <div className="relative min-h-screen text-gray-100 bg-gray-900">
            {/* Mobile Topbar */}
            <div className="flex flex-col items-center justify-between p-1 bg-gray-800 md:hidden">
              <h3 className="text-xl font-bold text-white">Admin Panel</h3>
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="p-2 text-white hover:bg-green-500 animate-bounce"
                aria-label="Toggle Mobile Menu"
                aria-expanded={isSidebarOpen}
                aria-controls="mobile-dropdown"
              >
                {isSidebarOpen ? <ArrowUp /> : <ArrowDown />}
              </button>
            </div>

            {/* Mobile Dropdown Menu */}
            <div
              id="mobile-dropdown"
              ref={dropdownRef}
              className={`md:hidden bg-gray-700 overflow-hidden transition-all duration-300 ease-in-out ${
                isSidebarOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
              }`}
              style={{ transitionProperty: "max-height, opacity" }}
            >
              <ul className="flex flex-col p-2">
                {menuItems.map(({ name, id, icon }) => (
                  <li key={id}>
                    <button
                      onClick={() => {
                        setActiveMenu(id);
                        setIsSidebarOpen(false);
                      }}
                      className={`flex items-center px-4 py-2 w-full text-left rounded font-semibold transition-colors duration-200 ${
                        activeMenu === id
                          ? "bg-green-500 text-gray-900"
                          : "hover:bg-green-700 hover:text-white text-white"
                      }`}
                    >
                      <span className="mr-3">{icon}</span>
                      <span>{name}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Desktop Sidebar */}
            <div className="hidden md:block">
              <nav className="fixed left-0 w-56 h-full pt-2 bg-gray-800">
                {/* Header */}
                <div className="mb-10">
                  <h3 className="text-2xl font-bold text-center text-white select-none">
                    Admin Panel
                  </h3>
                </div>

                {/* Menu Items */}
                <ul className="flex flex-col p-0 ml-2 mr-2">
                  {menuItems.map(({ name, id, icon }) => (
                    <li key={id}>
                      <button
                        onClick={() => setActiveMenu(id)}
                        className={`flex items-center mt-2 pl-10 w-full py-2 rounded font-semibold transition-colors duration-300 ${
                          activeMenu === id
                            ? "bg-green-500 text-gray-900"
                            : "hover:bg-green-700 hover:text-white text-white"
                        }`}
                      >
                        <span className="mr-3">{icon}</span>
                        <span>{name}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            {/* Main Content */}
            <main className="flex-1 p-2 transition-all duration-300 md:p-10 md:ml-56">
              {activeMenu === "dashboard" && (
                <DashboardContent todays_data={todayBookingData} />
              )}
              {activeMenu === "all-bookings" && (
                <div>
                  <p className="mb-1 text-4xl text-center text-green-400">
                    All Bookings
                  </p>
                  <p className="text-center text-gray-400">
                    List and manage all bookings here.
                  </p>
                  <Admin_booking booked_data={bookSlots} />
                </div>
              )}
              {activeMenu === "slots" && (
                <div>
                  <div>
                    <p className="mb-4 text-4xl text-center text-green-400">
                      Slots
                    </p>
                    <p className="text-center text-gray-400">
                      View and manage all booking slots here
                    </p>
                  </div>
                  <AdminSlots booked_data={bookedData} />
                </div>
              )}
              {activeMenu === "cancel" && (
                <div>
                  <div>
                    <p className="mt-2 mb-4 text-4xl text-center text-green-400">
                      Cancelled Bookings
                    </p>
                    <p className="text-center text-gray-400">
                      View and manage all cancelled bookings here
                    </p>
                  </div>
                  <Admin_cancelList data={cancelledSlots}/>
                </div>
              )}
            </main>
          </div>
        )}
      </>
    );
  }
}

//guard with this incase the value shows negative value
// hours_booked_today: `${Math.max(todayTotalHours, 0)}`,
