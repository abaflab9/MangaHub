export default function SearchPage() {
  return (
    <main className="p-4">
      <h1 className="mb-6 text-3xl font-bold">
        Search
      </h1>

      <input
        type="text"
        placeholder="Search titles..."
        className="w-full rounded border p-3"
      />
    </main>
  );
}