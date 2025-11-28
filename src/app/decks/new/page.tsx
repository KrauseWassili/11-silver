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
    <div className="max-w-md mx-auto mt-16 p-6 bg-white/50 backdrop-blur rounded-lg shadow">
      <h1 className="text-2xl font-medium mb-6 text-gray-900">Enter title for new deck</h1>

      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <label className="block">
          <span data-testing="label-title" className="text-xl font-medium text-gray-700">Title</span>
          <input
            data-testing="input-title"
            type="text"
            placeholder="New title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (error) setError(null);
            }}
            aria-invalid={!!error}
            className={`mt-1 block w-full px-3 py-2 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors
              ${error ? "border-red-500 ring-red-200" : "border-gray-300"}`}
          />
        </label>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <div className="flex justify-evenly">
          <button
            data-testing="create-button"
            type="submit"
            className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
}
