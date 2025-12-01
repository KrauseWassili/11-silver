"use client";

import { useRouter } from "next/navigation";

interface CreateButtonProps {
  href: string;
  label: string;
  color?: string;
}

export default function CreateButton({
  href,
  label,
  color = "bg-sky-700/55 hover:bg-blue-500",
}: CreateButtonProps) {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.push(href)}
      className={`px-8 py-4 ${color} text-white text-xl font-semibold rounded-lg shadow-lg transition`}
    >
      {label}
    </button>
  );
}
