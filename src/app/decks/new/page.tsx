"use client";

import { createDeck } from "../../actions/create-deck";
import { useActionState } from "react";

const initialState = {
  errors: null,
};

export default function NewDeckPage() {
  const [state, formAction] = useActionState(createDeck, initialState);

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <form action={formAction} noValidate className="flex flex-col gap-4 max-w-sm w-full">
      <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-medium">Enter title for new deck</h1>
      
      <input
      id="title"
      name="title"
      type="text"
      placeholder="New title"
      className="border p-2"
      />

      {state?.errors?.title && (
      <p className="text-red-600 text-sm">{state.errors.title[0]}</p>
      )}
      </div>

      <button type="submit" className="border p-2 bg-gray-100">
      Create
      </button>
      </form>
    </div>
  );
}
