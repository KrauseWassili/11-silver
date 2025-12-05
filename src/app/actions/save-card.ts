"use server";

import { db } from "@/db";
import { flashcards } from "@/db/schema";
import { updateTag } from "next/cache";

export default async function saveCard(input: {
  deckId: number;
  frontText: string;
  backText: string;
}) {
  const { deckId, frontText, backText } = input;

  const inserted = await db
    .insert(flashcards)
    .values({ deckId, frontText, backText })
    .returning();

  updateTag(`flashcards-${deckId}`);

  return inserted[0];
}
