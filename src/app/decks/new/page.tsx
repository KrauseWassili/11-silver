"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { z, ZodError } from "zod";

const schema = z.object({
  title: z.string().min(2, "Minimum 2 symbols").nonempty("Title is requeired"),
});

export default function NewDeckPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      schema.parse({ title });
      router.push("/cards/create_new");
    } catch (err) {
      if (err instanceof ZodError) {
        const first = err.issues[0];
        setError(first ? first.message : "Invalid input");
      } else {
        setError("An unexpected error occurred");
      }
    }
  };

  return (
    <div>
      <h1>Enter title for new deck</h1>

      <form onSubmit={handleSubmit} noValidate>
        <label>
          Title
          <input
            type="text"
            placeholder="New title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (error) setError(null);
            }}
          />
        </label>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button type="submit">Create</button>
      </form>
    </div>
  );
}
