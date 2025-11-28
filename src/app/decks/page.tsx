"use client";

import { useState } from "react";

export default function DecksPage() {
  const [decks, setDecks] = useState([
    { id: 1, name: "Deck 1", count: 88 },
    { id: 2, name: "Deck 2", count: 43 },
    { id: 3, name: "Deck 3", count: 23 },
    { id: 43, name: "Deck N", count: 43 },
  ]);

  const handleDelete = (id: number) => {
    setDecks(decks.filter((deck) => deck.id !== id));
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold text-gray-600 mb-4">Decks</h1>

      <h2 className="text-2xl font-bold text-center mb-12">
        Select a deck and tap it to begin training
      </h2>

      {/* Список колод */}
      <div className="p-20 text-2xl flex flex-col space-y-4">
        {decks.map((deck) => (
          <div key={deck.id} className="flex items-center space-x-2">
            <span>
              {deck.name} ({deck.count})
            </span>

            {/* ✏️ редактирование */}
            <button
              type="button"
              onClick={() => (window.location.href = `/decks/${deck.id}/edit`)}
              className="hover:text-green-600 transition-colors"
            >
              ✏️
            </button>

            {/* ❌ удаление */}
            <button
              type="button"
              onClick={() => handleDelete(deck.id)}
              className="hover:text-red-600 transition-colors"
            >
              ❌
            </button>
          </div>
        ))}
      </div>

      {/* Кнопка создания новой колоды */}
      <div className="p-20 text-2xl flex flex-col items-start space-y-10">
        <button
          type="button"
          onClick={() => (window.location.href = "/decks/new")}
          className="px-8 py-4 bg-sky-700/55 text-white text-xl font-semibold rounded-lg shadow-lg hover:bg-blue-500 transition"
        >
          Create
        </button>
      </div>
    </div>
  );
}
