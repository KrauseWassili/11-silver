import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import DecksPage from "@/app/decks/page"; // adjust path if needed

// --- Mock child components ---
jest.mock("@/components/deck-card", () => {
  return function MockDeckCard(props: any) {
    return (
      <div data-testid="deck-card">
        {props.deck.name} - {props.count}
      </div>
    );
  };
});


jest.mock("@/components/create-button", () => {
  return function MockCreateButton(props: any) {
    return (
      <a data-testid="create-button" href={props.href}>
        {props.label}
      </a>
    );
  };
});

// --- Mock database + Drizzle ORM ---
const mockSelect = jest.fn();
const mockLeftJoin = jest.fn();
const mockGroupBy = jest.fn();
const mockOrderBy = jest.fn();

jest.mock("@/db", () => ({
  db: {
    select: (...args: any[]) => mockSelect(...args),
  },
}));

jest.mock("drizzle-orm", () => ({
  count: jest.fn().mockReturnValue({ as: () => "cardCount" }),
  eq: jest.fn(),
}));

// schema mocks
jest.mock("@/db/schema", () => ({
  decks: { id: "id", title: "title" },
  flashcards: { id: "fcId", deckId: "deckId" },
}));

// Chainable mock behavior
beforeEach(() => {
  // chain db.select().from().leftJoin().groupBy().orderBy()
  mockSelect.mockReturnValue({
    from: () => ({
      leftJoin: () => ({
        groupBy: () => ({
          orderBy: () => mockOrderBy(),
        }),
      }),
    }),
  });

  // db result
  mockOrderBy.mockResolvedValue([
    { id: 1, title: "Deck A", cardCount: 3 },
    { id: 2, title: "Deck B", cardCount: 0 },
  ]);
});

describe("DecksPage", () => {
  it("renders deck list from database", async () => {
    render(await DecksPage());

    const cards = screen.getAllByTestId("deck-card");
    expect(cards.length).toBe(2);

    expect(cards[0]).toHaveTextContent("Deck A - 3");
    expect(cards[1]).toHaveTextContent("Deck B - 0");
  });

  
  it("renders heading text", async () => {
    render(await DecksPage());

    expect(
      screen.getByText("Select a deck and tap it to begin training")
    ).toBeInTheDocument();
  });
});
