"use client";

import { useRouter } from "next/navigation";

export default function FloatingAddButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push("/add")}
      className="fixed bottom-24 right-4 flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-2xl text-white shadow-lg"
    >
      +
    </button>
  );
}