// Slot with user info
interface Slot {
  date: string;
  slot: string;
}

interface TodaysProps {
  todays_booking: string;
  hours_booked_today: string;
  total_bookings: string;
  total_hours: string;
  currentMonth_bookings: string;
  currentMonth_hours: string;
  prevMonths_bookings: string;
  prevMonths_hours: string;
  user_1: { user_name: string; slots_booked: string };
  user_2: { user_name: string; slots_booked: string };
  user_3: { user_name: string; slots_booked: string };
}

interface SlotWithUser extends Slot {
  name: string;
  contact: string;
  token_id: string;
  email: string;
  address: string;
}

interface PropsType {
  todays_data: TodaysProps;
}

export default function DashboardContent({ todays_data }: PropsType) {
  return (
    <>
      <header className="mb-8">
        <p className="text-4xl font-bold text-center text-green-400 ">
          Dashboard
        </p>
        <p className="mt-2 text-center text-gray-400">
          Welcome to the admin dashboard overview.
        </p>
      </header>

      <section className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Card 1 */}
        <div className="p-6 transition-shadow duration-300 bg-gray-800 rounded-lg shadow-lg hover:shadow-green-500">
          <p className="mb-2 text-3xl text-center text-gray-300">
            Today's Bookings
          </p>
          <p className="text-3xl font-bold text-center text-green-400">
            {todays_data.todays_booking}
          </p>
          <p className="mt-1 text-center text-green-300">+5% from last week</p>
        </div>

        {/* Card 2 */}
        <div className="p-6 transition-shadow duration-300 bg-gray-800 rounded-lg shadow-lg hover:shadow-green-500">
          <p className="mb-2 text-3xl text-center text-gray-300">
            Hours Booked Today
          </p>
          <p className="text-3xl font-bold text-center text-green-400">
            {todays_data.hours_booked_today}
          </p>
          <p className="mt-1 text-center text-green-300">-3% from last week</p>
        </div>

        {/* Card 3 */}
        <div className="p-6 transition-shadow duration-300 bg-gray-800 rounded-lg shadow-lg hover:shadow-green-500">
          <p className="mb-2 text-3xl text-center text-gray-300">
            Current Month Bookings
          </p>
          <p className="text-3xl font-bold text-center text-green-400">
            {todays_data.currentMonth_bookings}
          </p>
          <p className="mt-1 text-center text-green-300">-3% from last week</p>
        </div>

        {/* Card 4 */}
        <div className="p-6 transition-shadow duration-300 bg-gray-800 rounded-lg shadow-lg hover:shadow-green-500">
          <p className="mb-2 text-3xl text-center text-gray-300">
            Current Month (Hours)
          </p>
          <p className="text-3xl font-bold text-center text-green-400">
            {todays_data.currentMonth_hours}
          </p>
          <p className="mt-1 text-center text-green-300">-3% from last week</p>
        </div>

        {/* Card 5 */}
        <div className="p-6 transition-shadow duration-300 bg-gray-800 rounded-lg shadow-lg hover:shadow-green-500">
          <p className="mb-2 text-3xl text-center text-gray-300">
            Previous Month Bookings
          </p>
          <p className="text-3xl font-bold text-center text-green-400">
            {todays_data.prevMonths_bookings}
          </p>
          <p className="mt-1 text-center text-green-300">-3% from last week</p>
        </div>

        {/* Card 6 */}
        <div className="p-6 transition-shadow duration-300 bg-gray-800 rounded-lg shadow-lg hover:shadow-green-500">
          <p className="mb-2 text-3xl text-center text-gray-300">
            Previous Month (Hours)
          </p>
          <p className="text-3xl font-bold text-center text-green-400">
            {todays_data.prevMonths_hours}
          </p>
          <p className="mt-1 text-center text-green-300">-3% from last week</p>
        </div>

        {/* Card -- */}
        <div className="p-6 transition-shadow duration-300 bg-gray-800 rounded-lg shadow-lg hover:shadow-green-500">
          <p className="mb-2 text-3xl text-center text-gray-300">
            Total Bookings
          </p>
          <p className="text-3xl font-bold text-center text-green-400">
            {todays_data.total_bookings}
          </p>
          <p className="mt-1 text-center text-green-300">+15% from last week</p>
        </div>

        {/* Card -- */}
        <div className="p-6 transition-shadow duration-300 bg-gray-800 rounded-lg shadow-lg hover:shadow-green-500">
          <p className="mb-2 text-3xl text-center text-gray-300">
            Total Hours Booked
          </p>
          <p className="text-3xl font-bold text-center text-green-400">
            {todays_data.total_hours}
          </p>
          <p className="mt-1 text-center text-green-300">-3% from last week</p>
        </div>
      </section>

      <section className="mt-16 ">
        <h2 className="mb-4 text-2xl font-semibold text-center">
          Recent Activity
        </h2>
        <div className="bg-gray-800 rounded-lg shadow-lg md:p-6">
          <ul className="p-2 divide-y divide-gray-700">
            <li className="flex justify-between py-3">
              <span>
                {todays_data.user_1.user_name} has booked{" "}
                {todays_data.user_1.slots_booked} hours
              </span>
              <time className="ml-1 text-sm text-gray-400 md:ml-0">
                2 hours ago
              </time>
            </li>
            <li className="flex justify-between py-3">
              <span>
                {todays_data.user_2.user_name} has booked{" "}
                {todays_data.user_2.slots_booked} hours
              </span>
              <time className="ml-1 text-sm text-gray-400 md:ml-0">
                5 hours ago
              </time>
            </li>
            <li className="flex justify-between py-3">
              <span>
                {todays_data.user_3.user_name} has booked{" "}
                {todays_data.user_3.slots_booked} hours
              </span>
              <time className="ml-1 text-sm text-gray-400 md:ml-0">
                1 day ago
              </time>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}
