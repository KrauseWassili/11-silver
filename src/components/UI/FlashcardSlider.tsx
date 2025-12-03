"use client";
import { ArrowRight, ArrowLeft  } from 'lucide-react';
import { useState } from "react";

type Card = {
  id: number;
  frontText: string;
  backText: string;
};

export function FlashcardSlider({ cards }: { cards: Card[] }) {
  const [index, setIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState<"left" | "right" | null>(
    null
  );

  if (cards.length === 0) {
    return <p>В этой колоде пока нет карточек.</p>;
  }

  const current = cards[index];

  const doSlide = (direction: "left" | "right", nextIndex: number) => {
    setSlideDirection(direction);

    setTimeout(() => {
      setIndex(nextIndex);
      setSlideDirection(null);
    }, 180);
  };

  const handleNext = () => {
    const next = (index + 1) % cards.length;
    doSlide("right", next);
  };

  const handlePrev = () => {
    const next = (index - 1 + cards.length) % cards.length;
    doSlide("left", next);
  };

  return (
    <div className="w-full max-w-3xl flex flex-col items-center gap-3">
      <div
        className={`
          relative w-full  flex items-center justify-center
          transition-transform duration-200
          ${
            slideDirection === "right"
              ? "translate-x-12"
              : slideDirection === "left"
              ? "-translate-x-12"
              : ""
          }
        `}
      >
        <div
          className="
            w-full max-w-3xl h-[220px]
            cursor-pointer select-none relative
            rounded-3xl bg-white/20 shadow-md
            flex items-center justify-center
            px-10
          "
        >
          <span className="text-2xl font-medium text-darkest text-center">
            {current.frontText}
          </span>
        </div>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handlePrev();
          }}
          className="
            absolute left-6 top-1/2 -translate-y-1/2
            z-10
            flex h-10 w-10 items-center justify-center
            rounded-full bg-primary text-lightest
            shadow-sm
            hover:opacity-90 transition
          "
        >
          <ArrowLeft className="w-5 h-5"/>
        </button>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handleNext();
          }}
          className="
            absolute right-6 top-1/2 -translate-y-1/2
            z-10
            flex h-10 w-10 items-center justify-center
            rounded-full bg-primary text-lightest
            shadow-sm
            hover:opacity-90 transition
          "
        >
          <ArrowRight className="w-5 h-5"/>
        </button>
      </div>
      <p className="text-xs text-darkest/60">
        Card {index + 1} / {cards.length}
      </p>
    </div>
  );
}
