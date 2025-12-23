"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface ConfirmDialogProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmDialog({
  message,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div
        className="bg-(--color-bg) p-8 rounded-lg shadow-lg text-center max-w-md w-full"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <p className="text-3xl text-(--color-text-secondary) font-semibold mb-20">
          {message}
        </p>
        <div className="text-3xl flex justify-center space-x-10">
          <button onClick={onConfirm} className="button-gray-rounded">
            Yes
          </button>
          <button onClick={onCancel} className="button-gray-rounded">
            No
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
