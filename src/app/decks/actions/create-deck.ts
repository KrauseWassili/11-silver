"use server";

import { z } from "zod";
import { db } from "@/db";
import { decks } from "@/db/schema";
import { redirect } from "next/navigation";


type ActionState = {
  errors?: {
    title?: string[];
  } | null;
};

const deckSchema = z.object({
  title: z.string().min(2, "Minimum 2 symbols").max(100, "Maximum 100 symbols"),
});

export async function createDeck(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState | never> {
  const parsed = deckSchema.safeParse({
    title: formData.get("title"),
  });

  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors };
  }

  const { title } = parsed.data;

  const [newDeck] = await db
    .insert(decks)
    .values({
      title,
      userId: 1,
    })
    .returning();

  redirect(`/decks/${newDeck.id}/edit`);
}
