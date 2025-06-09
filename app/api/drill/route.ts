import { NextRequest, NextResponse } from "next/server";
import Drill from "@/models/drill";
import { connectToDB } from "@/utils/db";

export async function GET(_req: NextRequest) {
  try {
    await connectToDB();

    // lean() = plain JS objects (faster, smaller)
    const drills = await Drill.find().lean();

    const formatted = drills.map((d) => ({
      ...d,
    }));

    return NextResponse.json(formatted, { status: 200 });
  } catch (err: any) {
    console.error("Error fetching drills:", err);
    return NextResponse.json(
      { message: "Failed to fetch drills" },
      { status: 500 }
    );
  }
}
