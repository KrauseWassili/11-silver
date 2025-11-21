"use server";

import { db } from "@/db";
import { todos } from "@/db/schema";
import { eq } from "drizzle-orm";
import { updateTag } from "next/cache";

import { NextResponse } from "next/server";

export default async function deleteTodo(id: number) {
  const deletedTodo = await db
    .delete(todos)
    .where(eq(todos.id, id))
    .returning();
  if (!deletedTodo) return NextResponse.json({ error: "Not found" });
  // revalidatePath("/todos");
  updateTag("todos");
}
