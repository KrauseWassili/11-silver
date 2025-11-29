export default function Footer() {
  return (
    <footer className="bg-dark text-lightest border-t border-midDark text-center px-8 py-6 mt-12">
      <p className="opacity-80">
        © {new Date().getFullYear()} Super-tutor (c) All rights reserved.
      </p>
    </footer>
  );
}
