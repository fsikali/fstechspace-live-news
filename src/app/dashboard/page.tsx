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
  category: string;
  score: number;
};

export default function Dashboard() {
  const [data, setData] = useState<Advice[]>([]);

  async function load() {
    const res = await fetch("/api/advice");
    const json = await res.json();
    setData(json.data || []);
  }

  useEffect(() => {
    load();
  }, []);

  // 📊 CATEGORY DISTRIBUTION
  const categoryCount = data.reduce((acc: any, item) => {
    acc[item.category] = (acc[item.category] || 0) + 1;
    return acc;
  }, {});

  const pieData = Object.keys(categoryCount).map((key) => ({
    name: key,
    value: categoryCount[key],
  }));

  const COLORS = ["#3b82f6", "#22c55e", "#f97316", "#a855f7"];

  return (
    <div className="p-6 space-y-10">

      <h1 className="text-2xl font-bold">
        📊 Tech Insights Dashboard
      </h1>

      {/* GRID */}
      <div className="grid md:grid-cols-2 gap-6">

        {/* BAR CHART */}
        <div className="bg-gray-900 p-4 rounded-xl">
          <h2 className="text-sm text-gray-400 mb-2">
            Score Distribution
          </h2>

          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={data}>
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="score" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* PIE CHART */}
        <div className="bg-gray-900 p-4 rounded-xl">
          <h2 className="text-sm text-gray-400 mb-2">
            Category Distribution
          </h2>

          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                outerRadius={80}
              >
                {pieData.map((_, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

      </div>

      {/* RAW DATA */}
      <div className="bg-gray-900 p-4 rounded-xl">
        <h2 className="text-sm text-gray-400 mb-4">
          Latest AI Insights
        </h2>

        <div className="space-y-3">
          {data.map((item, i) => (
            <div
              key={i}
              className="flex justify-between text-sm border-b border-gray-800 py-2"
            >
              <span>{item.category}</span>
              <span className="text-blue-400">
                {item.score}
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
