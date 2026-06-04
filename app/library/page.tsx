"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Series = {
  id: string;
  title: string;
  chapter: number;
  schedule: string | null;
  status: string;
};

export default function LibraryPage() {
  const [series, setSeries] = useState<Series[]>([]);
  const [loading, setLoading] = useState(true);

  const [statusFilter, setStatusFilter] =
    useState("reading");

  useEffect(() => {
    async function loadSeries() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("user_series")
        .select("*")
        .eq("user_id", user.id);

      if (error) {
        console.error(error);
        setLoading(false);
        return;
      }

      setSeries(data ?? []);
      setLoading(false);
    }

    loadSeries();
  }, []);

  const filteredSeries = series.filter(
    (s) => s.status === statusFilter
  );

  return (
    <main className="min-h-screen bg-zinc-200 p-4 pb-24">
      <div className="mx-auto max-w-md">
        <h1 className="mb-6 text-3xl font-bold text-zinc-900">
          Library
        </h1>

        <div className="mb-6 flex flex-wrap gap-2">
          <button
            onClick={() =>
              setStatusFilter("reading")
            }
            className={`rounded px-3 py-2 ${
              statusFilter === "reading"
                ? "bg-blue-600 text-white"
                : "bg-white"
            }`}
          >
            Reading
          </button>

          <button
            onClick={() =>
              setStatusFilter("completed")
            }
            className={`rounded px-3 py-2 ${
              statusFilter === "completed"
                ? "bg-blue-600 text-white"
                : "bg-white"
            }`}
          >
            Completed
          </button>

          <button
            onClick={() =>
              setStatusFilter("on_hold")
            }
            className={`rounded px-3 py-2 ${
              statusFilter === "on_hold"
                ? "bg-blue-600 text-white"
                : "bg-white"
            }`}
          >
            On Hold
          </button>

          <button
            onClick={() =>
              setStatusFilter("dropped")
            }
            className={`rounded px-3 py-2 ${
              statusFilter === "dropped"
                ? "bg-blue-600 text-white"
                : "bg-white"
            }`}
          >
            Dropped
          </button>

          <button
            onClick={() =>
              setStatusFilter("plan_to_read")
            }
            className={`rounded px-3 py-2 ${
              statusFilter === "plan_to_read"
                ? "bg-blue-600 text-white"
                : "bg-white"
            }`}
          >
            Plan to Read
          </button>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {filteredSeries.map((series) => (
              <div
                key={series.id}
                className="rounded-xl bg-white p-4 shadow"
              >
                <div className="mb-2 h-32 rounded bg-zinc-300" />

                <h2 className="font-semibold">
                  {series.title}
                </h2>

                <p className="text-sm text-zinc-600">
                  Ch. {series.chapter}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}