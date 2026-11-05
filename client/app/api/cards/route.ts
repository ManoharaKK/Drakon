import { NextResponse } from "next/server";
import { cardsData } from "@/lib/cards";

export async function GET() {
  return NextResponse.json({
    cards: cardsData,
  });
}
