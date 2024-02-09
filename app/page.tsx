import Image from "next/image";

async function fetchWeather() {
  const apiKey = process.env.WEATHER_API_KEY;
  const city = "Ottawa"; 

  try {
    const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`);
    const data = await response.json();
    console.log(data); 
    return data; 
  } catch (error) {
    console.error("Error fetching weather:", error);
    return null; 
  }
}

fetchWeather();

export default async function Home() {
  const data = await fetchWeather()
  const locationText = data && data.location && data.location.name ? data.location.name : null;
  const conditionText = data && data.current && data.current.condition ? data.current.condition.text : null;
  const conditionIcon = data && data.current && data.current.condition ? data.current.condition.icon : null;
  return (
    <main className="flex min-h-screen flex-col items-center p-6 lg:p-24 text-neutral-100">
     <div className="max-w-8xl">
      <h1 className="text-5xl font-semibold bg-gradient-to-r from-sky-600 via-cyan-400 to-teal-500 inline-block text-transparent bg-clip-text">{locationText}</h1>
      <div className="flex flex-col mt-4 justify-center px-6 py-3.5 bg-white/10 backdrop-blur rounded-2xl border border-white min-h-10">
      <p>Current</p>
      <div className="flex gap-3 items-center">
      <p className="text-2xl flex">{conditionText}</p>
      {conditionIcon && <img src={conditionIcon} alt="Weather Icon" width="50" className="flex"/>}
      </div>
      </div>
     </div>
    </main>
  );
}
