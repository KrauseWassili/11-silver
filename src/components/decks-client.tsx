"use client";

import { useState } from "react";
import DeckCard from "@/components/deck-card";
import CreateButton from "@/components/create-button";

type Deck = {
  id: number;
  title: string;
  userId: string;
  cardCount: number;
};

interface DecksClientProps {
  decks: Deck[];
  currentUserId: string;
  adminIds: string[];
  role: string;
}

export default function DecksClient({
  decks,
  currentUserId,
  adminIds,
  role,
}: DecksClientProps) {
  const [filter, setFilter] = useState<"mine" | "admin" | "all">("mine");

  let filteredDecks: Deck[];
  if (filter === "mine") {
    filteredDecks = currentUserId
      ? decks.filter((d) => d.userId === currentUserId)
      : [];
  } else if (filter === "admin") {
    filteredDecks = decks.filter((d) => adminIds.includes(d.userId));
  } else {
    filteredDecks = decks; // "all"
  }

  return (
    <div className="mb-24 min-h-screen px-4 py-8 mt-12">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
        Select a deck and tap it to begin training
      </h2>

      <div className="max-w-4xl mb-8 m-auto">
        <div className="mb-4 flex justify-center gap-3">
          <button
            onClick={() => setFilter("mine")}
            className={`shadow-xl w-32 px-4 py-3 rounded ${
              filter === "mine" ? "bg-gray-800!" : "text-white!"
            }`}
          >
            My Decks
          </button>
          <button
            onClick={() => setFilter("admin")}
            className={`shadow-xl w-32 px-4 py-3 rounded ${
              filter === "admin" ? "bg-gray-800!" : "text-white!"
            }`}
          >
            Admin Decks
          </button>
          {role === "administrator" && (
            <button
              onClick={() => setFilter("all")}
              className={`shadow-xl w-32 px-4 py-3 rounded ${
                filter === "all" ? "bg-gray-800!" : "text-white!"
              }`}
            >
              All Decks
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-3">
          {filteredDecks.map((deck) => (
            <div key={deck.id}>
              <DeckCard
                deck={{ id: deck.id, name: deck.title }}
                count={deck.cardCount}
              />
            </div>
          ))}
        </div>

        <div className="mt-3 flex justify-end">
          <div className="shadow-xl rounded-lg">
            <CreateButton href="/decks/new" label="Create" />
          </div>
        </div>
      </div>
    </div>
  );
}
