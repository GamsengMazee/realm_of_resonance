import React, { useState } from "react";
import { DateTime } from "luxon";
import AdminModalComponent from "./AdminModalComponent";

// Type for a single slot
interface Slot {
  date: string;
  slot: string;
}

// Type for a booking entry
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

// Props type
interface PropsType {
  data: BookingType[];
}

let user = {
  _id: '',
  name: '',
  email: '',
  contact: '',
  address: '',
  token_id: '',
  slots: [],
  __v: 0,
}

function Admin_cancelList({ data }: PropsType) {
  const itemsPerPage = 15;
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDate, setSelectedDate] = useState<string | null>();
  const [userDetail, setUserDetail] = useState<BookingType>(user)
  const [showModal, setShowModal] = useState(false)
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // Helper function to get DateTime for sorting
  function getBookingDateTime(booking: BookingType): DateTime {
    if (!booking.slots.length) return DateTime.fromISO("1970-01-01");

    const firstSlot = booking.slots[0];
    const startTime = firstSlot.slot.split(" - ")[0];

    const datePart = DateTime.fromISO(firstSlot.date);
    const timePart = DateTime.fromFormat(startTime, "h:mm a");

    return datePart.set({ hour: timePart.hour, minute: timePart.minute });
  }

  // Filter the booked data based on search query and selected date
  const filteredData = data.filter((entry) => {
    const searchTerm = searchQuery.toLowerCase();
    const matchesSearch =
      entry.name.toLowerCase().trim().includes(searchTerm) ||
      entry.token_id.toLowerCase().trim().includes(searchTerm);

    const matchesDate = selectedDate
      ? entry.slots.some(
          (slot) => DateTime.fromISO(slot.date).toISODate() === selectedDate
        )
      : true; // If no date is selected, we don't filter by date

    return matchesSearch && matchesDate;
  });

  // Sort filtered data by DateTime (latest first)
  const sortedData = filteredData.sort((a, b) => {
    return getBookingDateTime(b).toMillis() - getBookingDateTime(a).toMillis();
  });

  // Get current items based on pagination
  const currentItems = sortedData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);

  // Handle page change
  const handlePageChange = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  // Handle the reset of filters (both search and date)
  const handleViewAll = () => {
    setSearchQuery("");
    setSelectedDate(null);
    setCurrentPage(1);
  };

  const handleOpenModal = (data:BookingType) => {
        setUserDetail(data)
        setShowModal(true)
  }

  const handleClose = () => {
    setShowModal(false)
  }

  return (
    <div className="min-h-screen p-4 mt-5 bg-gray-100 rounded">
      {/* Search Bar and Calendar */}
      <div className="flex flex-col items-center justify-center gap-4 mb-4 md:flex-row">
        <input
          type="text"
          placeholder="Search by Name or Token ID"
          className="w-full px-4 py-2 text-gray-500 border border-gray-400 rounded-lg sm:w-1/3"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {/* Native Calendar Picker */}
        <input
          type="date"
          value={selectedDate || ""}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="px-4 py-2 text-gray-400 border rounded-lg"
        />
        {/* View All Button */}
        <button
          onClick={handleViewAll}
          className="px-4 py-2 text-white bg-blue-500 rounded"
        >
          View All
        </button>
      </div>

      <div className="mx-auto overflow-hidden bg-white rounded-lg shadow-md max-w-7xl">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-xs font-semibold tracking-wider text-center text-gray-600 uppercase border-r border-gray-800 sm:text-sm">
                  Name
                </th>
                <th className="px-4 py-3 text-xs font-semibold tracking-wider text-center text-gray-600 uppercase border-r border-gray-800 sm:text-sm">
                  Email
                </th>
                <th className="px-4 py-3 text-xs font-semibold tracking-wider text-center text-gray-600 uppercase border-r border-gray-800 sm:text-sm">
                  Contact
                </th>
                <th className="px-4 py-3 text-xs font-semibold tracking-wider text-center text-gray-600 uppercase border-r border-gray-800 sm:text-sm">
                  Address
                </th>
                <th className="px-4 py-3 text-xs font-semibold tracking-wider text-center text-gray-600 uppercase border-r border-gray-800 sm:text-sm">
                  Booked Timing
                </th>
                <th className="px-4 py-3 text-xs font-semibold tracking-wider text-center text-gray-600 uppercase sm:text-sm">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentItems.map((entry, index) => {
                const firstSlot = entry.slots?.[0];
                const lastSlot = entry.slots?.[entry.slots.length - 1];

                return (
                  <tr onClick={() => handleOpenModal(entry)} key={index} className="transition hover:bg-gray-200">
                    <td className="px-4 py-3 text-xs text-center text-gray-700 capitalize border-gray-50 border-1 sm:text-sm whitespace-nowrap">
                      {entry.name}
                    </td>
                    <td className="px-4 py-3 text-xs text-center text-gray-700 border-gray-50 border-1 sm:text-sm whitespace-nowrap">
                      {entry.email}
                    </td>
                    <td className="px-4 py-3 text-xs text-center text-gray-700 border-gray-50 border-1 sm:text-sm whitespace-nowrap">
                      {entry.contact}
                    </td>
                    <td className="px-4 py-3 text-xs text-center text-gray-700 capitalize border-gray-50 border-1 sm:text-sm whitespace-nowrap">
                      {entry.address}
                    </td>
                    <td className="px-4 py-3 text-xs text-center text-gray-700 border-gray-50 border-1 sm:text-sm whitespace-nowrap">
                      {firstSlot && lastSlot
                        ? `${firstSlot.slot} - ${lastSlot.slot}`
                        : "N/A"}
                    </td>
                    <td className="px-4 py-3 text-xs text-center text-gray-700 border-gray-50 border-1 sm:text-sm whitespace-nowrap">
                      {firstSlot?.date
                        ? DateTime.fromISO(firstSlot.date).toFormat("dd/MM/yy")
                        : "N/A"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <AdminModalComponent data={userDetail} modalShow={showModal} handleClose={handleClose} apiParam="admin_cancelled_user"/>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between p-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 text-sm text-gray-700 bg-gray-300 rounded disabled:opacity-50"
          >
            Previous
          </button>

          <div className="text-sm text-gray-700">
            Page {currentPage} of {totalPages}
          </div>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 text-sm text-gray-700 bg-gray-300 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default Admin_cancelList;
