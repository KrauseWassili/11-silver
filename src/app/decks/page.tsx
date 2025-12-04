import DeckCard from "@/components/deck-card";
import { db } from "@/db";
import { decks, flashcards } from "@/db/schema";
import { eq, count } from "drizzle-orm";
import CreateButton from "@/components/create-button";

export default async function DecksPage() {
  const deckWithCountRaw = await db
    .select({
      id: decks.id,
      title: decks.title,
      cardCount: count(flashcards.id).as("cardCount"),
    })
    .from(decks)
    .leftJoin(flashcards, eq(flashcards.deckId, decks.id))
    .groupBy(decks.id, decks.title)
    .orderBy(decks.id);

  const deckWithCount = deckWithCountRaw.map((d) => ({
    id: d.id,
    title: d.title,
    cardCount: Number(d.cardCount ?? 0),
  }));

  return (
    <div className="p-8 bg-(--color-bg) text-(--color-text)">
      <h2 className="text-4xl font-bold text-center mb-2 text-(--color-primary)">
        Select a deck and tap it to begin training
      </h2>

      <div className="p-20 text-2xl flex-col justify-center space-y-1">
        {deckWithCount.map((deck) => (
          <div
            key={deck.id}
            className="shadow-lg rounded-xl bg-(--color-bg-secondary) text-(--color-text) 
                 transition-transform duration-250 hover:scale-101 hover:shadow-xl  
                 border border-(--color-mid)"
          >
            <DeckCard
              deck={{ id: deck.id, name: deck.title }}
              count={deck.cardCount}
            />
          </div>
        ))}
      </div>

      <div className="px-24  flex justify-end space-y-10">
        <div
          className="shadow-lg rounded-lg bg-(--color-primary) 
               hover:bg-(--color-primary-hover) transition"
        >
          <CreateButton href="/decks/new" label="Create" />
        </div>
      </div>
    </div>
  );
}
