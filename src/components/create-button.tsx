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
  
}: CreateButtonProps) {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.push(href)}
      className={`text-white text-2xl font-semibold rounded-lg shadow-lg transition`}
    >
      {label}
    </button>
  );
}
