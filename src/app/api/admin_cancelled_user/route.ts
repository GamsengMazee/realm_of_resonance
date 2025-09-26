import cancelledSchema from "../../../../models/cancelled_schema";
import db from "../../../../utils/db";

/**
 * @route       GET /api/admin_cancelled_user/
 * @description Retrieve all the bookings cancelled by user
 * @access      Public
 * @author      Gam Marak
 * @created     2025-09-04
 * @returns     {Object} 200 - JSON object of the user
 *              {Object} 400 - Bad Request
 */

export async function GET() {
  try {
    await db();
    const cancelled = await cancelledSchema.find();

    return new Response(JSON.stringify({ cancelled }), {
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


