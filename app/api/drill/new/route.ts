import { NextRequest, NextResponse } from "next/server";
import Drill from "@/models/drill";
import { connectToDB } from "@/utils/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    await connectToDB();

    const drill = new Drill(body); // mongoose validation kicks in
    await drill.save();

    return NextResponse.json(drill, { status: 201 });
  } catch (err: any) {
    console.error("Error creating drill:", err);
    return NextResponse.json(
      { message: err.message || "Failed to create drill" },
      { status: 500 }
    );
  }
}
