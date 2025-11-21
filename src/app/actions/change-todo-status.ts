"use server";

import { db } from "@/db";
import { todos } from "@/db/schema";
import { eq, sql } from "drizzle-orm";
import { updateTag } from "next/cache";

export default async function changeTodoStatus(id: number) {
  const updatedTodo = await db
    .update(todos)
    .set({ status: sql`NOT status` })
    .where(eq(todos.id, id))
    .returning();
  updateTag("todos");
  return updatedTodo[0];
}
