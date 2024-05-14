import { Roboto_Mono } from "next/font/google";
import Wrapper from "./Wrapper";

const mono = Roboto_Mono({ subsets: ["latin"] });

async function fetchWeather() {
  const apiKey = process.env.WEATHER_API_KEY;
  const city = "Ottawa";

  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`
    );
    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching weather:", error);
    return null;
  }
}

fetchWeather();

export default async function Weather() {
  const data = await fetchWeather();
  const city =
    data && data.location && data.location.name ? data.location.name : null;
  const region =
    data && data.location && data.location.region ? data.location.region : null;
  const country =
    data && data.location && data.location.country
      ? data.location.country
      : null;
  const conditionText =
    data && data.current && data.current.condition
      ? data.current.condition.text
      : null;
  const conditionIcon =
    data && data.current && data.current.condition
      ? data.current.condition.icon
      : null;
  return (
    <Wrapper>
      <p className="text-5xl w-full text-center font-semibold bg-gradient-to-r from-sky-600 via-cyan-400 to-teal-500 inline-block text-transparent bg-clip-text">
        {city}
      </p>
      <span className="mt-1 w-full text-center text-white/60">
        {region}, {country}
      </span>
      <div className={`${mono.className} mt-4`}>
        <p>Current</p>
        <div className="flex gap-3 items-center">
          <p className="text-2xl sm:text-3xl flex">
            {data.current.temp_c}&deg;C
          </p>
          <p className="text-2xl sm:text-3xl flex ml-auto">{conditionText}</p>
          {conditionIcon && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={conditionIcon}
              alt="Weather Icon"
              width="50"
              className="flex"
            />
          )}
        </div>

        <p className="text-xs opacity-50 mt-1">
          Last updated on: {data.current.last_updated}
        </p>
        <div className="text-sm">
          <div className="flex flex-col w-full justify-between gap-2  mt-6">
            <p>Feels like: {data.current.feelslike_c}&deg;C</p>
            <p>
              Wind: {data.current.wind_dir} {data.current.wind_kph} km/h
            </p>
            <p>Gusts: {data.current.gust_kph} km/h</p>
            <p>Humidity: {data.current.humidity}%</p>
            <p>Visibility: {data.current.vis_km}km</p>

            <p>UV index: {data.current.uv}</p>
            <p>Precip: {data.current.precip_mm}mm</p>
            <p>Pressure: {data.current.pressure_mb}mb</p>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}
