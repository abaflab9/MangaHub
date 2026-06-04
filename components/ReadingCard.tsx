type ReadingCardProps = {
  title: string;
  chapter: number;
  schedule: string;
};

export default function ReadingCard({
  title,
  chapter,
  schedule,
}: ReadingCardProps) {
  return (
    <div className="rounded-xl bg-white p-4 shadow">
      <div className="flex gap-4">
        <div className="h-20 w-14 rounded bg-zinc-300" />

        <div className="flex-1">
          <h2 className="text-lg font-semibold">
            {title}
          </h2>

          <p className="text-zinc-600">
            Ch. {chapter}
          </p>

          <p className="text-sm text-zinc-500">
            {schedule}
          </p>

          <div className="mt-3 flex items-center gap-3">
            <button className="rounded bg-zinc-200 px-3 py-1">
              -
            </button>

            <span className="font-medium">
              {chapter}
            </span>

            <button className="rounded bg-zinc-200 px-3 py-1">
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}