import News from "./components/News";
import Weather from "./components/Weather";

export default function Home() {
  return (
    <main className="relative flex flex-col items-center min-h-screen p-6 bg-black bg-top bg-no-repeat bg-cover lg:p-24 text-neutral-100 bg-pattern">
      <div className="absolute inset-0 bg-gradient-to-br from-black to-black via-black/30"></div>
      <div className="flex flex-col gap-4 mx-auto xl:flex-row max-w-8xl">
        <Weather />
        <News />
      </div>
    </main>
  );
}
