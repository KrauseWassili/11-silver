"use server";

import { db } from "@/db";
import { flashcards } from "@/db/schema";
import { eq } from "drizzle-orm";
import { updateTag } from "next/cache";

export default async function updateCard(input: {
  id: number;
  deckId: number;
  frontText: string;
  backText: string;
}) {
  const { id, deckId, frontText, backText } = input;

  const updated = await db
    .update(flashcards)
    .set({ frontText, backText })
    .where(eq(flashcards.id, id))
    .returning();

  updateTag(`flashcards-${deckId}`);

  return updated[0];
}
