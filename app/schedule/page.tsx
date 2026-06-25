"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

type Series = {
  id: string;
  title: string;
  chapter: number;
  schedule: string | null;
  status: string;
};

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const dayAliases: Record<string, string> = {
  sun: "Sunday",
  sunday: "Sunday",
  mon: "Monday",
  monday: "Monday",
  tue: "Tuesday",
  tues: "Tuesday",
  tuesday: "Tuesday",
  wed: "Wednesday",
  weds: "Wednesday",
  wednesday: "Wednesday",
  thu: "Thursday",
  thur: "Thursday",
  thurs: "Thursday",
  thursday: "Thursday",
  fri: "Friday",
  friday: "Friday",
  sat: "Saturday",
  saturday: "Saturday",
};

function normalizeScheduleDay(schedule: string | null) {
  if (!schedule) return null;

  const normalized = schedule
    .trim()
    .toLowerCase();

  return dayAliases[normalized] ?? null;
}

export default function SchedulePage() {
  const router = useRouter();
  const [series, setSeries] = useState<Series[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeDay, setActiveDay] = useState(
    days[new Date().getDay()]
  );

  useEffect(() => {
    async function loadSchedule() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login");
        return;
      }

      const { data, error } = await supabase
        .from("user_series")
        .select("id, title, chapter, schedule, status")
        .eq("user_id", user.id)
        .not("schedule", "is", null)
        .neq("schedule", "")
        .order("title", { ascending: true });

      if (error) {
        console.error(error);
        setLoading(false);
        return;
      }

      setSeries(data ?? []);
      setLoading(false);
    }

    loadSchedule();
  }, [router]);

  const scheduledByDay = useMemo(
    () =>
      days.reduce<Record<string, Series[]>>(
        (grouped, day) => {
          grouped[day] = series.filter(
            (item) =>
              normalizeScheduleDay(item.schedule) === day
          );

          return grouped;
        },
        {}
      ),
    [series]
  );

  const unknownSchedule = useMemo(
    () =>
      series.filter(
        (item) =>
          normalizeScheduleDay(item.schedule) === null
      ),
    [series]
  );

  const activeSeries =
    scheduledByDay[activeDay] ?? [];

  const totalScheduled = series.length;
  const activeCount = activeSeries.length;

  return (
    <main className="min-h-screen bg-zinc-200 p-4 pb-24">
      <div className="mx-auto max-w-md">
        <div className="mb-6">
          <p className="text-sm font-medium uppercase tracking-wide text-blue-700">
            Release tracker
          </p>

          <h1 className="text-3xl font-bold text-zinc-900">
            Schedule
          </h1>
        </div>

        <div className="mb-4 rounded-lg bg-white p-4 shadow-sm">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-sm text-zinc-500">
                {activeDay}
              </p>

              <p className="text-2xl font-bold text-zinc-900">
                {activeCount}
              </p>
            </div>

            <p className="text-sm text-zinc-600">
              {totalScheduled === 1
                ? "1 scheduled title"
                : `${totalScheduled} scheduled titles`}
            </p>
          </div>
        </div>

        <div className="mb-4 flex gap-2 overflow-x-auto pb-2">
          {days.map((day) => {
            const isActive = activeDay === day;
            const count =
              scheduledByDay[day]?.length ?? 0;

            return (
              <button
                key={day}
                type="button"
                onClick={() => setActiveDay(day)}
                className={`shrink-0 rounded-lg border px-3 py-2 text-sm font-medium transition ${
                  isActive
                    ? "border-blue-600 bg-blue-600 text-white shadow-sm"
                    : "border-zinc-300 bg-white text-zinc-700"
                }`}
              >
                {day.slice(0, 3)}
                <span
                  className={`ml-2 rounded-full px-2 py-0.5 text-xs ${
                    isActive
                      ? "bg-white/20 text-white"
                      : "bg-zinc-100 text-zinc-600"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {loading ? (
          <div className="space-y-3">
            {Array.from({ length: 3 }).map(
              (_, index) => (
                <div
                  key={index}
                  className="rounded-lg bg-white p-4 shadow-sm"
                >
                  <div className="h-5 animate-pulse rounded bg-zinc-200" />
                  <div className="mt-3 h-4 w-24 animate-pulse rounded bg-zinc-200" />
                </div>
              )
            )}
          </div>
        ) : activeSeries.length > 0 ? (
          <div className="space-y-3">
            {activeSeries.map((item) => (
              <article
                key={item.id}
                className="rounded-lg border border-zinc-200 bg-white p-4 shadow-sm"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="font-semibold leading-6 text-zinc-900">
                      {item.title}
                    </h2>

                    <p className="mt-1 text-sm text-zinc-600">
                      Ch. {item.chapter}
                    </p>
                  </div>

                  <span className="shrink-0 rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-600">
                    {item.status.replaceAll("_", " ")}
                  </span>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-lg border border-dashed border-zinc-300 bg-white p-6 text-center text-zinc-600">
            No scheduled titles for {activeDay}.
          </div>
        )}

        {!loading && unknownSchedule.length > 0 ? (
          <section className="mt-6">
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-zinc-500">
              Needs schedule cleanup
            </h2>

            <div className="space-y-2">
              {unknownSchedule.map((item) => (
                <div
                  key={item.id}
                  className="rounded-lg bg-white p-3 text-sm text-zinc-700 shadow-sm"
                >
                  {item.title}
                  <span className="ml-2 text-zinc-500">
                    ({item.schedule})
                  </span>
                </div>
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </main>
  );
}
