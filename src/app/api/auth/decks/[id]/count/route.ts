import { db } from "@/db";
import { flashcards } from "@/db/schema";
import { eq, count } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params; 

  const result = await db
    .select({ count: count(flashcards.id) })
    .from(flashcards)
    .where(eq(flashcards.deckId, Number(id))); 

  const cardCount = Number(result[0]?.count ?? 0);

  return NextResponse.json({ count: cardCount });
}