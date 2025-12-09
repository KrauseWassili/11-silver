"use server";

import { z } from "zod";
import { db } from "@/db";
import { decks } from "@/db/schema";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/auth-options";

type ActionState = {
  errors?: {
    title?: string[];
  } | null;
};

const deckSchema = z.object({
  title: z
    .string()
    .nonempty("Complete the field")
    .min(2, "Minimum 2 symbols")
    .max(100, "Maximum 100 symbols"),
});

export async function createDeck(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState | never> {
  const parsed = deckSchema.safeParse({
    title: formData.get("title"),
  });

  if (!parsed.success) {
    const issues = parsed.error.issues;
    const fieldErrors: Record<string, string[]> = {};

    for (const err of issues) {
      const field = err.path[0] as string;
      if (!fieldErrors[field]) fieldErrors[field] = [];
      fieldErrors[field].push(err.message);
    }

    return { errors: fieldErrors };
  }

  const { title } = parsed.data;
  const session = await getServerSession(authOptions);
  if (!session) {
    // This should not happen as the form is only accessible to authenticated users
    redirect("/api/auth/signin");
  }
  if (session && session.user?.id) {
    const [newDeck] = await db
      .insert(decks)
      .values({
        title,
        userId: session.user.id,
      })
      .returning();

    redirect(`/decks/${newDeck.id}/edit?source=new`);
  }
  return { errors: null };
}
