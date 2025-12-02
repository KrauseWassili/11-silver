"use client";

import { useFormState } from "react-dom";
import { createDeck } from "../actions/create-deck";

const initialState = {
  errors: null,
};

export default function NewDeckPage() {
  const [state, formAction] = useFormState(createDeck, initialState);

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <form action={formAction} className="flex flex-col gap-4 max-w-sm w-full">
      <div className="flex flex-col">
      <h1 className="text-2xl font-medium">Enter title for new deck</h1>
      <label htmlFor="title" className="flex justify-start">Title</label>

      <input
      id="title"
      name="title"
      type="text"
      placeholder="New title"
      className="border p-2"
      required
      />

      {state?.errors?.title && (
      <p className="text-red-500 text-sm">{state.errors.title[0]}</p>
      )}
      </div>

      <button type="submit" className="border p-2 bg-gray-100">
      Create
      </button>
      </form>
    </div>
  );
}
