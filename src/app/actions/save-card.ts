"use server";

import { db } from "@/db";
import { flashcards } from "@/db/schema";
import { updateTag } from "next/cache";
import z from "zod";

type ActionState = {
  errors?: {
    title?: string[];
  } | null;
};

const CardInsertSchema = z.object({
  frontText: z
    .string()
    .trim()
    .min(1, "Min length must be more than 1")
    .max(250, "Name is too long, must be under 250"),
  backText: z
    .string()
    .trim()
    .min(1, "Min length must be more than 1")
    .max(250, "Name is too long, must be under 250"),
});

export type EventFormState = {
  errors?: Record<string, string[]>;
};

export default async function saveCard(prevState: ActionState,
  formData: FormData
): Promise<EventFormState | any> {
  const deckId = Number(formData.get("deckId"));
  const frontText = String(formData.get("frontText") ?? "");
  const backText = String(formData.get("backText") ?? "");
  const result = CardInsertSchema.safeParse({ frontText, backText });

  if (!result.success) {
    const errors: Record<string, string[]> = {};
    for (const issue of result.error.issues) {
      const field = String(issue.path[0]);
      if (!errors[field]) errors[field] = [];
      errors[field].push(issue.message);
    }
    return { errors };
  }

  const inserted = await db
    .insert(flashcards)
    .values({ deckId, frontText, backText })
    .returning();

  updateTag(`flashcards-${deckId}`);

  return inserted[0];
}
