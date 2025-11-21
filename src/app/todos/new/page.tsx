import createTodo from "@/app/actions/create-todo";
import { getServerSession } from "next-auth";

const CreateTodo = async () => {
  const session = await getServerSession();
  if (!session) return <div>Not signed in</div>;
  return (
    <div>
      <form action={createTodo}>
        <h2>Add todo</h2>
        <label htmlFor="title-input">Title</label>
        <input
          type="text"
          name="title"
          id="title-input"
          placeholder="Wash dishes"
        />

        <label htmlFor="description-input">Title</label>
        <input
          type="text"
          name="description"
          id="description-input"
          placeholder="It is really dirty...."
        />

        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default CreateTodo;
