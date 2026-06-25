export interface NewsItem {
  title: string;
  url?: string;
  source?: string;
}

export interface NewsResponse {
  articles: NewsItem[];
}
