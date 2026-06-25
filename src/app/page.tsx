import Header from "@/components/layout/Header";
import TrendingTicker from "@/components/news/TrendingTicker";
import NewsFeed from "@/components/news/NewsFeed";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <main className="bg-gray-950 min-h-screen text-white flex flex-col">

      <Header />
      <TrendingTicker />

      {/* MAIN CONTAINER */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-8">

        {/* TITLE */}
        <h1 className="text-2xl md:text-3xl font-bold mb-6">
          
        </h1>

        {/* REAL FEED (RSS API) */}
        <NewsFeed />

      </div>

      <Footer />
    </main>
  );
}