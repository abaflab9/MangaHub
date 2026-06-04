"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AddSeriesPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [chapter, setChapter] = useState(1);
  const [schedule, setSchedule] = useState("");

  async function handleSave() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert("You must be logged in.");
      return;
    }

    const { error } = await supabase
      .from("user_series")
      .insert({
        user_id: user.id,
        title,
        chapter,
        schedule,
      });

    if (error) {
      alert(error.message);
      return;
    }

    router.push("/");
  }

  return (
    <main className="p-4">
      <div className="mx-auto max-w-md">
        <h1 className="mb-6 text-3xl font-bold">
          Add Series
        </h1>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Series Title"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
            className="w-full rounded border p-3"
          />

          <input
            type="number"
            placeholder="Current Chapter"
            value={chapter}
            onChange={(e) =>
              setChapter(Number(e.target.value))
            }
            className="w-full rounded border p-3"
          />

          <input
            type="text"
            placeholder="Schedule (optional)"
            value={schedule}
            onChange={(e) =>
              setSchedule(e.target.value)
            }
            className="w-full rounded border p-3"
          />

          <button
            onClick={handleSave}
            className="w-full rounded bg-blue-600 p-3 text-white"
          >
            Save Series
          </button>
        </div>
      </div>
    </main>
  );
}