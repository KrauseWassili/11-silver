"use server";

import { db } from "@/db";
import { decks } from "@/db/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";

export type ActionState = {
  errors?: {
    title?: string[];
  } | null;
  updatedTitle?: string;
};

const deckSchema = z.object({
  title: z
    .string()
    .min(2, "Minimum 2 symbols")
    .max(100, "Maximum 100 symbols"),
});

export default async function updateDeckTitle(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const deckId = Number(formData.get("deckId"));
  const title = String(formData.get("title") || "");

  const result = deckSchema.safeParse({ title });

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  await db
    .update(decks)
    .set({ title: result.data.title })
    .where(eq(decks.id, deckId));
 
  return {
    errors: null,
    updatedTitle: result.data.title,
  };
}
