
import React, { useState, useMemo } from 'react';
import { Movie, FilterState, SortOption, SortDirection } from '../types';
import { MovieCard } from '../components/MovieCard';
import { Search, SlidersHorizontal, X, ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';

interface CatalogProps {
  movies: Movie[];
}

export const Catalog: React.FC<CatalogProps> = ({ movies }) => {
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    yearRange: [1920, 2030],
    ratingRange: [0, 10],
    selectedGenres: [],
    searchQuery: '',
    sortOption: 'DateRated',
    sortDirection: 'desc',
  });

  const allGenres = useMemo(() => {
    const genres = new Set<string>();
    movies.forEach(m => m.Genres.forEach(g => genres.add(g)));
    return Array.from(genres).sort();
  }, [movies]);

  const filteredMovies = useMemo(() => {
    // 1. Filter
    let result = movies.filter(movie => {
      const matchesSearch = movie.Title.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
                            movie.Directors.some(d => d.toLowerCase().includes(filters.searchQuery.toLowerCase()));
      const matchesYear = movie.Year >= filters.yearRange[0] && movie.Year <= filters.yearRange[1];
      const matchesRating = (movie.YourRating || 0) >= filters.ratingRange[0] && (movie.YourRating || 0) <= filters.ratingRange[1];
      const matchesGenre = filters.selectedGenres.length === 0 || 
                           filters.selectedGenres.every(g => movie.Genres.includes(g));
      
      return matchesSearch && matchesYear && matchesRating && matchesGenre;
    });

    // 2. Sort
    result.sort((a, b) => {
      let valA: any = a[filters.sortOption];
      let valB: any = b[filters.sortOption];

      // Handle nulls always at bottom for desc, top for asc usually, but let's standardize
      if (valA === null) valA = -Infinity;
      if (valB === null) valB = -Infinity;

      if (filters.sortOption === 'Title') {
        valA = a.Title.toLowerCase();
        valB = b.Title.toLowerCase();
      }

      if (valA < valB) return filters.sortDirection === 'asc' ? -1 : 1;
      if (valA > valB) return filters.sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    return result;
  }, [movies, filters]);

  // Handle Genre Toggle
  const toggleGenre = (genre: string) => {
    setFilters(prev => ({
      ...prev,
      selectedGenres: prev.selectedGenres.includes(genre)
        ? prev.selectedGenres.filter(g => g !== genre)
        : [...prev.selectedGenres, genre]
    }));
  };

  const toggleSortDirection = () => {
    setFilters(prev => ({
      ...prev,
      sortDirection: prev.sortDirection === 'asc' ? 'desc' : 'asc'
    }));
  };

  return (
    <div className="space-y-6">
      {/* Search and Filter Bar */}
      <div className="sticky top-20 z-40 bg-cine-950/95 backdrop-blur border border-slate-800 rounded-2xl p-4 shadow-xl">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
            <input
              type="text"
              placeholder="Buscar título, director..."
              className="w-full bg-cine-900 border border-slate-700 rounded-xl py-2 pl-10 pr-4 text-slate-200 focus:outline-none focus:border-cine-400 focus:ring-1 focus:ring-cine-400 transition-all placeholder:text-slate-600"
              value={filters.searchQuery}
              onChange={(e) => setFilters(prev => ({ ...prev, searchQuery: e.target.value }))}
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-colors whitespace-nowrap
              ${showFilters ? 'bg-cine-400 text-cine-950 border-cine-400 font-semibold' : 'bg-cine-900 text-slate-300 border-slate-700 hover:border-slate-500'}`}
          >
            <SlidersHorizontal size={18} />
            Filtros y Orden
          </button>
        </div>

        {/* Expandable Filters */}
        {showFilters && (
          <div className="mt-4 pt-4 border-t border-slate-800 space-y-6 animate-in slide-in-from-top-2 duration-200">
            
            {/* Sorting Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-4 border-b border-slate-800/50">
               <div>
                 <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-2">
                   <ArrowUpDown size={14} /> Ordenar por
                 </h4>
                 <div className="flex gap-2">
                   <select 
                      value={filters.sortOption}
                      onChange={(e) => setFilters(prev => ({ ...prev, sortOption: e.target.value as SortOption }))}
                      className="bg-cine-900 border border-slate-700 text-slate-200 text-sm rounded-lg focus:ring-cine-400 focus:border-cine-400 block w-full p-2.5"
                   >
                     <option value="DateRated">Fecha Agregado</option>
                     <option value="YourRating">Mi Nota</option>
                     <option value="IMDbRating">Nota IMDb</option>
                     <option value="Year">Año de Estreno</option>
                     <option value="Title">Título</option>
                   </select>
                   
                   <button
                     onClick={toggleSortDirection}
                     className="px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-300 hover:text-white hover:border-slate-500 transition-colors flex items-center gap-2 min-w-[140px] justify-center"
                   >
                     {filters.sortDirection === 'asc' ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
                     <span className="text-sm font-medium">
                       {filters.sortDirection === 'asc' ? 'Ascendente' : 'Descendente'}
                     </span>
                   </button>
                 </div>
               </div>
            </div>

            {/* Genres */}
            <div>
              <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Géneros</h4>
              <div className="flex flex-wrap gap-2">
                {allGenres.map(genre => (
                  <button
                    key={genre}
                    onClick={() => toggleGenre(genre)}
                    className={`text-xs px-3 py-1 rounded-full border transition-all
                      ${filters.selectedGenres.includes(genre)
                        ? 'bg-cine-400/20 border-cine-400 text-cine-400'
                        : 'bg-slate-800/50 border-transparent text-slate-400 hover:bg-slate-800'}`}
                  >
                    {genre}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Year Range */}
              <div>
                <div className="flex justify-between mb-2">
                   <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Año</h4>
                   <span className="text-xs text-cine-400">{filters.yearRange[0]} - {filters.yearRange[1]}</span>
                </div>
                <div className="flex gap-2 items-center">
                   <input 
                     type="range" min="1920" max="2025" 
                     value={filters.yearRange[0]} 
                     onChange={(e) => setFilters(prev => ({...prev, yearRange: [parseInt(e.target.value), prev.yearRange[1]]}))}
                     className="w-full accent-cine-400 h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer"
                   />
                   <input 
                     type="range" min="1920" max="2025" 
                     value={filters.yearRange[1]} 
                     onChange={(e) => setFilters(prev => ({...prev, yearRange: [prev.yearRange[0], parseInt(e.target.value)]}))}
                     className="w-full accent-cine-400 h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer"
                   />
                </div>
              </div>

              {/* Rating Range */}
              <div>
                <div className="flex justify-between mb-2">
                   <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Mi Nota</h4>
                   <span className="text-xs text-cine-400">{filters.ratingRange[0]} - {filters.ratingRange[1]}</span>
                </div>
                <div className="flex gap-2 items-center">
                   <input 
                     type="range" min="0" max="10" 
                     value={filters.ratingRange[0]} 
                     onChange={(e) => setFilters(prev => ({...prev, ratingRange: [parseInt(e.target.value), prev.ratingRange[1]]}))}
                     className="w-full accent-cine-400 h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer"
                   />
                   <input 
                     type="range" min="0" max="10" 
                     value={filters.ratingRange[1]} 
                     onChange={(e) => setFilters(prev => ({...prev, ratingRange: [prev.ratingRange[0], parseInt(e.target.value)]}))}
                     className="w-full accent-cine-400 h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer"
                   />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Results Stats */}
      <div className="flex justify-between items-center text-sm text-slate-400 px-1">
        <span>Mostrando {filteredMovies.length} películas</span>
        {filters.selectedGenres.length > 0 && (
          <button 
            onClick={() => setFilters(prev => ({...prev, selectedGenres: []}))}
            className="flex items-center gap-1 text-cine-400 hover:text-white transition-colors"
          >
            Limpiar <X size={12} />
          </button>
        )}
      </div>

      {/* Grid */}
      {filteredMovies.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
          {filteredMovies.map(movie => (
            <MovieCard key={movie.Const} movie={movie} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <div className="inline-block p-4 rounded-full bg-slate-800/50 mb-4">
            <Search size={40} className="text-slate-600" />
          </div>
          <h3 className="text-xl font-semibold text-slate-300">No se encontraron películas</h3>
          <p className="text-slate-500 mt-2">Intenta ajustar los filtros o la búsqueda.</p>
        </div>
      )}
    </div>
  );
};
