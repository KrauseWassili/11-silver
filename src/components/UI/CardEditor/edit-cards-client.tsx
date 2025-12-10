"use client";

import { useActionState, useEffect, useState } from "react";
import CardRow from "./card-row";
import updateCard from "@/app/actions/update-card";
import saveCard from "@/app/actions/save-card";
import deleteCard from "@/app/actions/delete-card";
import ConfirmDialog from "../../confirm-dialog";
import { useRouter } from "next/navigation";
import updateDeckTitle from "@/app/actions/update-deck-title";

export type Flashcard = {
  id: number;
  deckId: number;
  frontText: string;
  backText: string;
};

type Props = {
  deckId: number;
  deckTitle: string;
  initialCards: Flashcard[];
  source?: string;
};

export default function EditCardsClient({
  deckId,
  deckTitle,
  initialCards,
  source,
}: Props) {
  const [cards, setCards] = useState<Flashcard[]>(initialCards);

  const [newFront, setNewFront] = useState("");
  const [newBack, setNewBack] = useState("");

  const [editingCardId, setEditingCardId] = useState<number | null>(null);
  const [editingFront, setEditingFront] = useState("");
  const [editingBack, setEditingBack] = useState("");

  const [cardToDelete, setCardToDelete] = useState<Flashcard | null>(null);

  const [state, formAction, isPending] = useActionState(saveCard, {
    errors: {},
  });

  const [editErrors, setEditErrors] = useState<Record<string, string[]>>({});

  const [isEditingDeckTitle, setIsEditingDeckTitle] = useState(false);
  const [editingDeckTitle, setEditingDeckTitle] = useState(deckTitle);
  const [titleState, titleFormAction, isTitlePending] = useActionState(
    updateDeckTitle,
    { errors: null }
  );

  useEffect(() => {
    if (titleState?.updatedTitle) {
      setEditingDeckTitle(titleState.updatedTitle);
      setIsEditingDeckTitle(false);
    }
  }, [titleState]);

  useEffect(() => {
    if (state && !state.errors && state.id) {
      setCards((prev) => [...prev, state]);
      setNewFront("");
      setNewBack("");
    }
  }, [state]);

  const startEditCard = (card: Flashcard) => {
    setEditingCardId(card.id);
    setEditingFront(card.frontText);
    setEditingBack(card.backText);
  };

  const handleSaveEditedCard = async () => {
    if (editingCardId === null) return;

    const result = await updateCard({
      id: editingCardId,
      deckId,
      frontText: editingFront,
      backText: editingBack,
    });

    if (result.errors) {
      setEditErrors(result.errors);
      return;
    }

    setCards((prev) =>
      prev.map((c) => (c.id === result.updated.id ? result.updated : c))
    );

    setEditingCardId(null);
    setEditingFront("");
    setEditingBack("");
    setEditErrors({});
  };

  const handleDeleteCard = async () => {
    if (!cardToDelete) return;

    await deleteCard({
      id: cardToDelete.id,
      deckId,
    });

    setCards((prev) => prev.filter((c) => c.id !== cardToDelete.id));
    setCardToDelete(null);
  };

  const router = useRouter();
  const BACK_URL = source || "/decks";
  return (
    <div className="p-24">
      <div className="mb-5 text-center">
        <div className="inline-block">
          <div className="relative flex items-center justify-center min-h-[56px] px-10">
            {isEditingDeckTitle ? (
              <form
                action={titleFormAction}
                className="flex items-center"
                style={{ width: "100%" }}
              >
                <input type="hidden" name="deckId" value={deckId} />
                <input
                  className="border rounded p-2 mr-4 text-2xl text-center min-w-[400px]"
                  name="title"
                  value={editingDeckTitle}
                  onChange={(e) => setEditingDeckTitle(e.target.value)}
                  autoFocus
                />
                <button
                  type="submit"
                  disabled={isTitlePending}
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-2xl"
                >
                  ✔
                </button>
              </form>
            ) : (
              <>
                <h1 className="text-3xl mr-4 font-bold text-darkest min-w-[400px]">
                  {editingDeckTitle}
                </h1>
                <button
                  type="button"
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-2xl"
                  onClick={() => setIsEditingDeckTitle(true)}
                >
                  ✏️
                </button>
              </>
            )}
          </div>
          <div className="mt-1 min-h-[1.25rem]">
            {titleState?.errors?.title ? (
              <p className="text-red-500 text-sm">
                {titleState.errors.title[0]}
              </p>
            ) : (
              <p className="invisible text-sm select-none">placeholder</p>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white shadow-lg rounded-lg p-8 max-w-4xl mx-auto">
        <div className="p-2 text-right">Total: {cards.length} card{cards.length === 1 ? "" : "s"}</div>
        <table className="w-full text-xl border-collapse">
          <thead>
            <tr className="bg-gray-200 text-left text-lg">
              <th className="border p-3 w-12">#</th>
              <th className="border p-3">Front text</th>
              <th className="border p-3">Back text</th>
              <th className="border p-3 w-20">Edit</th>
              <th className="border p-3 w-20">Delete</th>
            </tr>
          </thead>

          <tbody>
            {cards.map((card, index) => {
              const isEditing = card.id === editingCardId;

              return (
                <CardRow
                  key={card.id}
                  index={index}
                  card={card}
                  isEditing={isEditing}
                  editingFront={editingFront}
                  editingBack={editingBack}
                  editErrors={editErrors}
                  onStartEdit={() => startEditCard(card)}
                  onChangeFront={setEditingFront}
                  onChangeBack={setEditingBack}
                  onSaveEdit={handleSaveEditedCard}
                  onAskDelete={() => setCardToDelete(card)}
                />
              );
            })}

            {cards.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center p-4 text-gray-500">
                  No cards yet
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <form
          action={formAction}
          className="mt-10 flex items-center space-x-6 text-xl"
        >
          <input type="hidden" name="deckId" value={deckId} />

          <div className="flex flex-col flex-1">
            <label className="mb-1 text-gray-600">Front text</label>
            <input
              type="text"
              name="frontText"
              value={newFront}
              onChange={(e) => setNewFront(e.target.value)}
              className="border p-3 rounded text-xl"
              placeholder="Enter text"
              autoComplete="off"
            />
            <div className="min-h-[1.25rem] mt-1">
              {state?.errors?.frontText ? (
                <p className="text-red-500 text-sm">
                  {state.errors.frontText[0]}
                </p>
              ) : (
                <p className="text-sm invisible select-none">placeholder</p>
              )}
            </div>
          </div>

          <div className="flex flex-col flex-1 justify-center">
            <label className="mb-1 text-gray-600">Back text</label>
            <input
              type="text"
              name="backText"
              value={newBack}
              onChange={(e) => setNewBack(e.target.value)}
              className="border p-3 rounded text-xl"
              placeholder="Enter text"
              autoComplete="off"
            />
            <div className="min-h-[1.25rem] mt-1">
              {state?.errors?.backText ? (
                <p className="text-red-500 text-sm">
                  {state.errors.backText[0]}
                </p>
              ) : (
                <p className="text-sm invisible select-none">placeholder</p>
              )}
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <label className="mb-1 invisible">ph</label>
            <button
              type="submit"
              disabled={isPending}
              className="text-2xl bg-mid rounded-md"
            >
              💾
            </button>
            <div className="min-h-[1.25rem] mt-1">
              <p className="text-sm invisible select-none">ph</p>
            </div>
          </div>
        </form>

        <button
          type="button"
          onClick={() => router.push(BACK_URL)}
          className="flex justify-end mt-12 px-10 py-4 text-lightest text-xl font-semibold rounded-lg shadow bg-mid-dark hover:bg-mid"
        >
          OK
        </button>
      </div>

      {cardToDelete && (
        <ConfirmDialog
          message="Are you sure you want to delete this card?"
          onConfirm={async () => {
            handleDeleteCard();
          }}
          onCancel={() => setCardToDelete(null)}
        />
      )}
    </div>
  );
}
