import { DateTime } from "luxon";
import bookingSchema from "../../../../models/booking_schema";
import db from "../../../../utils/db";


// export async function GET() {
//   try {
//     await db();
//     const bookings = await bookingSchema.find();
//     return new Response(JSON.stringify({ bookings }), {
//       status: 200,
//       headers: { "Content-Type": "application/json" },
//     });
//   } catch (error) {
//     return new Response(JSON.stringify({ error: "Server Error" }), {
//       status: 400,
//       headers: { "Content-Type": "application/json" },
//     });
//   }
// }

export async function GET() {
  try {
    await db();

    const todayISO = DateTime.now().startOf("day").toISODate();

    const bookings = await bookingSchema.find({
      "slots.date": { $gte: todayISO },
    });

    return new Response(JSON.stringify({ bookings }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Booking fetch error:", error);
    return new Response(JSON.stringify({ error: "Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

//function for POST request
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, contact, address, token_id, slots } = body;

    console.log(name, email, contact, address, token_id, slots);

    // validation but email is optional
    if (!name || !contact || !address || !slots) {
      return new Response(JSON.stringify({ error: "Missing fields" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    await db();

    const dbData = await new bookingSchema({
      name,
      email,
      contact,
      address,
      token_id,
      slots,
    });
    const saved = await dbData.save();

    return new Response(
      JSON.stringify({
        success: true,
        data: { message: "data saved successfully", saved },
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: "Invalid JSON" + error }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
}
