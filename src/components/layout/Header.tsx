"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-gray-950/80 backdrop-blur border-b border-gray-800">
      <div className="w-full px-8 py-3 flex justify-between items-center">

        <h1 className="text-lg font-bold">
          FSTechSpace TV
        </h1>

        <nav className="flex gap-6 text-sm text-gray-400">

          <Link href="/" className="hover:text-white">
            Feed
          </Link>

          <Link href="/dashboard" className="hover:text-white">
            Dashboard
          </Link>

        </nav>

      </div>
    </header>
  );
}