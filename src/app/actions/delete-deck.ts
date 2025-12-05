"use server";

import { db } from "@/db";
import { decks, flashcards } from "@/db/schema";
import { eq } from "drizzle-orm";

export default async function deleteDeck(deckId: number) {
  await db.delete(flashcards).where(eq(flashcards.deckId, deckId));
  await db.delete(decks).where(eq(decks.id, deckId));
}
