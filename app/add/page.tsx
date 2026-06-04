"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AddSeriesPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [chapter, setChapter] = useState(1);
  const [schedule, setSchedule] = useState("");
  const [status, setStatus] = useState("reading");

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
        status,
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

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full rounded border p-3"
          >
            <option value="reading">Reading</option>
            <option value="completed">Completed</option>
            <option value="on_hold">On Hold</option>
            <option value="dropped">Dropped</option>
            <option value="plan_to_read">Plan to Read</option>
          </select>

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