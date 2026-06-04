import ReadingCard from "@/components/ReadingCard";
import FloatingAddButton from "@/components/FloatingAddButton";
export default function Home() {
  const readingSeries = [
    {
      id: 1,
      title: "Blue Box",
      chapter: 198,
      schedule: "Tuesday",
    },
    {
      id: 2,
      title: "Dandadan",
      chapter: 201,
      schedule: "Monday",
    },
    {
      id: 3,
      title: "Kagurabachi",
      chapter: 78,
      schedule: "Wednesday",
    },
  ];

  return (
    <main className="min-h-screen bg-zinc-100 p-4">
      <div className="mx-auto max-w-md">
        <h1 className="mb-6 text-3xl font-bold">
          Reading
        </h1>

        <div className="space-y-4">
          {readingSeries.map((series) => (
            <ReadingCard
              key={series.id}
              title={series.title}
              chapter={series.chapter}
              schedule={series.schedule}
            />
          ))}
        </div>
      </div>
      <FloatingAddButton />
    </main>
  );
}