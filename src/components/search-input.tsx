"use client";

import { useState } from "react";

interface SearchInputProps {
  onSearch: (value: string) => void;
}

export default function SearchInput({ onSearch }: SearchInputProps) {
  const [value, setValue] = useState("");

  return (
    <div className="w-full mb-4">
      <input
        type="text"
        placeholder="Search decks..."
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          onSearch(e.target.value);
        }}
        className="
          w-full px-3 py-2 rounded-md border 
          border-gray-300 dark:border-gray-700 
          bg-white dark:bg-gray-900 
          text-gray-900 dark:text-gray-100
          focus:outline-none focus:ring-1 focus:ring-grey-500
        "
      />
    </div>
  );
}
