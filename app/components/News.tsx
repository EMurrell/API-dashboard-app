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
          className="border border-white bg-white/10 hover:bg-sky-600 flex rounded-xl p-8">
          <h1>{article.title}</h1>
        </a>
      ))}
    </section>
  );
}
