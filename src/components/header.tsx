"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import GoogleSignIn from "./google-sign-in";
import Avatar from "./avatar";

export default function Header() {
  const { data: session, status } = useSession();

  return (
<<<<<<< HEAD
    <nav className="bg-accent py-2 px-4">
      <div className="flex items-center justify-between w-full">
        <Link href="/" className="flex items-center">
          <h1 className="text-3xl font-bold text-foreground">Super - tutor</h1>
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
          <Link
            href="/profile"
            className="text-secondary text-xl hover:text-foreground transition-colors font-medium"
          >
            Profile
          </Link>
        </div>

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
=======
    <header
      className="fixed left-0 top-0 w-full
        bg-dark
        text-lightest
        py-2 
        text-center
      "
    >
      <nav>
        <div className="flex items-center justify-between w-full px-4">
          <Link href="/" className="flex items-center">
            <h1 className="text-xl font-bold text-foreground">Super ‑ tutor</h1>
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
            {status === "authenticated" && (
              <Avatar
                image={session?.user?.image}
                name={session?.user?.name}
                href="/profile"
              />
            )}
            <GoogleSignIn />
          </div>
        </div>
      </nav>
    </header>
>>>>>>> 46c7ea6647987b8539cec2abe4ae8f1e48f60491
  );
}