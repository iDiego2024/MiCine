
export interface Movie {
  Const: string;
  YourRating: number | null;
  DateRated: string;
  Title: string;
  OriginalTitle: string;
  URL: string;
  TitleType: string;
  IMDbRating: number | null;
  RuntimeMins: number;
  Year: number;
  Genres: string[];
  NumVotes: number;
  ReleaseDate: string;
  Directors: string[];
}

export type SortOption = 'DateRated' | 'Title' | 'Year' | 'YourRating' | 'IMDbRating';
export type SortDirection = 'asc' | 'desc';

export interface FilterState {
  yearRange: [number, number];
  ratingRange: [number, number];
  selectedGenres: string[];
  searchQuery: string;
  sortOption: SortOption;
  sortDirection: SortDirection;
}

export interface AfiEntry {
  Rank: number;
  Title: string;
  Year: number;
  Seen?: boolean;
  MyRating?: number | null;
}

export interface GenreStat {
  name: string;
  count: number;
  avgRating: number;
}

export interface OscarNomination {
  year: number;
  category: string;
  film: string;
  nominee: string;
  winner: boolean;
}

export interface TmdbData {
  poster_path: string | null;
  overview: string;
  backdrop_path: string | null;
  id: number;
}

export interface OmdbData {
  Awards: string;
  imdbRating: string;
}
