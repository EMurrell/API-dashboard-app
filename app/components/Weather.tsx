async function fetchWeather() {
  const apiKey = process.env.WEATHER_API_KEY;
  const city = "Ottawa";

  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`
    );
    const data = await response.json();
    console.log(data);
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
    <section className="max-w-8xl">
      <h1 className="text-5xl font-semibold bg-gradient-to-r from-sky-600 via-cyan-400 to-teal-500 inline-block text-transparent bg-clip-text">
        {city}
        <span className="text-xl ml-6">
          {region}, {country}
        </span>
      </h1>
      <div className="flex flex-col mt-4 justify-center px-6 py-3.5 bg-white/10 backdrop-blur rounded-2xl border border-white min-h-10">
        <p>Current</p>
        <div className="flex gap-3 items-center">
          <p className="text-3xl flex">{data.current.temp_c}&deg;C</p>
          <p className="text-3xl flex ml-auto">{conditionText}</p>
          {conditionIcon && (
            <img
              src={conditionIcon}
              alt="Weather Icon"
              width="50"
              className="flex"
            />
          )}
        </div>
        <p className="text-xs opacity-50 mt-2">
          Last updated on: {data.current.last_updated}
        </p>
        <div className="flex w-full justify-between gap-2 text-sm mt-2">
          <p>Feels like: {data.current.feelslike_c}&deg;C</p>
          <p>
            Wind: {data.current.wind_dir} {data.current.wind_kph} km/h
          </p>
          <p>Humidity: {data.current.humidity}%</p>
          <p>Visibility: {data.current.vis_km}km</p>
        </div>
        <div className="flex w-full justify-between gap-2 text-sm mt-2">
          <p>Gusts: {data.current.gust_kph} km/h</p>
          <p>UV index: {data.current.uv}</p>
          <p>Precipitation: {data.current.precip_mm}mm</p>
          <p>Pressure: {data.current.pressure_mb}mb</p>
        </div>
      </div>
    </section>
  );
}
