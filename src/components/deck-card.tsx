"use client";

import { useRouter } from "next/navigation";

interface Deck {
  id: number;
  name: string;
}

export default function DeckCard({
  deck,
  count,
}: {
  deck: Deck;
  count: number;
}) {
  const router = useRouter();

  return (
    <div className="flex items-center justify-between p-4 border rounded-lg shadow-sm hover:shadow-md transition">
      <div
        className="text-lg font-bold text-gray-700 cursor-pointer"
        onClick={() => router.push(`/decks/${deck.id}`)}
      >
        {deck.name} <span className="text-lg text-gray-700">({count})</span>
      </div>

      <div className="flex items-center space-x-7">
        {/* <button
          type="button"
          onClick={() => router.push(`/decks/${deck.id}/edit`)}
          aria-label="Edit deck"
        >
          ✏️
        </button> */}
        <button
          type="button"
          onClick={() => router.push(`/decks/${deck.id}/delete`)}
          aria-label="Delete deck"
        >
          ❌
        </button>
      </div>
    </div>
  );
}
