import cancelledSchema from "../../../../models/cancelled_schema";
import db from "../../../../utils/db";

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


