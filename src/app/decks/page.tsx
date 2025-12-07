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
    <div className="min-h-screen px-4 py-8 ">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 ">
        Select a deck and tap it to begin training
      </h2>

      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-3">
          {deckWithCount.map((deck) => (
            <div key={deck.id}>
              <DeckCard
                deck={{ id: deck.id, name: deck.title }}
                count={deck.cardCount}
              />
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-end">
          <div className="shadow-lg rounded-lg ">
            <CreateButton href="/decks/new" label="Create" />
          </div>
        </div>
      </div>
    </div>
  );
}
