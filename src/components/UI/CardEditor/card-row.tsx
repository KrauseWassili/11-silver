"use client";

import type { Flashcard } from "./edit-cards-client";

type Props = {
  index: number;
  card: Flashcard;
  isEditing: boolean;
  editingFront: string;
  editingBack: string;
  editErrors?: Record<string, string[]>;
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
  editErrors,
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
          <>
            <input
              className="border p-2 rounded w-full text-xl"
              value={editingFront}
              onChange={(e) => onChangeFront(e.target.value)}
            />
            {editErrors?.frontText && (
              <p className="text-red-500 text-sm mt-1">
                {editErrors.frontText[0]}
              </p>
            )}
            {!editErrors?.frontText && editErrors?.backText && (
              <p className="invisible text-sm mt-1">
                placeholder
              </p>
            )}
          </>
        ) : (
          card.frontText
        )}
      </td>

      <td className="border p-3">
        {isEditing ? (
          <>
            <input
              className="border p-2 rounded w-full text-xl"
              value={editingBack}
              onChange={(e) => onChangeBack(e.target.value)}
            />
            {editErrors?.backText && (
              <p className="text-red-500 text-sm mt-1">
                {editErrors.backText[0]}
              </p>
            )}
            {!editErrors?.backText && editErrors?.frontText && (
              <p className="invisible text-sm mt-1">
                placeholder
              </p>
            )}
          </>
        ) : (
          card.backText
        )}
      </td>

      <td className="border p-3 text-center">
        {isEditing ? (
          <button
            className="button-gray-rounded"
            onClick={onSaveEdit}
          >
            ✔
          </button>
        ) : (
          <button
            className="button-gray-rounded"
            onClick={onStartEdit}
          >
            ✏️
          </button>
        )}
      </td>

      <td className="border p-3 text-center">
        <button
          className="button-gray-rounded"
          onClick={onAskDelete}
        >
          ✖
        </button>
      </td>
    </tr>
  );
}
