export interface MovieSearchBody {
  id: number;
  title: string;
  description: string;
}
export interface MovieSearchResult {
  hits: {
    total: number;
    hits: Array<{
      _source: MovieSearchBody;
    }>;
  };
}
