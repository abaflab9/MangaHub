export default function SchedulePage() {
  const schedule = {
    Monday: ["Dandadan"],
    Tuesday: ["Blue Box"],
    Wednesday: ["Kagurabachi"],
  };

  return (
    <main className="p-4">
      <h1 className="mb-6 text-3xl font-bold">
        Schedule
      </h1>

      <div className="space-y-6">
        {Object.entries(schedule).map(([day, series]) => (
          <div key={day}>
            <h2 className="mb-2 text-xl font-semibold">
              {day}
            </h2>

            <ul className="space-y-1">
              {series.map((title) => (
                <li key={title}>{title}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </main>
  );
}