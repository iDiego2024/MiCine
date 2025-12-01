import React, { useState } from 'react';
import { Movie } from '../types';
import { MovieCard } from '../components/MovieCard';
import { Dices, RefreshCw } from 'lucide-react';

interface PickMovieProps {
  movies: Movie[];
}

export const PickMovie: React.FC<PickMovieProps> = ({ movies }) => {
  const [suggestion, setSuggestion] = useState<Movie | null>(null);
  const [filterUnrated, setFilterUnrated] = useState(false);
  const [minImdb, setMinImdb] = useState(7.0);

  const pickMovie = () => {
    let pool = [...movies];
    
    if (filterUnrated) {
      pool = pool.filter(m => m.YourRating === null);
    }
    
    pool = pool.filter(m => (m.IMDbRating || 0) >= minImdb);

    if (pool.length === 0) {
      alert("¡Ninguna película coincide con tus criterios!");
      return;
    }

    const randomIdx = Math.floor(Math.random() * pool.length);
    setSuggestion(pool[randomIdx]);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 text-center pt-8">
      <div>
        <h2 className="text-3xl font-bold text-white mb-3">¿Qué ver hoy?</h2>
        <p className="text-slate-400">Deja que el destino decida tu próxima experiencia cinematográfica.</p>
      </div>

      <div className="bg-cine-900/50 border border-slate-800 p-6 rounded-2xl inline-block w-full text-left">
        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">Criterios</h3>
        
        <div className="space-y-4">
          <label className="flex items-center justify-between cursor-pointer group">
            <span className="text-slate-300 group-hover:text-white transition-colors">Solo pendientes (Sin nota)</span>
            <input 
              type="checkbox" 
              checked={filterUnrated}
              onChange={(e) => setFilterUnrated(e.target.checked)}
              className="accent-cine-400 w-5 h-5"
            />
          </label>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-300">Nota mínima IMDb</span>
              <span className="text-cine-400 font-mono">{minImdb}</span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="10" 
              step="0.1"
              value={minImdb}
              onChange={(e) => setMinImdb(parseFloat(e.target.value))}
              className="w-full accent-cine-400 h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>

        <button
          onClick={pickMovie}
          className="w-full mt-8 bg-gradient-to-r from-cine-500 to-amber-600 hover:from-cine-400 hover:to-amber-500 text-cine-950 font-bold py-4 rounded-xl shadow-lg shadow-amber-900/20 transition-all active:scale-[0.98] flex items-center justify-center gap-3"
        >
          {suggestion ? <RefreshCw size={20} /> : <Dices size={24} />}
          {suggestion ? 'Otra vez' : 'Sugerir Película'}
        </button>
      </div>

      {suggestion && (
        <div className="animate-in fade-in zoom-in duration-300">
          <div className="text-sm text-slate-500 uppercase tracking-widest mb-4">Función de Hoy</div>
          <div className="max-w-xs mx-auto transform hover:scale-105 transition-transform duration-300">
            <MovieCard movie={suggestion} />
          </div>
        </div>
      )}
    </div>
  );
};