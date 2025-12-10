"use server";

import { db } from "@/db";
import { flashcards } from "@/db/schema";
import { eq } from "drizzle-orm";
import { updateTag } from "next/cache";
import z from "zod";

const UpdateCardSchema = z.object({
  id: z.number(),
  deckId: z.number(),
  frontText: z.string().trim().min(1, "Front text is required").max(250),
  backText: z.string().trim().min(1, "Back text is required").max(250),
});

export type UpdateCardResult = {
  updated?: any;
  errors?: Record<string, string[]>;
};

export default async function updateCard(input: {
  id: number;
  deckId: number;
  frontText: string;
  backText: string;
}) : Promise<UpdateCardResult> {

  const result = UpdateCardSchema.safeParse(input);

  if (!result.success) {
    const errors: Record<string, string[]> = {};

    for (const issue of result.error.issues) {
      const field = String(issue.path[0]);
      if (!errors[field]) errors[field] = [];
      errors[field].push(issue.message);
    }

    return { errors };
  }

  const { id, deckId, frontText, backText } = result.data;

  const updated = await db
    .update(flashcards)
    .set({ frontText, backText })
    .where(eq(flashcards.id, id))
    .returning();

  updateTag(`flashcards-${deckId}`);

  return { updated: updated[0] };
}
