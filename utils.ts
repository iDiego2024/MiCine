
import { Movie, FilterState, TmdbData, OscarNomination, OmdbData } from './types';
import { TMDB_API_KEY, TMDB_BASE_URL, TMDB_IMAGE_BASE_URL, MOCK_OSCAR_DATA, OMDB_API_KEY } from './constants';

// Simple CSV parser that handles quoted strings
export const parseCSV = (csv: string): Movie[] => {
  if (!csv) return [];
  
  const lines = csv.split('\n').filter(line => line.trim() !== '');
  if (lines.length === 0) return [];

  // We assume the first line is headers, but we map manually below for type safety
  const movies: Movie[] = [];

  for (let i = 1; i < lines.length; i++) {
    const row: string[] = [];
    let inQuote = false;
    let currentCell = '';
    
    for (let j = 0; j < lines[i].length; j++) {
      const char = lines[i][j];
      if (char === '"') {
        inQuote = !inQuote;
      } else if (char === ',' && !inQuote) {
        row.push(currentCell.trim());
        currentCell = '';
      } else {
        currentCell += char;
      }
    }
    row.push(currentCell.trim());

    // Clean up quotes from cells
    const cleanRow = row.map(cell => {
      if (cell.startsWith('"') && cell.endsWith('"')) {
        return cell.substring(1, cell.length - 1);
      }
      return cell;
    });

    // Ensure we have at least the Title (index 3) to create a valid movie object
    if (cleanRow.length > 3) {
      const movie: any = {};
      
      // Manual mapping based on expected CSV structure
      // Const, Your Rating, Date Rated, Title, Original Title, URL, Title Type, IMDb Rating, Runtime, Year, Genres, Num Votes, Release Date, Directors
      movie.Const = cleanRow[0] || `unknown-${i}`;
      movie.YourRating = cleanRow[1] ? parseFloat(cleanRow[1]) : null;
      movie.DateRated = cleanRow[2] || '';
      movie.Title = cleanRow[3] || 'Untitled';
      movie.OriginalTitle = cleanRow[4] || movie.Title;
      movie.URL = cleanRow[5] || '';
      movie.TitleType = cleanRow[6] || 'Movie';
      movie.IMDbRating = cleanRow[7] ? parseFloat(cleanRow[7]) : null;
      movie.RuntimeMins = cleanRow[8] ? parseInt(cleanRow[8]) : 0;
      movie.Year = cleanRow[9] ? parseInt(cleanRow[9]) : 0;
      movie.Genres = cleanRow[10] ? cleanRow[10].split(',').map(g => g.trim()) : [];
      movie.NumVotes = cleanRow[11] ? parseInt(cleanRow[11]) : 0;
      movie.ReleaseDate = cleanRow[12] || '';
      // Directors might be the last column and could be missing if empty at end of line
      movie.Directors = cleanRow[13] ? cleanRow[13].split(',').map(d => d.trim()) : [];

      if (movie.Title) {
        movies.push(movie as Movie);
      }
    }
  }
  
  return movies;
};

export const getRatingColorClass = (rating: number | null): string => {
  if (rating === null) return 'border-slate-700 shadow-none';
  if (rating >= 9) return 'border-green-500 shadow-[0_0_15px_rgba(34,197,94,0.3)]';
  if (rating >= 8) return 'border-sky-500 shadow-[0_0_15px_rgba(14,165,233,0.3)]';
  if (rating >= 7) return 'border-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.3)]';
  if (rating >= 6) return 'border-yellow-500 shadow-[0_0_15px_rgba(234,179,8,0.3)]';
  return 'border-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.3)]';
};

export const normalizeString = (str: string | null | undefined): string => {
  if (!str) return '';
  return str.toLowerCase().replace(/[^a-z0-9]/g, '');
};

// Fallback placeholder
export const getPlaceholderImage = (title: string): string => {
  if (!title) return `https://picsum.photos/300/450`;
  let hash = 0;
  for (let i = 0; i < title.length; i++) {
    hash = title.charCodeAt(i) + ((hash << 5) - hash);
  }
  const id = Math.abs(hash) % 1000;
  return `https://picsum.photos/seed/${id}/300/450`;
};

// TMDB Fetcher
export const getTmdbData = async (title: string, year: number): Promise<TmdbData | null> => {
  if (!TMDB_API_KEY || !title) return null;

  try {
    const url = `${TMDB_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(title)}&year=${year}`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.results && data.results.length > 0) {
      // Find exact match or best result
      const bestMatch = data.results[0];
      return {
        poster_path: bestMatch.poster_path ? `${TMDB_IMAGE_BASE_URL}${bestMatch.poster_path}` : null,
        overview: bestMatch.overview,
        backdrop_path: bestMatch.backdrop_path ? `${TMDB_IMAGE_BASE_URL}${bestMatch.backdrop_path}` : null,
        id: bestMatch.id
      };
    }
    return null;
  } catch (error) {
    console.error("Error fetching TMDB data:", error);
    return null;
  }
};

// OMDb Fetcher
export const getOmdbData = async (title: string, year: number): Promise<OmdbData | null> => {
    if (!OMDB_API_KEY || !title) return null;
    try {
        const response = await fetch(`https://www.omdbapi.com/?t=${encodeURIComponent(title)}&y=${year}&apikey=${OMDB_API_KEY}`);
        const data = await response.json();
        if (data.Response === "True") {
            return {
                Awards: data.Awards,
                imdbRating: data.imdbRating
            };
        }
        return null;
    } catch (e) {
        console.error("Error fetching OMDb data:", e);
        return null;
    }
};

// Generate Search Links
export const getReviewUrl = (title: string, year: number) => {
  if (!title) return '#';
  const query = encodeURIComponent(`reseña película ${title} ${year}`);
  return `https://www.google.com/search?q=${query}`;
};

export const getTrailerUrl = (title: string, year: number) => {
  if (!title) return '#';
  const query = encodeURIComponent(`${title} ${year} trailer español`);
  return `https://www.youtube.com/results?search_query=${query}`;
};

// Check for Oscars in Mock Data
export const getOscarWins = (title: string): OscarNomination[] => {
  if (!title) return [];
  const normalizedTitle = normalizeString(title);
  return MOCK_OSCAR_DATA.filter(nom => 
    normalizeString(nom.film) === normalizedTitle && nom.winner
  );
};
