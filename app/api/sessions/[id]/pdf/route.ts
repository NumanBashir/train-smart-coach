import { NextRequest, NextResponse } from "next/server";
import Session from "@/models/Session";
import { connectToMONGO } from "@/utils/database";
import { auth } from "@/utils/auth";

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

    // Placeholder PDF generation - return HTML for now
    // TODO: Implement actual PDF generation (e.g., using puppeteer, pdfkit, etc.)
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>${sessionDoc.title}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h1 { color: #2B4A11; }
            .session-info { margin-bottom: 20px; }
            .drill-item { margin: 10px 0; padding: 10px; border-left: 3px solid #407734; }
          </style>
        </head>
        <body>
          <h1>${sessionDoc.title}</h1>
          <div class="session-info">
            <p><strong>Focus:</strong> ${sessionDoc.focus}</p>
            <p><strong>Total Duration:</strong> ${
              sessionDoc.totalDuration
            } minutes</p>
            ${
              sessionDoc.notes
                ? `<p><strong>Notes:</strong> ${sessionDoc.notes}</p>`
                : ""
            }
          </div>
          <h2>Drills</h2>
          ${sessionDoc.drills
            .sort((a: any, b: any) => a.order - b.order)
            .map(
              (drill: any, index: number) => `
            <div class="drill-item">
              <p><strong>${index + 1}. ${
                drill.drillId?.title || "Drill"
              }</strong></p>
              <p>Duration: ${drill.duration} minutes</p>
            </div>
          `
            )
            .join("")}
        </body>
      </html>
    `;

    return new NextResponse(htmlContent, {
      status: 200,
      headers: {
        "Content-Type": "text/html",
      },
    });
  } catch (error: any) {
    console.error("Error generating PDF:", error);
    return NextResponse.json(
      { message: "Failed to generate PDF", error: error.message },
      { status: 500 }
    );
  }
}
