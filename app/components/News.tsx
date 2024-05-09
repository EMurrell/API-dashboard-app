async function fetchNews() {
  const apiKey = process.env.NEWS_API_KEY;

  try {
    const response = await fetch(
      `https://newsdata.io/api/1/news?apikey=${apiKey}&country=ca&language=en`
    );
    const data = await response.json();

    console.log("NEWS:", data);
    return data;
  } catch (error) {
    console.error("Error fetching weather:", error);
    return null;
  }
}
fetchNews();

export default async function News() {
  const data = await fetchNews();
  const uniqueHeadlines = new Set();
  const uniqueArticles = data?.results.filter((article: { title: unknown }) => {
    if (!uniqueHeadlines.has(article.title)) {
      uniqueHeadlines.add(article.title);
      return true;
    }
    return false;
  });

  return (
    <section className="lg:px-8 lg:py-6  bg-white/10 backdrop-blur rounded-2xl border border-white min-h-10 max-w-lg">
      <p className="text-5xl pb-4 font-semibold bg-gradient-to-r from-sky-600 via-cyan-400 to-teal-500 inline-block text-transparent bg-clip-text">
        Latest News
      </p>
      {uniqueArticles?.map((article: any) => (
        <a
          key={article.article_id}
          href={article.link}
          className="flex flex-col justify-center mb-2 px-6 py-4 hover:bg-sky-600/30 rounded-2xl transition ease-in-out duration-300">
          <span className="text-lg ">{article.title}</span>
          <span className="text-sm mt-2 text-white/60 font-light line-clamp-3">
            {article.description}
          </span>
        </a>
      ))}
    </section>
  );
}
