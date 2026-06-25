"use client";

import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import type { NewsResponse } from "@/types/news";

export default function useNews() {
  const { data, error, isLoading } = useSWR<NewsResponse>(
    `/api/news?t=${Date.now()}`,
    fetcher,
    {
      refreshInterval: 30000,
      dedupingInterval: 0,
      revalidateOnFocus: true,
    }
  );

  return {
    news: data?.articles ?? [],
    isLoading,
    isError: !!error,
  };
}
