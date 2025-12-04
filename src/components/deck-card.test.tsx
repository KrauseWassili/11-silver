

/**
 * @jest-environment jsdom
 */
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import DeckCard from "./deck-card";

// Mock deleteDeck so pg/db never loads
jest.mock("@/app/decks/actions/delete-deck", () => jest.fn());

// Mock next/navigation
const mockPush = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
    refresh: jest.fn(),
  }),
}));

describe("DeckCard", () => {
  const deck = { id: 1, name: "Deck A" };
  const count = 5;

  beforeEach(() => {
    mockPush.mockClear();
  });

  it("renders deck name", () => {
    render(<DeckCard deck={deck} count={count} />);
    expect(screen.getByText("Deck A")).toBeInTheDocument();
  });

  it("renders deck count", () => {
    render(<DeckCard deck={deck} count={count} />);
    expect(screen.getByText("(5)")).toBeInTheDocument();
  });

  it("navigates to deck page when clicked", () => {
    render(<DeckCard deck={deck} count={count} />);

    const clickable = screen.getByText("Deck A");
    fireEvent.click(clickable);

    expect(mockPush).toHaveBeenCalledWith("/decks/1");
  });
});
