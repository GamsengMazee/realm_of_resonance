import bookingSchema from "../../../../models/booking_schema";
import db from "../../../../utils/db";

export async function GET() {
  try {
    await db();
    const bookings = await bookingSchema.find();

    return new Response(JSON.stringify({ bookings }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
}


