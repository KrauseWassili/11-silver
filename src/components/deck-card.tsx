"use client";

import { useState } from "react";
import deleteDeck from "@/app/actions/delete-deck";
import { useRouter } from "next/navigation";
import ConfirmDialog from "./confirm-dialog";
import { TrashIcon } from "@heroicons/react/24/outline";
import { PencilIcon } from "@heroicons/react/24/outline";

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
      <div
        className={
          `bg-[var(--color-bg-secondary)] text-[var(--color-text)] border border-[var(--color-mid)] rounded-xl shadow-lg ` +
          `flex flex-col md:flex-row items-start md:items-center justify-between p-4 md:p-5 gap-3 md:gap-0 transition-transform duration-200 ` +
          `md:hover:shadow-xl md:hover:translate-y-0.5`
        }
      >
        <div
          className="flex-1 w-full md:w-auto-content cursor-pointer"
          onClick={() => router.push(`/decks/${deck.id}`)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter") router.push(`/decks/${deck.id}`);
          }}
        >
          <h3 className="text-sm md:text-xl font-semibold leading-tight truncate">
            {deck.name}
          </h3>
          <p className="text-xs md:text-sm text-gray-500 mt-1">
            {count} card{count === 1 ? "" : "s"}
          </p>
        </div>

        <div className="flex items-center space-x-3 mt-2 md:mt-0">
          <button
            type="button"
            onClick={() => router.push(`/decks/${deck.id}/edit?source=/decks`)}
            aria-label={`Edit ${deck.name}`}
            className="p-2 md:p-1 rounded focus:outline-none focus-visible:ring-2"
          >
            <PencilIcon className="h-4 w-4 md:h-6 md:w-6 text-blue-500" />
          </button>

          <button
            type="button"
            aria-label={`Delete ${deck.name}`}
            onClick={() => setOpen(true)}
            className="p-2 md:p-1 rounded focus:outline-none focus-visible:ring-2"
          >
            <TrashIcon className="h-4 w-4 md:h-6 md:w-6 text-red-600" />
          </button>
        </div>
      </div>

      {open && (
        <ConfirmDialog
          message={`Delete this deck "${deck.name}"?`}
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
