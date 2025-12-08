"use server";

import { db } from "@/db";
import { flashcards } from "@/db/schema";
import { eq } from "drizzle-orm";

export default async function deleteCard(input: { id: number; deckId: number }) {
  const { id } = input;

  
  await db.delete(flashcards).where(eq(flashcards.id, id));
}
