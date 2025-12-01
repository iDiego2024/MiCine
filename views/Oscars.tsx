import React, { useState, useMemo } from 'react';
import { Movie } from '../types';
import { MOCK_OSCAR_DATA } from '../constants';
import { Trophy, Award, Scroll, Search } from 'lucide-react';
import { MovieCard } from '../components/MovieCard';

interface OscarsProps {
  movies: Movie[];
}

export const Oscars: React.FC<OscarsProps> = ({ movies }) => {
  const [selectedYear, setSelectedYear] = useState<number>(2024);
  const [showWinnersOnly, setShowWinnersOnly] = useState(false);
  const [statMovieSearch, setStatMovieSearch] = useState('');

  // Get available years from mock data
  const availableYears = useMemo(() => {
    return Array.from(new Set(MOCK_OSCAR_DATA.map(n => n.year))).sort((a, b) => b - a);
  }, []);

  // Process data for the selected year
  const yearData = useMemo(() => {
    return MOCK_OSCAR_DATA.filter(n => n.year === selectedYear);
  }, [selectedYear]);

  // Group by category
  const categories = useMemo(() => {
    const cats = new Set(yearData.map(n => n.category));
    return Array.from(cats);
  }, [yearData]);

  // Get all unique movies in Oscar data for the stats dropdown
  const allOscarMovies = useMemo(() => {
    const films = new Set(MOCK_OSCAR_DATA.map(n => n.film));
    return Array.from(films).sort();
  }, []);

  // Check if a film is in the user's catalog (case insensitive match)
  const getCatalogMatch = (filmTitle: string) => {
    return movies.find(m => 
      m.Title.toLowerCase() === filmTitle.toLowerCase() || 
      m.Title.toLowerCase().includes(filmTitle.toLowerCase())
    );
  };

  // Movie Stats Logic
  const selectedMovieStats = useMemo(() => {
    if (!statMovieSearch) return null;
    const stats = MOCK_OSCAR_DATA.filter(m => m.film === statMovieSearch);
    if (stats.length === 0) return null;

    const wins = stats.filter(s => s.winner).length;
    const totalNominations = stats.length;
    const year = stats[0].year; // Assuming mainly one year, or take the first

    return {
      film: statMovieSearch,
      year,
      wins,
      totalNominations,
      details: stats
    };
  }, [statMovieSearch]);

  return (
    <div className="space-y-12">
      {/* Header Section */}
      <div className="bg-cine-900 border border-slate-800 p-6 rounded-2xl">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-cine-400/10 rounded-full">
              <Trophy size={32} className="text-cine-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Premios Oscar</h2>
              <p className="text-slate-400 text-sm">Explora nominados y ganadores por año</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
            {/* Year Filter */}
            <div className="flex items-center gap-2 bg-slate-800/50 p-1 rounded-lg border border-slate-700 w-full sm:w-auto overflow-x-auto">
              {availableYears.map(year => (
                <button
                  key={year}
                  onClick={() => setSelectedYear(year)}
                  className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all flex-1 sm:flex-none whitespace-nowrap ${
                    selectedYear === year 
                      ? 'bg-cine-500 text-cine-950 shadow-lg' 
                      : 'text-slate-400 hover:text-white hover:bg-slate-700'
                  }`}
                >
                  {year}
                </button>
              ))}
            </div>

            {/* Winners Toggle */}
            <button
              onClick={() => setShowWinnersOnly(!showWinnersOnly)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium transition-all w-full sm:w-auto justify-center ${
                showWinnersOnly
                  ? 'bg-green-500/10 border-green-500/50 text-green-400'
                  : 'bg-slate-800/50 border-slate-700 text-slate-300 hover:border-slate-500'
              }`}
            >
              <Award size={16} />
              {showWinnersOnly ? 'Solo Ganadores' : 'Todos'}
            </button>
          </div>
        </div>
      </div>

      {/* Warning/Info Banner */}
      <div className="p-3 bg-blue-900/20 border border-blue-800/50 rounded-lg text-xs text-blue-200/70 flex items-center justify-center gap-2">
        <span>ℹ️</span>
        <span>Mostrando datos históricos. Los ganadores están resaltados en verde.</span>
      </div>

      {/* Categories Grid */}
      <div className="space-y-12">
        {categories.map(category => {
          const nominations = yearData.filter(n => n.category === category);
          const filteredNominations = showWinnersOnly 
            ? nominations.filter(n => n.winner)
            : nominations;

          if (filteredNominations.length === 0) return null;

          return (
            <div key={category} className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h3 className="text-xl font-bold text-white mb-6 border-b border-slate-800 pb-2 flex items-center gap-2 sticky top-20 bg-cine-950/95 backdrop-blur z-20 py-2">
                <span className="w-1.5 h-6 bg-cine-500 rounded-full"></span>
                {category}
              </h3>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
                {filteredNominations.map((nom, idx) => {
                  const match = getCatalogMatch(nom.film);
                  
                  // Use catalog movie data if available, otherwise construct a ghost movie object for the card
                  const movieData: Movie = match || {
                    Const: `oscar-${idx}`,
                    Title: nom.film,
                    Year: selectedYear - 1, 
                    YourRating: null,
                    IMDbRating: null,
                    Genres: [],
                    Directors: [],
                    RuntimeMins: 0,
                    NumVotes: 0,
                    DateRated: '',
                    OriginalTitle: nom.film,
                    ReleaseDate: '',
                    TitleType: 'Movie',
                    URL: ''
                  };

                  return (
                    <MovieCard 
                      key={`${category}-${idx}`} 
                      movie={movieData} 
                      oscarContext={{
                        category: category,
                        nominee: nom.nominee,
                        isWinner: nom.winner
                      }}
                    />
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Divider */}
      <div className="border-t border-slate-800 my-12"></div>

      {/* Movie Specific Stats Section */}
      <div className="bg-cine-900/50 border border-slate-800 rounded-2xl p-8">
        <div className="flex items-center gap-3 mb-6">
          <Scroll className="text-cine-400" size={28} />
          <h2 className="text-2xl font-bold text-white">Historial por Película</h2>
        </div>
        
        <p className="text-slate-400 mb-6">Consulta el desglose detallado de premios y nominaciones para una película específica.</p>

        <div className="relative max-w-md mb-8">
          <select
            value={statMovieSearch}
            onChange={(e) => setStatMovieSearch(e.target.value)}
            className="w-full bg-cine-950 border border-slate-700 text-slate-200 rounded-xl px-4 py-3 appearance-none focus:outline-none focus:border-cine-400 focus:ring-1 focus:ring-cine-400"
          >
            <option value="">Selecciona una película...</option>
            {allOscarMovies.map(movie => (
              <option key={movie} value={movie}>{movie}</option>
            ))}
          </select>
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" size={18} />
        </div>

        {selectedMovieStats && (
          <div className="animate-in slide-in-from-bottom-4 duration-500 flex flex-col md:flex-row gap-8">
            {/* Left: Movie Card Presentation */}
            <div className="w-full md:w-64 flex-shrink-0">
               <MovieCard 
                  movie={getCatalogMatch(selectedMovieStats.film) || {
                    Const: `stat-${selectedMovieStats.film}`,
                    Title: selectedMovieStats.film,
                    Year: selectedMovieStats.year - 1,
                    YourRating: null,
                    IMDbRating: null,
                    Genres: [],
                    Directors: [],
                    RuntimeMins: 0,
                    NumVotes: 0,
                    DateRated: '',
                    OriginalTitle: selectedMovieStats.film,
                    ReleaseDate: '',
                    TitleType: 'Movie',
                    URL: ''
                  }} 
               />
            </div>

            {/* Right: Stats Details */}
            <div className="flex-grow">
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="bg-cine-950 border border-cine-500/30 px-5 py-3 rounded-xl">
                  <div className="text-xs text-cine-400 uppercase tracking-wider font-bold mb-1">Premios Ganados</div>
                  <div className="text-3xl font-bold text-white flex items-center gap-2">
                    {selectedMovieStats.wins} 
                    <Trophy size={20} className="text-yellow-500" />
                  </div>
                </div>
                <div className="bg-cine-950 border border-slate-700 px-5 py-3 rounded-xl">
                  <div className="text-xs text-slate-400 uppercase tracking-wider font-bold mb-1">Nominaciones</div>
                  <div className="text-3xl font-bold text-white flex items-center gap-2">
                    {selectedMovieStats.totalNominations}
                    <Scroll size={20} className="text-slate-500" />
                  </div>
                </div>
              </div>

              <div className="bg-cine-950 rounded-xl border border-slate-800 overflow-hidden">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-900/50 text-slate-400 uppercase text-xs font-bold">
                    <tr>
                      <th className="px-6 py-3">Categoría</th>
                      <th className="px-6 py-3">Nominado</th>
                      <th className="px-6 py-3 text-right">Resultado</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {selectedMovieStats.details.map((detail, idx) => (
                      <tr key={idx} className={`hover:bg-slate-800/30 transition-colors ${detail.winner ? 'bg-green-900/10' : ''}`}>
                        <td className="px-6 py-4 font-medium text-slate-200">{detail.category}</td>
                        <td className="px-6 py-4 text-slate-400">{detail.nominee}</td>
                        <td className="px-6 py-4 text-right">
                          {detail.winner ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-green-500/20 text-green-400 border border-green-500/30">
                              <Trophy size={10} /> Ganador
                            </span>
                          ) : (
                            <span className="text-slate-500">Nominado</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};