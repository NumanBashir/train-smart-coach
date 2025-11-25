import { NextRequest, NextResponse } from "next/server";
import Session from "@/models/Session";
import { connectToMONGO } from "@/utils/database";
import { auth } from "@/utils/auth";

// Get a single session by id
export async function GET(
  req: NextRequest,
  props: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connectToMONGO();

    const { id } = await props.params;
    const sessionDoc = (await Session.findById(id)
      .populate("drills.drillId")
      .lean()) as any;

    if (!sessionDoc) {
      return NextResponse.json(
        { message: "Session not found" },
        { status: 404 }
      );
    }

    // Check ownership
    if (sessionDoc.createdByUserId.toString() !== session.user.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
    }

    return NextResponse.json(sessionDoc, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching session:", error);
    return NextResponse.json(
      { message: "Failed to fetch session", error: error.message },
      { status: 500 }
    );
  }
}

// Update a session by id
export async function PUT(
  req: NextRequest,
  props: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connectToMONGO();

    const { id } = await props.params;
    const sessionDoc = await Session.findById(id);

    if (!sessionDoc) {
      return NextResponse.json(
        { message: "Session not found" },
        { status: 404 }
      );
    }

    // Check ownership
    if (sessionDoc.createdByUserId.toString() !== session.user.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
    }

    const body = await req.json();
    const { title, focus, notes, dateTime, drills, totalDuration } = body;

    // Validation
    if (title !== undefined) sessionDoc.title = title;
    if (focus !== undefined) sessionDoc.focus = focus;
    if (notes !== undefined) sessionDoc.notes = notes;
    if (dateTime !== undefined)
      sessionDoc.dateTime = dateTime ? new Date(dateTime) : undefined;
    if (drills !== undefined) {
      if (!Array.isArray(drills)) {
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
      sessionDoc.drills = drills;
    }
    if (totalDuration !== undefined) sessionDoc.totalDuration = totalDuration;

    await sessionDoc.save();

    const updatedSession = await Session.findById(id)
      .populate("drills.drillId")
      .lean();

    return NextResponse.json(
      {
        message: "Session updated successfully",
        session: updatedSession || sessionDoc,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error updating session:", error);
    return NextResponse.json(
      { message: "Failed to update session", error: error.message },
      { status: 500 }
    );
  }
}

// Delete a session by id
export async function DELETE(
  req: NextRequest,
  props: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connectToMONGO();

    const { id } = await props.params;
    const sessionDoc = await Session.findById(id);

    if (!sessionDoc) {
      return NextResponse.json(
        { message: "Session not found" },
        { status: 404 }
      );
    }

    // Check ownership
    if (sessionDoc.createdByUserId.toString() !== session.user.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
    }

    await Session.findByIdAndDelete(id);

    return NextResponse.json(
      { message: "Session deleted successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error deleting session:", error);
    return NextResponse.json(
      { message: "Failed to delete session", error: error.message },
      { status: 500 }
    );
  }
}
