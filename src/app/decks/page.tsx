import DeckCard from "@/components/deck-card";
import ActionButton from "@/components/action-button";
import { db } from "@/db";
import { decks, flashcards } from "@/db/schema";
import { eq, count } from "drizzle-orm";

export default async function DecksPage() {
  const deckWithCountRaw = await db
    .select({
      id: decks.id,
      title: decks.title,
      cardCount: count(flashcards.id),
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
    <div className="p-4">
      <h2 className="text-2xl font-bold text-center mb-12">
        Select a deck and tap it to begin training
      </h2>

      <div className="p-24 text-2xl flex-col justify-self-start space-y-2">
        {deckWithCount.map((deck) => (
          <DeckCard
            key={deck.id}
            deck={{ id: deck.id, name: deck.title }}
            count={deck.cardCount}
          />
        ))}
      </div>

      <div className="p-24 text-2xl flex flex-col items-start space-y-10">
        <ActionButton href="/decks/new" label="Create" />
      </div>
    </div>
  );
}
