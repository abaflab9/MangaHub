import Link from "next/link";

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 border-t border-zinc-300 bg-white">
      <div className="font-medium text-zinc-700">
        <Link href="/">Reading</Link>
        <Link href="/schedule">Schedule</Link>
        <Link href="/library">Library</Link>
        <Link href="/search">Search</Link>
        <Link href="/settings">Settings</Link>
      </div>
    </nav>
  );
}