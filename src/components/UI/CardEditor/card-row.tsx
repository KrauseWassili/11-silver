"use client";

import type { Flashcard } from "./edit-cards-client";

type Props = {
  index: number;
  card: Flashcard;
  isEditing: boolean;
  editingFront: string;
  editingBack: string;
  onStartEdit: () => void;
  onChangeFront: (value: string) => void;
  onChangeBack: (value: string) => void;
  onSaveEdit: () => void;
  onAskDelete: () => void;
};

export default function CardRow({
  index,
  card,
  isEditing,
  editingFront,
  editingBack,
  onStartEdit,
  onChangeFront,
  onChangeBack,
  onSaveEdit,
  onAskDelete,
}: Props) {
  return (
    <tr className="text-lg">
      <td className="border p-3">{index + 1}</td>

      <td className="border p-3">
        {isEditing ? (
          <input
            className="border p-2 rounded w-full text-xl"
            value={editingFront}
            onChange={(e) => onChangeFront(e.target.value)}
          />
        ) : (
          card.frontText
        )}
      </td>

      <td className="border p-3">
        {isEditing ? (
          <input
            className="border p-2 rounded w-full text-xl"
            value={editingBack}
            onChange={(e) => onChangeBack(e.target.value)}
          />
        ) : (
          card.backText
        )}
      </td>

      <td className="border p-3 text-center">
        {isEditing ? (
          <button
            className="text-2xl bg-mid  px-3 py-1 rounded-md"
            onClick={onSaveEdit}
          >
            ✔
          </button>
        ) : (
          <button
            className="text-2xl bg-mid  px-3 py-1 rounded-md"
            onClick={onStartEdit}
          >
            ✏️
          </button>
        )}
      </td>

      <td className="border p-3 text-center">
        <button
          className="text-2xl bg-mid  px-3 py-1 rounded-md"
          onClick={onAskDelete}
        >
          ✖
        </button>
      </td>
    </tr>
  );
}
