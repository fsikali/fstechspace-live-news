"use client";

import { useEffect, useState } from "react";

type Post = {
  title: string;
};

export default function TrendingTicker() {
  const [posts, setPosts] = useState<Post[]>([]);

  async function loadNews() {
    try {
      const res = await fetch("/api/news");
      const json = await res.json();
      setPosts(json.data || []);
    } catch {
      setPosts([]);
    }
  }

  useEffect(() => {
    loadNews();
    const interval = setInterval(loadNews, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  if (!posts.length) return null;

  // duplicate for smooth infinite scroll
  const ticker = [...posts.slice(0, 10), ...posts.slice(0, 10)];

  return (
    <div className="overflow-hidden border-b border-gray-800 bg-gray-900">
      <div className="ticker-track flex">
        {ticker.map((post, i) => (
          <span
            key={i}
            className="mx-6 text-sm text-gray-300 whitespace-nowrap"
          >
            🔥 {post.title}
          </span>
        ))}
      </div>
    </div>
  );
}
