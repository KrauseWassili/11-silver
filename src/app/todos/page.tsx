import ChangeTodoStatusBtn from "@/components/change-todo-status-btn";
import DeleteTodoBtn from "@/components/delete-todo-btn";
import { db } from "@/db";
import { todos } from "@/db/schema";
import { authOptions } from "@/lib/auth/auth-options";
import { asc, eq } from "drizzle-orm";
import { getServerSession } from "next-auth";
import { cacheTag } from "next/cache";

async function getTodosByUserId(userId: number) {
  "use cache";
  cacheTag("todos");
  return db.query.todos.findMany({
    where: eq(todos.userId, userId),
    orderBy: asc(todos.createdAt),
  });
}

const TodosPage = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw Error("Unauthorized");
  }

  if (!session.user.id) {
    throw new Error("User not found");
  }
  const personalTodos = await getTodosByUserId(session.user.id);

  return (
    <div>
      <ul>
        {personalTodos.map((todo) => (
          <li key={todo.id}>
            {todo.title}

            <ChangeTodoStatusBtn todo={todo} />
            <DeleteTodoBtn id={todo.id} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodosPage;
