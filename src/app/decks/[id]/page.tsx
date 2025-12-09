import { FlashcardSlider } from "@/components/UI/FlashcardSlider/flashcard-slider";
import { db } from "@/db";
import { decks, flashcards, users } from "@/db/schema";
import { getCurrentUser } from "@/lib/current-user";
import { eq } from "drizzle-orm";
import Link from "next/link";

export default async function DeckPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const numericId = Number(id);

  const currentUser = await getCurrentUser();
  const userRole = currentUser?.role ?? "guest";
  const userId = currentUser?.id ?? null;

  const deckResult = await db
    .select({
      id: decks.id,
      title: decks.title,
      ownerId: decks.userId,
      ownerRole: users.role,
    })
    .from(decks)
    .leftJoin(users, eq(users.id, decks.userId))
    .where(eq(decks.id, numericId))
    .limit(1);

  if (deckResult.length === 0) {
    return <p className="mt-10 text-center">Deck not found.</p>;
  }

  const deck = deckResult[0];

  const isCustomer = userRole === "customer";
  const isAdmin = userRole === "administrator";
  const deckOwnedByAdmin = deck.ownerRole === "administrator";

  const canManage =
    (isCustomer && !deckOwnedByAdmin) ||
    (isAdmin && userId !== null && deck.ownerId === userId);

  const cards = await db
    .select({
      id: flashcards.id,
      frontText: flashcards.frontText,
      backText: flashcards.backText,
    })
    .from(flashcards)
    .where(eq(flashcards.deckId, numericId));

  return (
    <div className="min-h-screen flex flex-col items-center p-8 gap-8 mt-12">
      <div className="w-full max-w-3xl flex items-center justify-between">
        <div className="w-24" />
        <h1 className="text-3xl font-bold text-center flex-1">{deck.title}</h1>
        <div className="w-24 text-right text-sm">
          Total: {cards.length} cards
        </div>
      </div>
      <section className="w-full max-w-3xl flex flex-col items-center gap-6">
        <FlashcardSlider cards={cards} />
        {canManage && (
          <Link
            href={`/decks/${numericId}/edit?source=/decks/${numericId}`}
            className="mt-4 px-6 py-2 rounded-md bg-mid-dark text-white hover:bg-dark transition"
          >
            Edit Deck
          </Link>
        )}
      </section>
    </div>
  );
}
