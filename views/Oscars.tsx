
import React, { useState, useMemo } from 'react';
import { Movie } from '../types';
import { MOCK_OSCAR_DATA } from '../constants';
import { Trophy, Award } from 'lucide-react';
import { MovieCard } from '../components/MovieCard';

interface OscarsProps {
  movies: Movie[];
}

export const Oscars: React.FC<OscarsProps> = ({ movies }) => {
  const [selectedYear, setSelectedYear] = useState<number>(2024);
  const [showWinnersOnly, setShowWinnersOnly] = useState(false);

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

  // Check if a film is in the user's catalog (case insensitive match)
  const getCatalogMatch = (filmTitle: string) => {
    return movies.find(m => 
      m.Title.toLowerCase() === filmTitle.toLowerCase() || 
      m.Title.toLowerCase().includes(filmTitle.toLowerCase())
    );
  };

  return (
    <div className="space-y-8">
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
                  // Oscar years are usually ceremony years (e.g., 2024 ceremony honors 2023 films)
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
    </div>
  );
};
