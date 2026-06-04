"use client";

import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function SettingsPage() {
  const router = useRouter();

  async function handleLogout() {
    await supabase.auth.signOut();

    router.push("/login");
  }

  return (
    <main className="min-h-screen bg-zinc-200 p-4">
      <div className="mx-auto max-w-md">
        <h1 className="mb-6 text-3xl font-bold text-zinc-900">
          Settings
        </h1>

        <div className="space-y-4">
          <button className="w-full rounded bg-white p-4 text-left shadow">
            Account
          </button>

          <button className="w-full rounded bg-white p-4 text-left shadow">
            Appearance
          </button>

          <button className="w-full rounded bg-white p-4 text-left shadow">
            Import / Export
          </button>

          <button
            onClick={handleLogout}
            className="w-full rounded bg-red-600 p-4 font-medium text-white"
          >
            Logout
          </button>
        </div>
      </div>
    </main>
  );
}