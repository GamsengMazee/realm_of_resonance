import bookingSchema from "../../../../models/booking_schema";
import db from "../../../../utils/db";

export async function POST(request: Request) {
  
  // Parse the request body
  const body = await request.json();
  const { token_id } = body;

  // Check for missing fields and return a response if any are missing
  if (!token_id) {
    return new Response(
      JSON.stringify({ message: "Require token id" }),
      {
        status: 400, // Bad request
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  // Connect to the database
  await db();

  try {
    // Find user in the database
    const user = await bookingSchema.findOne({ token_id });

    if (!user) {
      // If user is not found
      return new Response(
        JSON.stringify({ message: "User not found" }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    if(user) {
      return new Response(
        JSON.stringify({user }),
        {
          status: 200, // OK status
          headers: { "Content-Type": "application/json" },
        }
      );
    } else {
    //   if user doesn't exist
      return new Response(
        JSON.stringify({ message: "User not found" }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  } catch (error) {
    // Catch any unexpected errors
    console.error(error);
    return new Response(
      JSON.stringify({ message: "An error occurred during search" }),
      {
        status: 500, // Internal server error
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
