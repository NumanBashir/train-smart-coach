import { NextRequest, NextResponse } from "next/server";
import Session from "@/models/Session";
import { connectToMONGO } from "@/utils/database";
import { auth } from "@/utils/auth";

// Create a new session
export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connectToMONGO();

    const body = await req.json();
    const { title, focus, notes, dateTime, drills, totalDuration } = body;

    // Validation
    if (!title || !focus) {
      return NextResponse.json(
        { message: "Title and focus are required" },
        { status: 400 }
      );
    }

    if (!drills || !Array.isArray(drills)) {
      return NextResponse.json(
        { message: "Drills must be an array" },
        { status: 400 }
      );
    }

    // Validate all durations are > 0
    const invalidDrill = drills.find(
      (d: any) => !d.duration || d.duration <= 0
    );
    if (invalidDrill) {
      return NextResponse.json(
        { message: "All drill durations must be greater than 0" },
        { status: 400 }
      );
    }

    const newSession = new Session({
      title,
      focus,
      notes: notes || "",
      dateTime: dateTime ? new Date(dateTime) : undefined,
      drills,
      totalDuration: totalDuration || 0,
      createdByUserId: session.user.id,
    });

    await newSession.save();

    // Log event (placeholder)
    console.log("event: session_created", { sessionId: newSession._id });

    const savedSession = (await Session.findById(newSession._id)
      .populate("drills.drillId")
      .lean()) as any;

    return NextResponse.json(
      {
        message: "Session created successfully",
        session: savedSession || newSession,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error creating session:", error);
    return NextResponse.json(
      { message: "Failed to create session", error: error.message },
      { status: 500 }
    );
  }
}

// Get all sessions for the current user
export async function GET(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connectToMONGO();

    const sessions = await Session.find({
      createdByUserId: session.user.id,
    })
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json(sessions, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching sessions:", error);
    return NextResponse.json(
      { message: "Failed to fetch sessions", error: error.message },
      { status: 500 }
    );
  }
}
