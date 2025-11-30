"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import GoogleSignIn from "./google-sign-in";

export default function Header() {
  const { data: session, status } = useSession();

  return (
    <div>
      <nav className="bg-accent p-4">
        <div className="flex items-center justify-between w-full">
          {/* === Название слева === */}
          <Link href="/" className="flex items-center">
            <h1 className="text-3xl font-bold text-foreground">Super ‑ tutor</h1>
          </Link>

          {/* === Навигация по центру === */}
          <div className="flex items-center space-x-8">
            <Link
              href="/"
              className="text-secondary text-xl hover:text-foreground transition-colors font-medium"
            >
              Home
            </Link>
            <Link
              href="/decks"
              className="text-secondary text-xl hover:text-foreground transition-colors font-medium"
            >
              Decks
            </Link>
            <Link
              href="/profile"
              className="text-secondary text-xl hover:text-foreground transition-colors font-medium"
            >
              Profile
            </Link>
          </div>

          {/* === Аватарка и кнопка входа справа === */}
          <div className="flex items-center space-x-4">
            {status === "authenticated" && session?.user?.image && (
              <Link href="/profile" className="flex items-center">
                <img
                  src={session.user.image}
                  alt={session.user.name || "avatar"}
                  width={40}
                  height={40}
                  className="rounded-full border border-foreground/20 hover:border-foreground transition"
                />
              </Link>
            )}
            <GoogleSignIn />
          </div>
        </div>
      </nav>
    </div>
  );
}
