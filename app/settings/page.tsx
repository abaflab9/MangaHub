export default function SettingsPage() {
  return (
    <main className="p-4">
      <h1 className="mb-6 text-3xl font-bold">
        Settings
      </h1>

      <div className="space-y-4">
        <button>Account</button>
        <button>Appearance</button>
        <button>Import / Export</button>
      </div>
    </main>
  );
}