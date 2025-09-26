import bookingSchema from "../../../../models/booking_schema";
import db from "../../../../utils/db";

/**
 * @route       GET /api/adminapi/
 * @description Retrieve all the bookings made by the user 
 * @access      admin
 * @author      Gam Marak
 * @created     2025-09-04
 * @returns     {Object} 200 - JSON object of the user
 *              {Object} 400 - Bad request
 */

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


