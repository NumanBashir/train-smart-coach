import Drill from "@/models/drill";
import { connectToDB } from "@/utils/db";

export const POST = async (req: Request) => {
  const { name, description } = await req.json();

  try {
    await connectToDB();
    const newDrill = new Drill({
      name,
      description,
    });
    await newDrill.save();
    return new Response(JSON.stringify(newDrill), { status: 201 });
  } catch (error) {
    console.error("Error creating drill:", error);
    return new Response("Failed to create drill", { status: 500 });
  }
};
