"use client";

import { useState } from "react";

type Card = {
  id: number;
  front: string;
  back: string;
};

export default function EditCardsPage() {
  const [cards, setCards] = useState<Card[]>([
    { id: 1, front: "Hello", back: "Привет" },
    { id: 2, front: "Thank you", back: "Спасибо" },
  ]);

  const [newFront, setNewFront] = useState("");
  const [newBack, setNewBack] = useState("");

  const [editingCardId, setEditingCardId] = useState<number | null>(null);
  const [editingFront, setEditingFront] = useState("");
  const [editingBack, setEditingBack] = useState("");

  const [cardToDelete, setCardToDelete] = useState<Card | null>(null);

  const startEditCard = (card: Card) => {
    setEditingCardId(card.id);
    setEditingFront(card.front);
    setEditingBack(card.back);
  };

  const saveEditedCard = () => {
    if (!editingFront.trim() || !editingBack.trim()) return;

    setCards((prev) =>
      prev.map((card) =>
        card.id === editingCardId
          ? { ...card, front: editingFront, back: editingBack }
          : card
      )
    );

    setEditingCardId(null);
    setEditingFront("");
    setEditingBack("");
  };

  const addNewCard = () => {
    if (!newFront.trim() || !newBack.trim()) return;

    setCards((prev) => [
      ...prev,
      { id: Date.now(), front: newFront, back: newBack },
    ]);

    setNewFront("");
    setNewBack("");
  };

  const confirmDeleteCard = () => {
    if (cardToDelete) {
      setCards((prev) => prev.filter((c) => c.id !== cardToDelete.id));
      setCardToDelete(null);
    }
  };

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold text-gray-700 mb-10">Edit Cards</h1>

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
                <tr key={card.id} className="text-lg">
                  <td className="border p-3">{index + 1}</td>

                  <td className="border p-3">
                    {isEditing ? (
                      <input
                        type="text"
                        value={editingFront}
                        onChange={(e) => setEditingFront(e.target.value)}
                        className="border p-2 rounded w-full text-xl"
                      />
                    ) : (
                      card.front
                    )}
                  </td>

                  <td className="border p-3">
                    {isEditing ? (
                      <input
                        type="text"
                        value={editingBack}
                        onChange={(e) => setEditingBack(e.target.value)}
                        className="border p-2 rounded w-full text-xl"
                      />
                    ) : (
                      card.back
                    )}
                  </td>

                  <td className="border p-3 text-center">
                    {isEditing ? (
                      <button
                        className="text-green-600 hover:text-green-800 text-2xl"
                        onClick={saveEditedCard}
                      >
                        ✔
                      </button>
                    ) : (
                      <button
                        className="hover:text-blue-600 text-2xl"
                        onClick={() => startEditCard(card)}
                      >
                        ✏️
                      </button>
                    )}
                  </td>

                  <td className="border p-3 text-center">
                    <button
                      className="text-red-600 hover:text-red-800 text-2xl"
                      onClick={() => setCardToDelete(card)}
                    >
                      ✖
                    </button>
                  </td>
                </tr>
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
            onClick={addNewCard}
            className="px-6 py-3 bg-blue-600 text-white text-2xl rounded-lg shadow hover:bg-blue-500"
          >
            💾
          </button>
        </div>

        <button
          onClick={() => alert("Deck saved")}
          className="mt-12 px-10 py-4 bg-sky-700/55 text-white text-xl font-semibold rounded-lg shadow hover:bg-blue-500"
        >
          Save deck
        </button>
      </div>

      {cardToDelete && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-10 rounded shadow-lg text-center text-xl">
            <p>If press “delete card”</p>
            <p className="mt-2 mb-6">Are you sure?</p>

            <div className="flex justify-center space-x-8">
              <button
                onClick={confirmDeleteCard}
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-500"
              >
                Yes
              </button>
              <button
                onClick={() => setCardToDelete(null)}
                className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-500"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
