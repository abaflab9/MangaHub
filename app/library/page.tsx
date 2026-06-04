export default function LibraryPage() {
  const series = [
    "Blue Box",
    "Dandadan",
    "Kagurabachi",
    "Chainsaw Man",
  ];

  return (
    <main className="p-4">
      <h1 className="mb-6 text-3xl font-bold">
        Library
      </h1>

      <div className="mb-4 flex gap-2">
        <button>Reading</button>
        <button>Completed</button>
        <button>On Hold</button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {series.map((title) => (
          <div
            key={title}
            className="rounded bg-white p-4 shadow"
          >
            <div className="mb-2 h-32 rounded bg-zinc-300" />
            {title}
          </div>
        ))}
      </div>
    </main>
  );
}