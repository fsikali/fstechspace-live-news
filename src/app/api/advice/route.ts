import { NextResponse } from "next/server";

const topicsPool = [
  "AI is changing software development",
  "JavaScript is evolving fast",
  "Startups are hiring fewer juniors",
  "Cloud computing demand is rising",
  "Cybersecurity is critical in 2026",
  "Machine learning tools are getting easier",
  "Developers must learn AI tools",
  "Remote jobs are increasing in tech",
];

function randomFrom(arr: string[]) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateInsight(topic: string) {
  if (topic.includes("AI")) {
    return {
      insight:
        "AI will not replace developers, but developers using AI will replace those who don't.",
      action: "Start using AI tools in real projects immediately.",
      warning: "Don't skip fundamentals while learning AI tools.",
      category: "AI",
    };
  }

  if (topic.includes("JavaScript")) {
    return {
      insight:
        "Frameworks change, but JavaScript fundamentals remain permanent.",
      action: "Master async programming and core JS concepts.",
      warning: "Don't chase every new framework.",
      category: "DEV",
    };
  }

  if (topic.includes("Startup")) {
    return {
      insight:
        "Speed of execution matters more than perfect code in startups.",
      action: "Focus on building MVPs quickly.",
      warning: "Avoid overengineering early-stage projects.",
      category: "STARTUP",
    };
  }

  return {
    insight: "Tech is evolving fast — adaptability is your biggest skill.",
    action: "Build real projects consistently.",
    warning: "Avoid tutorial-only learning.",
    category: "TECH",
  };
}

function score() {
  return Math.floor(60 + Math.random() * 40);
}

export async function GET() {
  const data = Array.from({ length: 9 }).map((_, i) => {
    const topic = randomFrom(topicsPool);
    const ai = generateInsight(topic);

    return {
      id: i,
      topic,
      ...ai,
      score: score(),
    };
  });

  return NextResponse.json({
    success: true,
    data,
  });
}
