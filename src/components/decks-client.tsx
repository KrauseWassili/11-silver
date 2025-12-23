"use client";

import { useState, useMemo } from "react";
import DeckCard from "@/components/deck-card";
import CreateButton from "@/components/create-button";
import SearchInput from "@/components/search-input";

type Deck = {
  id: number;
  title: string;
  userId: string;
  cardCount: number;
  source_type: "standard" | "user";
  isPublic: boolean;
};

interface DecksClientProps {
  decks: Deck[];
  currentUserId: string;
  publicIds: string[];
  role: string;
}

export default function DecksClient({
  decks,
  currentUserId,
  publicIds,
  role,
}: DecksClientProps) {
  const [filter, setFilter] = useState<
    "standard" | "public" | "mine" | "favorites"
  >("standard");

  const [search, setSearch] = useState("");

  const filteredDecks = useMemo(() => {
    let result = [...decks];

    if (filter === "standard") {
      result = decks.filter((d) => d.source_type === "standard");
    } else if (filter === "public") {
      result = decks.filter((d) => d.isPublic === true);
    } else if (filter === "mine") {
      result = decks.filter(
        (d) => d.source_type === "user" && d.userId === currentUserId
      );
    } else if (filter === "favorites") {
      result = [];
    }

    if (search.trim() !== "") {
      const s = search.toLowerCase();
      result = result.filter((d) => d.title.toLowerCase().includes(s));
    }

    return result;
  }, [filter, search, decks, currentUserId]);

  return (
    <div className="mb-24 min-h-screen px-4 py-8 mt-12">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
        Select a deck and tap it to begin training
      </h2>

      <div className="max-w-4xl mb-8 m-auto">
        <SearchInput onSearch={setSearch} />

        <div className="mb-4 flex justify-center gap-3">
          <button
            onClick={() => setFilter("standard")}
            className={`shadow-xl w-32 px-4 py-3 button-gray-rounded ${
              filter === "standard" ? "!bg-[var(--color-dark)]" : "text-white!"
            }`}
          >
            Standard
          </button>

          <button
            onClick={() => setFilter("public")}
            className={`shadow-xl w-32 px-4 py-3 button-gray-rounded ${
              filter === "public" ? "!bg-[var(--color-dark)]" : "text-white!"
            }`}
          >
            Public
          </button>

          <button
            onClick={() => setFilter("mine")}
            className={`shadow-xl w-32 px-4 py-3 button-gray-rounded ${
              filter === "mine" ? "!bg-[var(--color-dark)]" : "text-white!"
            }`}
          >
            My Decks
          </button>

          <button
            onClick={() => setFilter("favorites")}
            className={`shadow-xl w-32 px-4 py-3 button-gray-rounded ${
              filter === "favorites" ? "!bg-[var(--color-dark)]" : "text-white!"
            }`}
          >
            Favorites
          </button>
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
          <div className="button-gray-rounded shadow-xl rounded-lg">
            <CreateButton href="/decks/new" label="Create" />
          </div>
        </div>
      </div>
    </div>
  );
}
