"use server";
import { db } from "@/db";
import { todos } from "@/db/schema";
import { users } from "@/db/schema";
import { authOptions } from "@/lib/auth/auth-options";
import { eq } from "drizzle-orm";
import { getServerSession } from "next-auth";
import { updateTag } from "next/cache";
import z from "zod";

const insertTodoSchema = z.object({
  title: z.string().min(3, "Too short"),
  description: z.string().min(3, "Too short"),
});

export default async function createTodo(formData: FormData) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user.email) {
    throw Error("Unauthorized");
  }

  const user = await db.query.users.findFirst({
    where: eq(users.email, session.user.email!),
  });

  if (!user) {
    throw new Error("User not found");
  }

  const raw = Object.fromEntries(formData.entries());
  const todo = insertTodoSchema.parse(raw);
  await db.insert(todos).values({ ...todo, userId: user?.id });
  // revalidatePath("/todos");
  updateTag("todos");
}
