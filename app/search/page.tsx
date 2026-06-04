"use client";

import { useState } from "react";

type SearchResult = {
  series_id: number;
  title: string;
  type: string;
  year: string;
};

export default function SearchPage() {

  
  const [query, setQuery] = useState("");

  const [results, setResults] =
  useState<SearchResult[]>([]);

const [loading, setLoading] =
  useState(false);
  

  async function handleSearch() {
    
  setResults([
  {
    series_id: 1,
    title: "Blue Box",
    type: "Manga",
    year: "2021",
  },
]);
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
            {results.map((result) => (
              <div
                  key={result.series_id}
                  className="rounded-xl bg-white p-4 shadow"
                >
                  <h2 className="font-semibold text-lg">
                    {result.title}
                  </h2>

                  <p className="text-sm text-zinc-600">
                    {result.type} • {result.year}
                  </p>
                </div>
            ))}
          </div>
      </div>
    </main>
  );
}