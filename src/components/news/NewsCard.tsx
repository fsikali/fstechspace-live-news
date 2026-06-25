import Link from "next/link";

type Props = {
  title: string;
  url?: string;
  source?: string;
  category?: string;
  score?: number;
};

export default function NewsCard({
  title,
  url,
  source,
  category,
  score,
}: Props) {
  return (
    <Link href={url || "#"} target="_blank" className="block h-full">
      <div className="
        h-full flex flex-col justify-between
        p-6 rounded-2xl
        bg-gray-900 border border-gray-800
        hover:border-blue-500 hover:-translate-y-1
        transition
      ">

        <div>
          <span className="text-xs text-blue-400">
            {category}
          </span>

          <h3 className="text-lg font-semibold mt-2 line-clamp-2">
            {title}
          </h3>
        </div>

        <div className="flex justify-between text-xs text-gray-500 mt-6">
          <span>{source}</span>
          <span>🔥 {Math.round(score || 0)}</span>
        </div>

      </div>
    </Link>
  );
}
