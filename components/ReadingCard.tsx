"use client";

import { useState } from "react";

type ReadingCardProps = {
  id: string;
  title: string;
  chapter: number;
  schedule: string;
  status: string;
  cover_url: string | null;
  onIncrement: (id: string) => void;
  onDecrement: (id: string) => void;
  onUpdateChapter: (
    id: string,
    chapter: number
  ) => void;
  onUpdateStatus: (
    id: string,
    status: string
  ) => void;
};

export default function ReadingCard({
  id,
  title,
  chapter,
  schedule,
  status,
  cover_url,
  onIncrement,
  onDecrement,
  onUpdateChapter,
  onUpdateStatus,
}: ReadingCardProps){

  const [isEditing, setIsEditing] =
    useState(false);

  const [editedChapter, setEditedChapter] =
    useState(chapter);

  return (
    <div className="rounded-xl bg-white p-4 shadow-lg border border-zinc-200">
      <div className="flex gap-4">

        {cover_url ? (
          <img
            src={cover_url}
            alt={title}
            className="h-20 w-14 rounded object-cover"
          />
        ) : (
          <div className="h-20 w-14 rounded bg-zinc-300" />
        )}

        <div className="flex-1">
          <h2 className="text-lg font-bold text-zinc-900">
            {title}
          </h2>

          <p className="text-zinc-800 font-medium">
            Ch. {chapter}
          </p>

          <p className="text-sm text-zinc-500">
            {schedule}
          </p>

          <select
            value={status}
            onChange={(e) =>
              onUpdateStatus(id, e.target.value)
            }
            className="mt-2 rounded border px-2 py-1 text-sm"
          >
            <option value="reading">
              Reading
            </option>

            <option value="completed">
              Completed
            </option>

            <option value="on_hold">
              On Hold
            </option>

            <option value="dropped">
              Dropped
            </option>

            <option value="plan_to_read">
              Plan to Read
            </option>
          </select>

          <div className="mt-3 flex items-center gap-3">
            <button
              onClick={() => onDecrement(id)}
              className="rounded bg-blue-600 px-3 py-1 text-white"
            >
              -
            </button>

            {isEditing ? (
              <>
                <input
                  type="number"
                  value={editedChapter}
                  onChange={(e) =>
                    setEditedChapter(
                      Number(e.target.value)
                    )
                  }
                  className="w-20 rounded border px-2 py-1"
                />

                <button
                  onClick={() => {
                    onUpdateChapter(
                      id,
                      editedChapter
                    );

                    setIsEditing(false);
                  }}
                  className="rounded bg-green-600 px-3 py-1 text-white"
                >
                  Save
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="font-medium underline"
              >
                {chapter}
              </button>
            )}

            <button onClick={() => onIncrement(id)} className="rounded bg-blue-600 px-3 py-1 text-white">
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}