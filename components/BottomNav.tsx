import Link from "next/link";

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 border-t border-zinc-300 bg-white shadow-sm">
      <div className="mx-auto flex max-w-md justify-around py-4">
        <Link
          href="/"
          className="font-medium text-zinc-700"
        >
          Reading
        </Link>

        <Link
          href="/schedule"
          className="font-medium text-zinc-700"
        >
          Schedule
        </Link>

        <Link
          href="/library"
          className="font-medium text-zinc-700"
        >
          Library
        </Link>

        <Link
          href="/search"
          className="font-medium text-zinc-700"
        >
          Search
        </Link>

        <Link
          href="/settings"
          className="font-medium text-zinc-700"
        >
          Settings
        </Link>
      </div>
    </nav>
  );
}