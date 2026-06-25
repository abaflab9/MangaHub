"use client";

import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase";

type Series = {
  id: string;
  title: string;
  chapter: number;
  schedule: string | null;
  status: string;
  cover_url: string | null;
};

const statusOptions = [
  { value: "reading", label: "Reading" },
  { value: "completed", label: "Completed" },
  { value: "on_hold", label: "On Hold" },
  { value: "dropped", label: "Dropped" },
  { value: "plan_to_read", label: "Plan to Read" },
];

export default function LibraryPage() {
  const [series, setSeries] = useState<Series[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
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
        .eq("user_id", user.id)
        .order("title", { ascending: true });

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

  const statusCounts = useMemo(
    () =>
      statusOptions.reduce<Record<string, number>>(
        (counts, option) => {
          counts[option.value] = series.filter(
            (item) => item.status === option.value
          ).length;

          return counts;
        },
        {}
      ),
    [series]
  );

  const filteredSeries = useMemo(() => {
    const normalizedQuery = query
      .trim()
      .toLowerCase();

    return series.filter((item) => {
      const matchesStatus =
        item.status === statusFilter;
      const matchesQuery =
        normalizedQuery.length === 0 ||
        item.title
          .toLowerCase()
          .includes(normalizedQuery);

      return matchesStatus && matchesQuery;
    });
  }, [query, series, statusFilter]);

  const activeStatusLabel =
    statusOptions.find(
      (option) => option.value === statusFilter
    )?.label ?? "Library";

  const emptyMessage = query.trim()
    ? `No ${activeStatusLabel.toLowerCase()} titles match "${query.trim()}".`
    : `No titles marked ${activeStatusLabel.toLowerCase()} yet.`;

  const totalForStatus =
    statusCounts[statusFilter] ?? 0;

  const resultLabel =
    filteredSeries.length === 1
      ? "1 title"
      : `${filteredSeries.length} titles`;

  const statusLabel =
    totalForStatus === 1
      ? "1 total"
      : `${totalForStatus} total`;

  const hasSeries = filteredSeries.length > 0;

  return (
    <main className="min-h-screen bg-zinc-200 p-4 pb-24">
      <div className="mx-auto max-w-md">
        <div className="mb-6">
          <p className="text-sm font-medium uppercase tracking-wide text-blue-700">
            MangaHub
          </p>

          <h1 className="text-3xl font-bold text-zinc-900">
            Library
          </h1>
        </div>

        <label className="mb-4 block">
          <span className="sr-only">
            Search your library
          </span>

          <input
            type="search"
            placeholder="Search your library..."
            value={query}
            onChange={(event) =>
              setQuery(event.target.value)
            }
            className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-3 text-zinc-900 shadow-sm outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-200"
          />
        </label>

        <div className="mb-4 flex gap-2 overflow-x-auto pb-2">
          {statusOptions.map((option) => {
            const isActive =
              statusFilter === option.value;

            return (
              <button
                key={option.value}
                type="button"
                onClick={() =>
                  setStatusFilter(option.value)
                }
                className={`shrink-0 rounded-lg border px-3 py-2 text-sm font-medium transition ${
                  isActive
                    ? "border-blue-600 bg-blue-600 text-white shadow-sm"
                    : "border-zinc-300 bg-white text-zinc-700"
                }`}
              >
                {option.label}
                <span
                  className={`ml-2 rounded-full px-2 py-0.5 text-xs ${
                    isActive
                      ? "bg-white/20 text-white"
                      : "bg-zinc-100 text-zinc-600"
                  }`}
                >
                  {statusCounts[option.value] ?? 0}
                </span>
              </button>
            );
          })}
        </div>

        <div className="mb-4 flex items-center justify-between text-sm text-zinc-600">
          <span>{resultLabel}</span>
          <span>{statusLabel}</span>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 gap-4">
            {Array.from({ length: 4 }).map(
              (_, index) => (
                <div
                  key={index}
                  className="overflow-hidden rounded-lg bg-white shadow"
                >
                  <div className="aspect-[3/4] animate-pulse bg-zinc-300" />
                  <div className="space-y-2 p-3">
                    <div className="h-4 animate-pulse rounded bg-zinc-200" />
                    <div className="h-3 w-16 animate-pulse rounded bg-zinc-200" />
                  </div>
                </div>
              )
            )}
          </div>
        ) : hasSeries ? (
          <div className="grid grid-cols-2 gap-4">
            {filteredSeries.map((item) => (
              <article
                key={item.id}
                className="overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-sm"
              >
                {item.cover_url ? (
                  <img
                    src={item.cover_url}
                    alt={item.title}
                    className="aspect-[3/4] w-full bg-zinc-300 object-cover"
                  />
                ) : (
                  <div className="flex aspect-[3/4] items-center justify-center bg-zinc-300 px-3 text-center text-sm font-medium text-zinc-600">
                    No cover
                  </div>
                )}

                <div className="p-3">
                  <h2 className="line-clamp-2 min-h-10 text-sm font-semibold leading-5 text-zinc-900">
                    {item.title}
                  </h2>

                  <div className="mt-2 flex items-center justify-between text-sm text-zinc-600">
                    <span>Ch. {item.chapter}</span>
                    {item.schedule ? (
                      <span className="truncate pl-2">
                        {item.schedule}
                      </span>
                    ) : null}
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-lg border border-dashed border-zinc-300 bg-white p-6 text-center text-zinc-600">
            {emptyMessage}
          </div>
        )}
      </div>
    </main>
  );
}
