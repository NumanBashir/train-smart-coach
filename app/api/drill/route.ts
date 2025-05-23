import Drill from "@/models/drill";
import { connectToDB } from "@/utils/db";
export const GET = async (request: any) => {
  try {
    await connectToDB();

    const drills = await Drill.find({});

    // Format the date to MM/dd/yyyy
    const formattedDrills = drills.map((drill) => {
      return {
        ...drill.toObject(),
      };
    });

    return new Response(JSON.stringify(formattedDrills), { status: 200 });
  } catch (error) {
    console.error("Error fetching drills:", error);
    return new Response("Failed to fetch all drills", { status: 500 });
  }
};
