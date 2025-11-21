"use client";

import deleteTodo from "@/app/actions/delete-todo";

interface Props {
  id: number;
}
export default function DeleteTodoBtn({ id }: Props) {
  return (
    <button type="button" onClick={() => deleteTodo(id)}>
      Delete
    </button>
  );
}
