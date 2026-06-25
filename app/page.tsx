"use client";

import { useEffect, useState } from "react";

import ReadingCard from "@/components/ReadingCard";
import FloatingAddButton from "@/components/FloatingAddButton";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

type Series = {
  id: string;
  title: string;
  chapter: number;
  schedule: string | null;
  status: string;
  cover_url: string | null;
};

export default function Home() {
  const router = useRouter();
  const [readingSeries, setReadingSeries] = useState<Series[]>([]);
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    async function loadSeries() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login");
        return;
      }

      const { data, error } = await supabase
        .from("user_series")
        .select("*")
        .eq("user_id", user.id)
        .eq("status", "reading");

      if (error) {
        console.error(error);
        setLoading(false);
        return;
      }

      setReadingSeries(data ?? []);
      setLoading(false);
    }

    loadSeries();
  }, [router]);

  return (
    <main className="min-h-screen bg-zinc-200 p-4">
      <div className="mx-auto max-w-md">
        <h1 className="mb-6 text-3xl font-bold text-zinc-900">
          Reading
        </h1>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="space-y-4">
            {readingSeries.map((series) => (
              <ReadingCard
                key={series.id}
                id={series.id}
                title={series.title}
                chapter={series.chapter}
                schedule={series.schedule ?? ""}
                status={series.status}
                cover_url={series.cover_url}
                onIncrement={incrementChapter}
                onDecrement={decrementChapter}
                onUpdateChapter={updateChapter}
                onUpdateStatus={updateStatus}
              />
            ))}
          </div>
        )}
      </div>

      <FloatingAddButton />
    </main>
  );

  async function updateChapter(
  seriesId: string,
  chapter: number
) {
  const { error } = await supabase
    .from("user_series")
    .update({
      chapter,
    })
    .eq("id", seriesId);

  if (error) {
    console.error(error);
    return;
  }

  setReadingSeries((current) =>
    current.map((s) =>
      s.id === seriesId
        ? { ...s, chapter }
        : s
    )
  );
}

async function updateStatus(
  seriesId: string,
  status: string
) {
  const { error } = await supabase
    .from("user_series")
    .update({
      status,
    })
    .eq("id", seriesId);

  if (error) {
    console.error(error);
    return;
  }

  setReadingSeries((current) =>
    current.filter((s) =>
      status === "reading"
        ? true
        : s.id !== seriesId
    )
  );
}
async function incrementChapter(
  seriesId: string
) {
  const series = readingSeries.find(
    (s) => s.id === seriesId
  );

  if (!series) return;

  const newChapter = series.chapter + 1;

  const { error } = await supabase
    .from("user_series")
    .update({
      chapter: newChapter,
    })
    .eq("id", seriesId);

  if (error) {
    console.error(error);
    return;
  }

  setReadingSeries((current) =>
    current.map((s) =>
      s.id === seriesId
        ? {
            ...s,
            chapter: newChapter,
          }
        : s
    )
  );
}
async function decrementChapter(
  seriesId: string
) {
  const series = readingSeries.find(
    (s) => s.id === seriesId
  );

  if (!series) return;

  if (series.chapter <= 0) return;

  const newChapter = series.chapter - 1;

  const { error } = await supabase
    .from("user_series")
    .update({
      chapter: newChapter,
    })
    .eq("id", seriesId);

  if (error) {
    console.error(error);
    return;
  }

  setReadingSeries((current) =>
    current.map((s) =>
      s.id === seriesId
        ? {
            ...s,
            chapter: newChapter,
          }
        : s
    )
  );
}
}
