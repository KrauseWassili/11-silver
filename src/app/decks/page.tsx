import { db } from "@/db";
import { decks, flashcards, users } from "@/db/schema";
import { eq, count } from "drizzle-orm";
import { getServerSession } from "next-auth";
import DecksClient from "../../components/decks-client";

export default async function DecksPage() {
  const session = await getServerSession();
  const role = session?.user?.role ?? "administrator";
  let userId = session?.user?.id ? String(session.user.id) : null;

  if (!userId && session?.user?.name) {
    const user = await db
      .select({ id: users.id })
      .from(users)
      .where(eq(users.name, session.user.name))
      .limit(1);

    if (user.length > 0) {
      userId = String(user[0].id);
    }
  }

  const publicDecks = await db
    .select({ id: users.id })
    .from(users)
    .where(eq(users.role, "administrator"));

  const publicIds = publicDecks.map((p) => String(p.id));

  const deckWithCountRaw = await db
    .select({
      id: decks.id,
      title: decks.title,
      userId: decks.userId,
      source_type: decks.sourceType,
      isPublic: decks.isPublic,
      cardCount: count(flashcards.id).as("cardCount"),
    })
    .from(decks)
    .leftJoin(flashcards, eq(flashcards.deckId, decks.id))
    .groupBy(decks.id, decks.title, decks.userId)
    .orderBy(decks.id);

  const decksData = deckWithCountRaw.map((d) => ({
    id: Number(d.id),
    title: d.title,
    userId: String(d.userId),
    cardCount: Number(d.cardCount ?? 0),
    source_type: d.source_type,
    isPublic: Boolean(d.isPublic),
  }));

  return (
    <DecksClient
      decks={decksData}
      currentUserId={userId ?? ""}
      publicIds={publicIds}
      role={role}
    />
  );
}
