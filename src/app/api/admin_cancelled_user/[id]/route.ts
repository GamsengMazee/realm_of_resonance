import { NextResponse } from "next/server";
import db from "../../../../../utils/db";
import cancelledSchema from "../../../../../models/cancelled_schema";



export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
 
  const { id } = await params;
  try {
    await db(); // Ensure DB is connected

    const deletedBooking = await cancelledSchema.findByIdAndDelete({_id: id});

    if (!deletedBooking) {
      return NextResponse.json(
        { message: "Booking not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Booking deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json(
      { message: "Server error", error },
      { status: 500 }
    );
  }
}