"use client";
import { supabase } from "@/lib/supabase";
import { useState } from "react";


type SearchResult = {
  series_id: number;
  title: string;
  type: string;
  year: string;
  cover_url: string | null;
};

type MangaUpdatesResult = {
  record?: {
    series_id?: number;
    title?: string;
    type?: string;
    year?: string | number;
    image?: {
      url?: {
        thumb?: string;
      };
    };
  };
};

export default function SearchPage() {

  
  const [query, setQuery] = useState("");

  const [results, setResults] =
  useState<SearchResult[]>([]);

const [loading, setLoading] =
  useState(false);
  

  async function handleSearch() {
    setLoading(true);

try {
const response = await fetch(
  "/api/mangaupdates/search",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
    }),
  }
);

const data = await response.json();
setResults(
  (data.results ?? [])
    .map((item: MangaUpdatesResult) => {
      const record = item.record;

      if (
        !record?.series_id ||
        !record.title
      ) {
        return null;
      }

      return {
        series_id: record.series_id,
        title: record.title,
        type: record.type ?? "Unknown",
        year: String(record.year ?? ""),
        cover_url:
          record.image?.url?.thumb ?? null,
      };
    })
    .filter(
      (item: SearchResult | null): item is SearchResult =>
      item !== null
    )
);
} finally {
  setLoading(false);
}
}

async function handleAdd(result: SearchResult) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    alert("You must be logged in.");
    return;
  }
  const { data: existingSeries } = await supabase
  .from("user_series")
  .select("id")
  .eq("user_id", user.id)
  .eq("mangaupdates_id", result.series_id)
  .maybeSingle();

if (existingSeries) {
  alert("Series already in library.");
  return;
}
  const { error } = await supabase
    .from("user_series")
    .insert({
      user_id: user.id,
      title: result.title,
      chapter: 1,
      status: "reading",
      mangaupdates_id: result.series_id,
      cover_url: result.cover_url,
    });

  if (error) {
    alert(error.message);
    return;
  }

  alert(`${result.title} added!`);
}
  return (
    <main className="min-h-screen bg-zinc-200 p-4">
      <div className="mx-auto max-w-md">
        <h1 className="mb-6 text-3xl font-bold text-zinc-900">
          Search
        </h1>

        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search MangaUpdates..."
            value={query}
            onChange={(e) =>
              setQuery(e.target.value)
            }
            className="flex-1 rounded border p-3"
          />

          <button
            onClick={handleSearch}
            className="rounded bg-blue-600 px-4 text-white"
          >
            Search
          </button>
        </div>


        <div className="mt-6 space-y-3">
            {loading ? (
              <p className="text-zinc-600">
                Searching...
              </p>
            ) : null}

            {results.map((result) => (
              
              <div
                key={result.series_id}
                className="flex gap-3 rounded-xl bg-white p-4 shadow"
              >
                {result.cover_url ? (
                      <img
                        src={result.cover_url}
                        alt={result.title}
                        className="h-24 w-16 rounded object-cover"
                      />
                    ) : (
                      <div className="h-24 w-16 rounded bg-zinc-300" />
                    )}
                  <h2 className="font-semibold text-lg">
                    {result.title}
                  </h2>
                  
                  <p className="text-sm text-zinc-600">
                    {result.type} • {result.year}
                  </p>

                  <button
                    onClick={() => handleAdd(result)}
                    className="mt-3 rounded bg-blue-600 px-3 py-2 text-white"
                  >
                    Add
                  </button>
                </div>
            ))}
          </div>
      </div>
    </main>
  );
}
