export const fetcher = async (url: string) => {
  const res = await fetch(url, { cache: "no-store" });

  if (!res.ok) throw new Error("Failed to fetch");

  return res.json();
};
