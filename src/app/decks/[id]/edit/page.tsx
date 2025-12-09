import EditCardsClient, {
  Flashcard,
} from "@/components/UI/CardEditor/edit-cards-client";
import { db } from "@/db";
import { decks, flashcards } from "@/db/schema";
import { eq } from "drizzle-orm";

type PageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ source?: string }>;
};

export default async function EditDeckPage({
  params,
  searchParams,
}: PageProps) {
  const { id } = await params;
  const { source } = await searchParams;
  const deckId = Number(id);

  const deckRows = await db.select().from(decks).where(eq(decks.id, deckId));
  const deck = deckRows[0];

  const cardRows = await db
    .select()
    .from(flashcards)
    .where(eq(flashcards.deckId, deckId));

  return (
    <EditCardsClient
      deckId={deckId}
      deckTitle={deck?.title ?? `Deck ${deckId}`}
      initialCards={cardRows as Flashcard[]}
       source={source}
    />
  );
}
