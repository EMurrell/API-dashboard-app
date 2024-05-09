import News from "./components/News";
import Weather from "./components/Weather";

export default function Home() {
  return (
    <main className="flex min-h-screen  items-center p-6 lg:p-24 text-neutral-100">
      <div className="flex xl:flex-row flex-col max-w-8xl mx-auto gap-4">
        <Weather />
        <News />
      </div>
    </main>
  );
}
