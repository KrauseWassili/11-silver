"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import GoogleSignIn from "./google-sign-in";

export default function Header() {
  const { data: session, status } = useSession();

  return (
    <header className="relative w-full
        bg-dark
        text-lightest
        py-2 
        text-center
      ">
      <nav className="relative w-full">
        <div className="flex items-center justify-between w-full px-4">
          <Link href="/" className="flex items-center">
            <h1 className="text-xl font-bold text-foreground">
              Super ‑ tutor
            </h1>
          </Link>

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
          </div>

          <div className="flex items-center space-x-4">
            {status === "authenticated" && session?.user?.image && (
              <Link href="/profile" className="flex items-center">
                <img
                  src={session.user.image}
                  alt={session.user.name || "avatar"}
                  width={30}
                  height={30}
                  className="rounded-full border border-foreground/20 hover:border-foreground transition"
                />
              </Link>
            )}
            <GoogleSignIn />
          </div>
        </div>
      </nav>
    </header>
  );
}