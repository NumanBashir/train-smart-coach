import { NextRequest, NextResponse } from "next/server";
import Drill from "@/models/drill";
import { connectToDB } from "@/utils/db";
import mongoose from "mongoose";

// GET by id
export async function GET(
  _req: NextRequest,
  props: { params: Promise<{ id: string }> }
) {
  const params = await props.params;
  if (!mongoose.Types.ObjectId.isValid(params.id)) {
    return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
  }

  const { id } = await params;
  await connectToDB();
  const drill = await Drill.findById(params.id).lean();

  if (!drill) {
    return NextResponse.json({ message: "Drill not found" }, { status: 404 });
  }

  return NextResponse.json(drill, { status: 200 });
}

// UPDATE by id
export async function PATCH(
  req: NextRequest,
  props: { params: Promise<{ id: string }> }
) {
  const params = await props.params;
  if (!mongoose.Types.ObjectId.isValid(params.id)) {
    return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
  }

  const body = await req.json();

  await connectToDB();
  const updated = await Drill.findByIdAndUpdate(params.id, body, {
    new: true,
    runValidators: true,
  });

  if (!updated) {
    return NextResponse.json({ message: "Drill not found" }, { status: 404 });
  }

  return NextResponse.json(updated, { status: 200 });
}

// DELETE by id
export async function DELETE(
  _req: NextRequest,
  props: { params: Promise<{ id: string }> }
) {
  const params = await props.params;
  if (!mongoose.Types.ObjectId.isValid(params.id)) {
    return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
  }

  await connectToDB();
  const removed = await Drill.findByIdAndDelete(params.id);

  if (!removed) {
    return NextResponse.json({ message: "Drill not found" }, { status: 404 });
  }

  return NextResponse.json({ message: "Drill deleted" }, { status: 200 });
}
