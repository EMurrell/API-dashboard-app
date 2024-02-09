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
  const conditionText = data && data.current && data.current.condition ? data.current.condition.text : null;
  const conditionIcon = data && data.current && data.current.condition ? data.current.condition.icon : null;
  return (
    <main className="flex min-h-screen flex-col items-center p-6 lg:p-24 text-neutral-100">
     <div className="max-w-8xl bg-white/10 backdrop-blur rounded-2xl border border-white min-h-10">
      <div className="flex items-center justify-center px-6 py-3.5">
      <p>{conditionText}</p>
      {conditionIcon && <img src={conditionIcon} alt="Weather Icon" width="50"/>}
      </div>
     </div>
    </main>
  );
}
