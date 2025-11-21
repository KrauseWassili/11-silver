import Link from "next/link";
import ThemeToggle from "./theme-toggle";
import GoogleSignIn from "./google-sign-in";

export default function Header() {
  return (
    <div>
      <nav className="bg-accent p-4">
        <div className="flex space-x-6 justify-center">
          <Link
            href={"/about"}
            className="text-background hover:text-foreground transition-colors"
          >
            About
          </Link>

          <Link
            href={"/profile"}
            className="text-background hover:text-foreground transition-colors"
          >
            Profile
          </Link>
          <Link
            href={"/todos/new"}
            className="text-background hover:text-foreground transition-colors"
          >
            Add todo
          </Link>
          <Link
            href={"/todos"}
            className="text-background hover:text-foreground transition-colors"
          >
            Todos
          </Link>
          <GoogleSignIn />
        </div>
        <ThemeToggle />
      </nav>
    </div>
  );
}
