
import { FlashcardSlider } from "@/components/UI/FlashcardSlider";
import { db } from "@/db";
import { decks, flashcards } from "@/db/schema";
import { eq } from "drizzle-orm";
import Link from "next/link";

export default async function DeckPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const numericId = Number(id);

  const deckResult = await db
    .select({
      id: decks.id,
      title: decks.title,
    })
    .from(decks)
    .where(eq(decks.id, numericId))
    .limit(1);

  if (deckResult.length === 0) {
    return (
      <p className="mt-10 text-center">
        Колода не найдена
      </p>
    );
  }

  const deck = deckResult[0];

  const cards = await db
    .select({
      id: flashcards.id,
      frontText: flashcards.frontText,
      backText: flashcards.backText,
    })
    .from(flashcards)
    .where(eq(flashcards.deckId, numericId));

  return (
    <div className="min-h-screen flex flex-col items-center p-8 gap-8">
      <header className="w-full max-w-3xl flex items-center justify-between">
        <div className="w-24" />
        <h1 className="text-2xl font-semibold text-center flex-1">
          {deck.title}
        </h1>
        <div className="w-24 text-right text-sm">
          Total: {cards.length} cards
        </div>
      </header>
      <main className="w-full max-w-3xl flex flex-col items-center gap-6">
        <FlashcardSlider cards={cards} />
        <button
          type="button"
        >
          <Link href={`/decks/${numericId}/edit`} 
          className="mt-4 px-6 py-2"
          >Edit Deck</Link>
        </button>
      </main>
    </div>
  );
}