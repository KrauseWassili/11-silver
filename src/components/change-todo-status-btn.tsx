"use client";

import changeTodoStatus from "@/app/actions/change-todo-status";
import { Badge, BadgeCheck, RefreshCcw } from "lucide-react";
import { useTransition } from "react";

interface Todo {
  id: number;
  title: string;
  description: string;
  status: boolean | null;
  createdAt: Date | null;
  userId: number;
}
interface Props {
  todo: Todo;
}
export default function ChangeTodoStatusBtn({ todo }: Props) {
  const [isPending, startTransition] = useTransition();
  return (
    <button
      type="button"
      onClick={() =>
        startTransition(async () => {
          await new Promise((res) => setTimeout(res, 500));
          changeTodoStatus(todo.id);
        })
      }
    >
      {isPending ? <RefreshCcw /> : todo.status ? <BadgeCheck /> : <Badge />}
    </button>
  );
}
