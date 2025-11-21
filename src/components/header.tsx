"use client"

import Link from "next/link";
import { useSession } from "next-auth/react";
import GoogleSignIn from "./google-sign-in";

export default function Header() {
  const { data: session, status } = useSession();
  return (
    <div>
      <nav className="bg-accent p-4">
        <div className="flex items-center justify-center relative w-full">
                    
          <div className="flex items-center justify-center space-x-8">
            <Link
              href="/"
              className="text-secondary text-xl hover:text-foreground transition-colors font-medium"
            >
              Home
            </Link>
            
          </div>
          

          {/* === Аватарка и кнопка входа справа === */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center space-x-4 pr-4">
            {status === "authenticated" && session?.user?.image && (
              <Link href="/profile" className="flex items-center">
                <img
                  src={session.user.image}
                  alt={session.user.name || "avatar"}
                  width={36}
                  height={36}
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
