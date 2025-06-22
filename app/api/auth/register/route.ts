import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user";
import { connectToDB } from "@/utils/db";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();
  await connectToDB();
  const existing = await User.findOne({ email });
  if (existing) {
    return NextResponse.json({ message: "User already exists" }, { status: 400 });
  }
  const user = new User({ email, password });
  await user.save();
  return NextResponse.json({ message: "User created" }, { status: 201 });
}
