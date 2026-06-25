"use client";

import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

type Advice = {
  topic: string;
  insight: string;
  action: string;
  warning: string;
  category: string;
  score: number;
};

export default function NewsFeed() {
  const [data, setData] = useState<Advice[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);

    const res = await fetch("/api/advice");
    const json = await res.json();

    setData(json.data || []);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  // 📊 analytics
  const categoryCount = data.reduce((acc: any, item) => {
    acc[item.category] = (acc[item.category] || 0) + 1;
    return acc;
  }, {});

  const pieData = Object.keys(categoryCount).map((key) => ({
    name: key,
    value: categoryCount[key],
  }));

  const COLORS = ["#3b82f6", "#22c55e", "#f97316", "#a855f7"];

  const avgScore =
    data.reduce((a, b) => a + b.score, 0) / (data.length || 1);

  return (
    <div className="min-h-screen bg-black text-white p-6 space-y-10">

      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold">
          🚀 AI Tech Insight SaaS
        </h1>
        <p className="text-gray-400 text-sm mt-1">
          Real-time AI-generated tech advice + analytics dashboard
        </p>
      </div>

      {/* METRICS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

        <div className="bg-gray-900 border border-gray-800 p-4 rounded-xl">
          <p className="text-xs text-gray-400">Total Insights</p>
          <p className="text-xl font-bold">{data.length}</p>
        </div>

        <div className="bg-gray-900 border border-gray-800 p-4 rounded-xl">
          <p className="text-xs text-gray-400">Avg Score</p>
          <p className="text-xl font-bold">
            {Math.round(avgScore)}
          </p>
        </div>

        <div className="bg-gray-900 border border-gray-800 p-4 rounded-xl">
          <p className="text-xs text-gray-400">AI Topics</p>
          <p className="text-xl font-bold">
            {data.filter((d) => d.category === "AI").length}
          </p>
        </div>

        <div className="bg-gray-900 border border-gray-800 p-4 rounded-xl">
          <p className="text-xs text-gray-400">High Score (80+)</p>
          <p className="text-xl font-bold">
            {data.filter((d) => d.score >= 80).length}
          </p>
        </div>

      </div>

      {/* CHARTS */}
      <div className="grid md:grid-cols-2 gap-6">

        {/* BAR CHART */}
        <div className="bg-gray-900 border border-gray-800 p-5 rounded-2xl">
          <h2 className="text-sm text-gray-400 mb-4">
            📊 Content Score Distribution
          </h2>

          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={data}>
              <XAxis
                dataKey="category"
                stroke="#6b7280"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#6b7280"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#111827",
                  border: "1px solid #374151",
                  borderRadius: 8,
                  color: "#fff",
                }}
              />
              <Bar
                dataKey="score"
                fill="#3b82f6"
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* PIE CHART */}
        <div className="bg-gray-900 border border-gray-800 p-5 rounded-2xl">
          <h2 className="text-sm text-gray-400 mb-4">
            🧠 Category Distribution
          </h2>

          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                outerRadius={90}
                innerRadius={55}
                paddingAngle={4}
              >
                {pieData.map((_, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>

              <Tooltip
                contentStyle={{
                  backgroundColor: "#111827",
                  border: "1px solid #374151",
                  borderRadius: 8,
                  color: "#fff",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

      </div>

      {/* FEED */}
      <div>
        <h2 className="text-lg font-semibold mb-4">
          🧠 AI Tech Advice Feed
        </h2>

        {loading && (
          <p className="text-gray-400">
            Generating insights...
          </p>
        )}

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

          {data
            .sort((a, b) => b.score - a.score)
            .map((item, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl bg-gray-900 border border-gray-800 hover:border-blue-500 transition"
              >
                <span className="text-xs text-blue-400">
                  {item.category}
                </span>

                <h3 className="text-lg font-semibold mt-2">
                  {item.topic}
                </h3>

                <p className="text-sm text-gray-300 mt-3">
                  💡 {item.insight}
                </p>

                <p className="text-xs text-gray-400 mt-3">
                  🚀 {item.action}
                </p>

                <p className="text-xs text-red-400 mt-2">
                  ⚠ {item.warning}
                </p>

                <div className="text-xs text-gray-500 mt-4">
                  🔥 Score: {item.score}
                </div>
              </div>
            ))}
        </div>
      </div>

    </div>
  );
}
