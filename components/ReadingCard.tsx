type ReadingCardProps = {
  id: string;
  title: string;
  chapter: number;
  schedule: string;
  onIncrement: (id: string) => void;
  onDecrement: (id: string) => void;
};

export default function ReadingCard({
  id,
  title,
  chapter,
  schedule,
  onIncrement,
  onDecrement,
}: ReadingCardProps) {
  return (
    <div className="rounded-xl bg-white p-4 shadow-lg border border-zinc-200">
      <div className="flex gap-4">
        <div className="h-20 w-14 rounded bg-zinc-300" />

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

          <div className="mt-3 flex items-center gap-3">
            <button
              onClick={() => onDecrement(id)}
              className="rounded bg-blue-600 px-3 py-1 text-white"
            >
              -
            </button>

            <span className="font-medium">
              {chapter}
            </span>

            <button onClick={() => onIncrement(id)} className="rounded bg-blue-600 px-3 py-1 text-white">
  +
</button>
          </div>
        </div>
      </div>
    </div>
  );
}