import { DateTime } from "luxon";

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

interface BookingStats {
  bookingCount: number;
  bookedSlots: number;
  uniqueSlotDates: number;
  totalHours: number;
}

/**
 * Calculates booking stats for a given month.
 */
const getMonthStats = (bookings: BookingType[], monthOffset: number = 0): BookingStats => {
  const targetDate = DateTime.local().plus({ months: monthOffset });
  const targetMonth = targetDate.month;
  const targetYear = targetDate.year;

  let bookingCount = 0;
  let totalHours = 0;
  let totalSlots = 0;
  const slotDateSet = new Set<string>();

  for (const booking of bookings) {
    const matchingSlots = booking.slots.filter((slot) => {
      const slotDate = DateTime.fromISO(slot.date);
      return slotDate.month === targetMonth && slotDate.year === targetYear;
    });

    if (matchingSlots.length > 0) {
      bookingCount += 1;

      const slotsByDate: Record<string, DateTime[]> = {};

      for (const { date, slot } of matchingSlots) {
        const dt = DateTime.fromFormat(`${date} ${slot}`, "yyyy-MM-dd h:mm a");
        if (!dt.isValid) continue;

        if (!slotsByDate[date]) slotsByDate[date] = [];
        slotsByDate[date].push(dt);
        slotDateSet.add(date);
      }

      for (const times of Object.values(slotsByDate)) {
        times.sort((a, b) => a.toMillis() - b.toMillis());

        for (let i = 1; i < times.length; i++) {
          const diff = times[i].diff(times[i - 1], "hours").hours;
          if (Math.round(diff) === 1) {
            totalHours += 1;
          }
        }

        // Single slot still counts as 0 hours — optional: +1 if you want a minimum
        totalSlots += times.length;
      }
    }
  }

  return {
    bookingCount,
    bookedSlots: totalSlots,
    uniqueSlotDates: slotDateSet.size,
    totalHours,
  };
};

// Wrapper functions for specific months
export const calculateCurrentMonthStats = (bookings: BookingType[]) => {
  const { bookingCount, bookedSlots, uniqueSlotDates, totalHours } = getMonthStats(bookings, 0);
  return {
    currentMonthBookings_stats: bookingCount,
    currentMonthBookings_hours: totalHours,
    currentMonthUniqueDates: uniqueSlotDates,
    currentMonthTotalSlots: bookedSlots,
  };
};

export const calculatePreviousMonthStats = (bookings: BookingType[]) => {
  const { bookingCount, bookedSlots, uniqueSlotDates, totalHours } = getMonthStats(bookings, -1);
  return {
    prevMonthBookings_stats: bookingCount,
    prevMonthBookings_hours: totalHours,
    prevMonthUniqueDates: uniqueSlotDates,
    prevMonthTotalSlots: bookedSlots,
  };
};

/**
 * Global total stats across all bookings.
 */
export const getTotalStats = (bookings: BookingType[]): { totalHours: number } => {
  let totalHours = 0;

  for (const booking of bookings) {
    const slotsByDate: Record<string, DateTime[]> = {};

    for (const { date, slot } of booking.slots) {
      const dt = DateTime.fromFormat(`${date} ${slot}`, "yyyy-MM-dd h:mm a");
      if (!dt.isValid) continue;

      if (!slotsByDate[date]) slotsByDate[date] = [];
      slotsByDate[date].push(dt);
    }

    for (const times of Object.values(slotsByDate)) {
      times.sort((a, b) => a.toMillis() - b.toMillis());

      for (let i = 1; i < times.length; i++) {
        const diff = times[i].diff(times[i - 1], "hours").hours;
        if (Math.round(diff) === 1) {
          totalHours += 1;
        }
      }
    }
  }

  return { totalHours };
};
