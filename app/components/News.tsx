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
    <section>
      {uniqueArticles?.map((article: any) => (
        <a
          key={article.article_id}
          href={article.link}
          className="flex flex-col mt-4 justify-center px-6 py-4 lg:px-8 lg:py-6 hover:bg-sky-600/30 transition ease-in-out duration-300 bg-white/10 backdrop-blur rounded-2xl border border-white min-h-10 max-w-lg">
          <span className="text-lg ">{article.title}</span>
          <span className="text-sm mt-2 text-white/60 font-light line-clamp-3">
            {article.description}
          </span>
        </a>
      ))}
    </section>
  );
}
