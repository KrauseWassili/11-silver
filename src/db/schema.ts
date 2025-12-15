import {
  boolean,
  serial,
  pgTable,
  integer,
  varchar,
  text,
  timestamp,
  pgEnum,
  primaryKey,
  index,
} from "drizzle-orm/pg-core";

// При любых изменениях снача меняем/добавляем схему
// генерируем npx drizzle-kit generate  - сгенерирует скрипты в папку drizzle
// мигрируем npx drizzle-kit migrate  -внесет изменения в базу данных

export const deckSourceTypeEnum = pgEnum("deck_source_type", [
  "standard",
  "user",
]);

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  image: text("image"),
  role: varchar("role", { length: 100 }).default("customer"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
  deletedAt: timestamp("deleted_at"),
});

export const decks = pgTable(
  "decks",
  {
    id: serial("id").primaryKey(),
    title: varchar("title", { length: 255 }).notNull(),
    userId: integer("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    sourceType: deckSourceTypeEnum("source_type").notNull(),
    isPublic: boolean("is_public").default(false).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
    deletedAt: timestamp("deleted_at"),
  },
  (table) => ({
    userIdIdx: index("decks_user_id_idx").on(table.userId),
    sourceTypeIdx: index("decks_source_type_idx").on(table.sourceType),
    isPublicIdx: index("decks_is_public_idx").on(table.isPublic),
  })
);

export const flashcards = pgTable(
  "flashcards",
  {
    id: serial("id").primaryKey(),
    frontText: varchar("front_text", { length: 255 }).notNull(),
    backText: varchar("back_text", { length: 255 }).notNull(),
    deckId: integer("deck_id")
      .notNull()
      .references(() => decks.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
    deletedAt: timestamp("deleted_at"),
  },
  (table) => ({
    deckIdIdx: index("flashcards_deck_id_idx").on(table.deckId),
  })
);

export const userDeckFavorite = pgTable(
  "user_deck_favorite",
  {
    userId: integer("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    deckId: integer("deck_id")
      .notNull()
      .references(() => decks.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    deletedAt: timestamp("deleted_at"),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.userId, table.deckId] }),

    userIdIdx: index("user_deck_favorite_user_id_idx").on(table.userId),
  })
);
