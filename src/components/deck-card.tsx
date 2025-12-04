"use client";

import { useState } from "react";
import deleteDeck from "@/app/decks/actions/delete-deck";
import { TrashIcon, PencilIcon } from "@heroicons/react/20/solid";
import { useRouter } from "next/navigation";
import ConfirmDialog from "./confirm-dialog";

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
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="flex items-center justify-between p-4 border rounded-lg shadow-sm">
        <div
          className="text-2xl font-bold text-gray-800 cursor-pointer"
          onClick={() => router.push(`/decks/${deck.id}`)}
        >
          {deck.name} <span className="text-2xl text-gray-700">({count})</span>
        </div>

        <div className="flex items-center space-x-6">
          <button
            type="button"
            onClick={() => router.push(`/decks/${deck.id}/edit`)}
            aria-label="Edit deck"
            
          >
            <PencilIcon className="h-8 w-8 text-amber-400 hover:text-amber-700 transition-colors" />
          </button>

          <button
            type="button"
            aria-label="Delete deck"
            onClick={() => setOpen(true)}
            
          >
            <TrashIcon className="h-8 w-8 text-red-600 hover:text-red-300 transition-colors" />
          </button>
        </div>
      </div>

      {open && (
        <ConfirmDialog
          message="Are you sure you want to delete this deck?"
          onConfirm={async () => {
            await deleteDeck(deck.id);
            setOpen(false);
            router.refresh();
          }}
          onCancel={() => setOpen(false)}
        />
      )}
    </>
  );
}
