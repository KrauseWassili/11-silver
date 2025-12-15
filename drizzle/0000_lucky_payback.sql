-- =====================================================
-- 1. ENUM deck_source_type (безопасно)
-- =====================================================
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_type WHERE typname = 'deck_source_type'
  ) THEN
    CREATE TYPE "public"."deck_source_type" AS ENUM ('standard', 'user');
  END IF;
END$$;
-- statement-breakpoint


-- =====================================================
-- 2. TABLE decks — добавляем недостающие колонки
-- =====================================================
ALTER TABLE "decks"
  ADD COLUMN IF NOT EXISTS "source_type" "deck_source_type" NOT NULL DEFAULT 'user',
  ADD COLUMN IF NOT EXISTS "is_public" boolean DEFAULT false NOT NULL,
  ADD COLUMN IF NOT EXISTS "deleted_at" timestamp;
-- statement-breakpoint


-- =====================================================
-- 3. TABLE users — soft delete
-- =====================================================
ALTER TABLE "users"
  ADD COLUMN IF NOT EXISTS "deleted_at" timestamp;
-- statement-breakpoint


-- =====================================================
-- 4. TABLE flashcards — soft delete
-- =====================================================
ALTER TABLE "flashcards"
  ADD COLUMN IF NOT EXISTS "deleted_at" timestamp;
-- statement-breakpoint


-- =====================================================
-- 5. TABLE user_deck_favorite
-- создаём ТОЛЬКО если таблицы ещё нет
-- =====================================================
CREATE TABLE IF NOT EXISTS "user_deck_favorite" (
  "user_id" integer NOT NULL,
  "deck_id" integer NOT NULL,
  "created_at" timestamp DEFAULT now() NOT NULL,
  "deleted_at" timestamp,
  CONSTRAINT "user_deck_favorite_user_id_deck_id_pk"
    PRIMARY KEY ("user_id", "deck_id")
);
-- statement-breakpoint


-- =====================================================
-- 6. FOREIGN KEYS (безопасно)
-- =====================================================

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints
    WHERE constraint_name = 'decks_user_id_users_id_fk'
  ) THEN
    ALTER TABLE "decks"
      ADD CONSTRAINT "decks_user_id_users_id_fk"
      FOREIGN KEY ("user_id")
      REFERENCES "public"."users"("id")
      ON DELETE CASCADE;
  END IF;
END$$;
-- statement-breakpoint


DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints
    WHERE constraint_name = 'flashcards_deck_id_decks_id_fk'
  ) THEN
    ALTER TABLE "flashcards"
      ADD CONSTRAINT "flashcards_deck_id_decks_id_fk"
      FOREIGN KEY ("deck_id")
      REFERENCES "public"."decks"("id")
      ON DELETE CASCADE;
  END IF;
END$$;
-- statement-breakpoint


DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints
    WHERE constraint_name = 'user_deck_favorite_user_id_users_id_fk'
  ) THEN
    ALTER TABLE "user_deck_favorite"
      ADD CONSTRAINT "user_deck_favorite_user_id_users_id_fk"
      FOREIGN KEY ("user_id")
      REFERENCES "public"."users"("id")
      ON DELETE CASCADE;
  END IF;
END$$;
-- statement-breakpoint


DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints
    WHERE constraint_name = 'user_deck_favorite_deck_id_decks_id_fk'
  ) THEN
    ALTER TABLE "user_deck_favorite"
      ADD CONSTRAINT "user_deck_favorite_deck_id_decks_id_fk"
      FOREIGN KEY ("deck_id")
      REFERENCES "public"."decks"("id")
      ON DELETE CASCADE;
  END IF;
END$$;
-- statement-breakpoint


-- =====================================================
-- 7. INDEXES (ПОСЛЕ добавления колонок!)
-- =====================================================

CREATE INDEX IF NOT EXISTS "decks_user_id_idx"
  ON "decks" USING btree ("user_id");
-- statement-breakpoint

CREATE INDEX IF NOT EXISTS "decks_source_type_idx"
  ON "decks" USING btree ("source_type");
-- statement-breakpoint

CREATE INDEX IF NOT EXISTS "decks_is_public_idx"
  ON "decks" USING btree ("is_public");
-- statement-breakpoint

CREATE INDEX IF NOT EXISTS "flashcards_deck_id_idx"
  ON "flashcards" USING btree ("deck_id");
-- statement-breakpoint

CREATE INDEX IF NOT EXISTS "user_deck_favorite_user_id_idx"
  ON "user_deck_favorite" USING btree ("user_id");
