"use client";

import { useState } from "react";
import { useParams } from "next/navigation";

export default function EditDeckPage() {
  const { id } = useParams(); // получаем id колоды из URL
  const [cards, setCards] = useState([
    { id: 1, front: "Hallo", back: "Привет" },
    { id: 2, front: "Welt", back: "Мир" },
  ]);

  // Добавление новой карточки
  const handleAddCard = () => {
    const newCard = { id: Date.now(), front: "", back: "" };
    setCards([...cards, newCard]);
  };

  // Обновление карточки
  const handleUpdateCard = (id: number, field: "front" | "back", value: string) => {
    setCards(cards.map(card =>
      card.id === id ? { ...card, [field]: value } : card
    ));
  };

  // Удаление карточки
  const handleDeleteCard = (id: number) => {
    setCards(cards.filter(card => card.id !== id));
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Create / edit cards {id}</h1>

      <div className="space-y-6">
        {cards.map(card => (
          <div key={card.id} className="flex items-center space-x-4">
            <input
              type="text"
              value={card.front}
              onChange={(e) => handleUpdateCard(card.id, "front", e.target.value)}
              placeholder="Front"
              className="border p-2 rounded w-1/3"
            />
            <input
              type="text"
              value={card.back}
              onChange={(e) => handleUpdateCard(card.id, "back", e.target.value)}
              placeholder="Back"
              className="border p-2 rounded w-1/3"
            />
            <button
              onClick={() => handleDeleteCard(card.id)}
              className="px-3 py-2 bg-red-200 border-5 text-white rounded hover:bg-red-600 transition"
            >
              ❌
            </button>
          </div>
        ))}
      </div>

      <button
        onClick={handleAddCard}
        className="mt-8 px-6 py-3 bg-amber-600/75 text-white rounded-lg shadow hover:bg-amber-700 transition"
      >
        ➕ Add Card
      </button>
    </div>
  );
}