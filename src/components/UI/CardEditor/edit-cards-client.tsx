"use client";

import { useState } from "react";
import CardRow from "./card-row";
import updateCard from "@/app/actions/update-card";
import saveCard from "@/app/actions/save-card";
import updateDeck from "@/app/actions/update-deck";
import deleteCard from "@/app/actions/delete-card";
import ConfirmDialog from "../../confirm-dialog";
import router from "next/router";

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
};

export default function EditCardsClient({
  deckId,
  deckTitle,
  initialCards,
}: Props) {
  const [cards, setCards] = useState<Flashcard[]>(initialCards);

  // новая карточка (нижняя строка)
  const [newFront, setNewFront] = useState("");
  const [newBack, setNewBack] = useState("");

  // редактирование строки
  const [editingCardId, setEditingCardId] = useState<number | null>(null);
  const [editingFront, setEditingFront] = useState("");
  const [editingBack, setEditingBack] = useState("");

  // карточка для удаления (модалка)
  const [cardToDelete, setCardToDelete] = useState<Flashcard | null>(null);

  const startEditCard = (card: Flashcard) => {
    setEditingCardId(card.id);
    setEditingFront(card.frontText);
    setEditingBack(card.backText);
  };

  const handleSaveEditedCard = async () => {
    if (editingCardId === null) return;
    if (!editingFront.trim() || !editingBack.trim()) return;

    const updated = await updateCard({
      id: editingCardId,
      deckId,
      frontText: editingFront.trim(),
      backText: editingBack.trim(),
    });

    setCards((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));

    setEditingCardId(null);
    setEditingFront("");
    setEditingBack("");
  };

  const handleAddCard = async () => {
    if (!newFront.trim() || !newBack.trim()) return;

    const created = await saveCard({
      deckId,
      frontText: newFront.trim(),
      backText: newBack.trim(),
    });

    setCards((prev) => [...prev, created]);
    setNewFront("");
    setNewBack("");
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

  const handleSaveDeck = async () => {
    await updateDeck({ id: deckId, title: deckTitle });
    alert("Deck saved");
  };

  const [open, setOpen] = useState(false);

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold text-gray-700 mb-10">
        Edit Cards – {deckTitle}
      </h1>

      <div className="bg-white shadow-lg rounded-lg p-10 max-w-4xl mx-auto">
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

        <div className="mt-10 flex items-end space-x-6 text-xl">
          <div className="flex flex-col flex-1">
            <label className="mb-1 text-gray-600">Front text</label>
            <input
              type="text"
              value={newFront}
              onChange={(e) => setNewFront(e.target.value)}
              className="border p-3 rounded text-xl"
              placeholder="Enter text"
            />
          </div>

          <div className="flex flex-col flex-1">
            <label className="mb-1 text-gray-600">Back text</label>
            <input
              type="text"
              value={newBack}
              onChange={(e) => setNewBack(e.target.value)}
              className="border p-3 rounded text-xl"
              placeholder="Enter text"
            />
          </div>

          <button
            onClick={handleAddCard}
            className="px-6 py-3 bg-blue-600 text-white text-2xl rounded-lg shadow hover:bg-blue-500"
          >
            💾
          </button>
        </div>

        <button
          onClick={handleSaveDeck}
          className="mt-12 px-10 py-4 bg-sky-700/55 text-white text-xl font-semibold rounded-lg shadow hover:bg-blue-500"
        >
          Save deck
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
