import { Roboto_Mono } from "next/font/google";
import Wrapper from "./Wrapper";

const mono = Roboto_Mono({ subsets: ["latin"] });

async function fetchNews() {
  const apiKey = process.env.NEWS_API_KEY;

  try {
    const response = await fetch(
      `https://newsdata.io/api/1/news?apikey=${apiKey}&country=ca&language=en`
    );
    const data = await response.json();

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
    <Wrapper>
      <p className="text-5xl pb-4 font-semibold bg-gradient-to-r from-sky-600 via-cyan-400 to-teal-500 inline-block text-transparent bg-clip-text w-full text-center">
        Latest News
      </p>
      <div className={mono.className}>
        {uniqueArticles?.slice(0, 3).map((article: any) => (
          <a
            key={article.article_id}
            href={article.link}
            className="flex flex-col justify-center p-2  hover:bg-sky-600/30 rounded-2xl transition ease-in-out duration-300"
          >
            <span className="text-lg line-clamp-2">{article.title}</span>
            <span className="text-[11px] text-white/60 mt-1">
              {article.pubDate}
            </span>

            <span className="text-sm mt-3 text-white/60 font-light line-clamp-2">
              {article.description
                ? article.description
                : "No description available"}
            </span>
            <span className="w-full h-0.5 bg-white/60 mt-6"></span>
          </a>
        ))}
      </div>
    </Wrapper>
  );
}
