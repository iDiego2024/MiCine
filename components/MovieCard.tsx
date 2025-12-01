import React, { useEffect, useState } from 'react';
import { Movie, TmdbData, OmdbData } from '../types';
import { getRatingColorClass, getPlaceholderImage, getTmdbData, getReviewUrl, getTrailerUrl, getOscarWins, getOmdbData } from '../utils';
import { Star, ExternalLink, Youtube, FileText, Trophy } from 'lucide-react';

interface MovieCardProps {
  movie: Movie;
  oscarContext?: {
    category: string;
    nominee: string;
    isWinner: boolean;
  };
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie, oscarContext }) => {
  const [tmdbData, setTmdbData] = useState<TmdbData | null>(null);
  const [omdbData, setOmdbData] = useState<OmdbData | null>(null);
  
  // If viewing in Oscar context, override border color logic based on winner status
  const borderColor = oscarContext 
    ? (oscarContext.isWinner ? 'border-green-500 shadow-[0_0_20px_rgba(34,197,94,0.4)]' : 'border-slate-700')
    : getRatingColorClass(movie.YourRating);

  // If not in Oscar context, look for general wins from Mock Data (categories) AND OMDb strings
  const generalOscarWins = !oscarContext ? getOscarWins(movie.Title) : [];

  useEffect(() => {
    let isMounted = true;
    
    getTmdbData(movie.Title, movie.Year).then(data => {
      if (isMounted && data) {
        setTmdbData(data);
      }
    });

    // Fetch awards from OMDb if not already present in context
    getOmdbData(movie.Title, movie.Year).then(data => {
        if (isMounted && data) {
            setOmdbData(data);
        }
    });

    return () => { isMounted = false; };
  }, [movie.Title, movie.Year]);

  // Use TMDB poster if available, otherwise fallback
  const posterUrl = tmdbData?.poster_path || getPlaceholderImage(movie.Title);
  const overview = tmdbData?.overview || "Resumen no disponible.";

  // Determine awards string to show
  const omdbAwards = omdbData?.Awards && omdbData.Awards !== "N/A" ? omdbData.Awards : null;
  const hasOscarInOmdb = omdbAwards && omdbAwards.includes("Oscar");

  return (
    <div className={`relative group bg-cine-900 rounded-xl overflow-hidden border transition-all duration-300 hover:scale-[1.02] hover:z-10 hover:shadow-2xl flex flex-col h-[520px] ${borderColor}`}>
      
      {/* Poster Container */}
      <div className="relative h-[60%] w-full overflow-hidden bg-slate-800">
        <img 
          src={posterUrl} 
          alt={movie.Title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        
        {/* Overlay for Summary (Visible on Group Hover) */}
        <div className="absolute inset-0 bg-cine-950/95 text-white p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 overflow-y-auto scrollbar-hide flex flex-col justify-center text-center">
          <h4 className="text-cine-400 font-bold text-sm uppercase tracking-wider mb-2">Resumen</h4>
          <p className="text-sm leading-relaxed text-slate-300">
            {overview.length > 250 ? overview.substring(0, 250) + "..." : overview}
          </p>
        </div>

        {/* Badges Area */}
        <div className="absolute top-2 left-2 flex flex-col gap-1 max-w-[90%]">
          {/* General Oscar Badge (Catalog Mode) - From Mock */}
          {generalOscarWins.length > 0 && !oscarContext && (
             <div className="bg-gradient-to-r from-yellow-600 to-yellow-400 text-cine-950 text-[10px] font-bold px-2 py-1 rounded shadow-lg flex items-center gap-1 w-fit">
               <Trophy size={10} fill="currentColor" />
               <span>{generalOscarWins.length > 1 ? `${generalOscarWins.length} Oscars` : 'Oscar'}</span>
             </div>
          )}

          {/* OMDb Awards Badge (Fallback or Supplement) */}
          {hasOscarInOmdb && !oscarContext && generalOscarWins.length === 0 && (
              <div className="bg-gradient-to-r from-yellow-600 to-yellow-400 text-cine-950 text-[10px] font-bold px-2 py-1 rounded shadow-lg flex items-center gap-1 w-fit">
              <Trophy size={10} fill="currentColor" />
              <span className="truncate max-w-[120px]">{omdbAwards?.split('.')[0]}</span>
            </div>
          )}
          
          {/* Specific Oscar Context Badge (Oscar Mode) */}
          {oscarContext?.isWinner && (
             <div className="bg-green-500 text-cine-950 text-[10px] font-bold px-2 py-1 rounded shadow-lg flex items-center gap-1 w-fit">
               <Trophy size={10} fill="currentColor" />
               <span>GANADOR</span>
             </div>
          )}
        </div>

        {/* Rating Badge (Absolute top-right) */}
        {movie.YourRating && (
          <div className="absolute top-2 right-2 flex items-center gap-1 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-lg border border-white/10 shadow-lg">
            <Star size={12} className="text-cine-400 fill-cine-400" />
            <span className="text-sm font-bold text-white">{movie.YourRating}</span>
          </div>
        )}
      </div>

      {/* Content Container */}
      <div className="flex flex-col flex-grow p-3 bg-cine-900">
        
        {/* Oscar Specific Info Header */}
        {oscarContext && (
          <div className="mb-2 pb-2 border-b border-slate-800">
            <div className="text-[10px] text-cine-400 font-bold uppercase tracking-wider mb-0.5">
              {oscarContext.category}
            </div>
            <div className={`text-xs font-medium leading-tight ${oscarContext.isWinner ? 'text-white' : 'text-slate-400'}`}>
              {oscarContext.nominee}
            </div>
          </div>
        )}

        {/* Title & Year */}
        <div className="mb-2">
          <h3 className="text-base font-bold text-white leading-tight line-clamp-2" title={movie.Title}>
            {movie.Title}
          </h3>
          <span className="text-xs text-slate-500 font-medium">{movie.Year} • {movie.RuntimeMins > 0 ? `${movie.RuntimeMins} min` : 'Duración N/A'}</span>
        </div>

        {/* Ratings Row */}
        <div className="flex items-center gap-4 mb-3 text-xs">
          {movie.YourRating ? (
            <div className="flex items-center gap-1 text-slate-300" title="Mi Nota">
               <Star size={12} className="text-cine-400 fill-cine-400" />
               <span className="font-bold">{movie.YourRating}</span>
            </div>
          ) : (
            <div className="flex items-center gap-1 text-slate-500" title="Sin calificar">
               <Star size={12} className="text-slate-700" />
               <span>--</span>
            </div>
          )}
          
          <div className="flex items-center gap-1 text-slate-300" title="Nota IMDb">
             <span className="font-bold text-yellow-500">IMDb</span>
             <span>{omdbData?.imdbRating || movie.IMDbRating || '-'}</span>
          </div>
        </div>

        {/* Spacer */}
        <div className="flex-grow"></div>

        {/* Actions Footer */}
        <div className="pt-3 border-t border-slate-800 grid grid-cols-3 gap-2">
           <a 
             href={getReviewUrl(movie.Title, movie.Year)} 
             target="_blank" 
             rel="noopener noreferrer"
             className="flex flex-col items-center justify-center p-1.5 rounded bg-slate-800/50 hover:bg-cine-500/20 text-slate-400 hover:text-cine-400 transition-colors"
             title="Leer Reseñas"
           >
             <FileText size={14} />
             <span className="text-[9px] mt-0.5 uppercase tracking-wide">Reseñas</span>
           </a>
           
           <a 
             href={getTrailerUrl(movie.Title, movie.Year)} 
             target="_blank" 
             rel="noopener noreferrer"
             className="flex flex-col items-center justify-center p-1.5 rounded bg-slate-800/50 hover:bg-red-500/20 text-slate-400 hover:text-red-400 transition-colors"
             title="Ver Trailer"
           >
             <Youtube size={14} />
             <span className="text-[9px] mt-0.5 uppercase tracking-wide">Trailer</span>
           </a>

           {movie.URL && movie.URL.startsWith('http') ? (
             <a 
               href={movie.URL} 
               target="_blank" 
               rel="noopener noreferrer"
               className="flex flex-col items-center justify-center p-1.5 rounded bg-slate-800/50 hover:bg-yellow-500/20 text-slate-400 hover:text-yellow-400 transition-colors"
               title="Ver en IMDb"
             >
               <ExternalLink size={14} />
               <span className="text-[9px] mt-0.5 uppercase tracking-wide">IMDb</span>
             </a>
           ) : (
             <div className="flex flex-col items-center justify-center p-1.5 rounded bg-slate-800/20 text-slate-600 opacity-50 cursor-not-allowed">
                <ExternalLink size={14} />
                <span className="text-[9px] mt-0.5 uppercase tracking-wide">IMDb</span>
             </div>
           )}
        </div>
      </div>
    </div>
  );
};