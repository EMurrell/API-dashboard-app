import Weather from "./components/Weather";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-6 lg:p-24 text-neutral-100">
      <Weather />
    </main>
  );
}
