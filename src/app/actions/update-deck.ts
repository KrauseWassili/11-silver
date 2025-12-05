"use server";

import { db } from "@/db";
import { decks } from "@/db/schema";
import { eq } from "drizzle-orm";
import { updateTag } from "next/cache";

export default async function updateDeck(input: {
  id: number;
  title?: string;
}) {
  const { id, title } = input;

  const updated = await db
    .update(decks)
    .set({ ...(title && { title }) })
    .where(eq(decks.id, id))
    .returning();

  updateTag(`deck-${id}`);

  return updated[0];
}
