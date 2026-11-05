import { NextResponse } from "next/server";
import { workshopsData } from "@/lib/workshops";

export async function GET() {
  return NextResponse.json({ data: workshopsData });
}
