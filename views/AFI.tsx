import React, { useMemo } from 'react';
import { Movie, AfiEntry } from '../types';
import { normalizeString, getRatingColorClass } from '../utils';
import { AFI_LIST } from '../constants';
import { Check, X } from 'lucide-react';

interface AFIProps {
  movies: Movie[];
}

export const AFI: React.FC<AFIProps> = ({ movies }) => {
  const afiData = useMemo(() => {
    // Create a map for fast lookups by normalized title + year
    const userMap = new Map<string, Movie>();
    movies.forEach(m => {
      const key = `${normalizeString(m.Title)}_${m.Year}`;
      userMap.set(key, m);
    });

    return AFI_LIST.map(entry => {
      const key = `${normalizeString(entry.Title)}_${entry.Year}`;
      const match = userMap.get(key);
      return {
        ...entry,
        Seen: !!match,
        MyRating: match ? match.YourRating : null
      };
    });
  }, [movies]);

  const seenCount = afiData.filter(x => x.Seen).length;
  const percentage = Math.round((seenCount / AFI_LIST.length) * 100);

  return (
    <div className="space-y-8">
      {/* Progress Card */}
      <div className="bg-gradient-to-r from-cine-900 to-cine-950 border border-slate-800 p-8 rounded-2xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">AFI 100 Años... 100 Películas</h2>
          <p className="text-slate-400">Progreso Edición 10º Aniversario</p>
        </div>
        <div className="flex items-center gap-6">
          <div className="text-right">
            <div className="text-3xl font-bold text-cine-400">{seenCount} / {AFI_LIST.length}</div>
            <div className="text-sm text-slate-500 font-medium">PELÍCULAS VISTAS</div>
          </div>
          <div className="w-20 h-20 rounded-full border-4 border-slate-800 flex items-center justify-center relative">
             <div className="absolute inset-0 rounded-full border-4 border-cine-400 border-t-transparent animate-spin-slow" style={{ animationDuration: '3s', transform: `rotate(${percentage * 3.6}deg)` }}></div> 
             {/* Note: In a real app we'd use SVG for proper circular progress */}
             <span className="text-lg font-bold text-white">{percentage}%</span>
          </div>
        </div>
      </div>

      {/* List */}
      <div className="bg-cine-900/50 border border-slate-800 rounded-xl overflow-hidden">
        <div className="grid grid-cols-12 bg-cine-900 p-4 border-b border-slate-800 text-xs font-bold text-slate-400 uppercase tracking-wider">
          <div className="col-span-1 text-center">Rank</div>
          <div className="col-span-1 text-center">Estado</div>
          <div className="col-span-6 md:col-span-7">Título</div>
          <div className="col-span-2 md:col-span-1 text-center">Año</div>
          <div className="col-span-2 text-center">Nota</div>
        </div>
        
        <div className="divide-y divide-slate-800">
          {afiData.map((item) => (
            <div key={item.Rank} className={`grid grid-cols-12 p-4 items-center transition-colors hover:bg-slate-800/30 ${item.Seen ? 'bg-cine-400/5' : ''}`}>
              <div className="col-span-1 text-center font-mono text-slate-500">#{item.Rank}</div>
              <div className="col-span-1 flex justify-center">
                {item.Seen ? (
                  <div className="w-6 h-6 rounded-full bg-green-500/20 text-green-500 flex items-center justify-center">
                    <Check size={14} strokeWidth={3} />
                  </div>
                ) : (
                  <div className="w-6 h-6 rounded-full bg-slate-800 text-slate-600 flex items-center justify-center">
                    <X size={14} />
                  </div>
                )}
              </div>
              <div className="col-span-6 md:col-span-7 font-medium text-slate-200">{item.Title}</div>
              <div className="col-span-2 md:col-span-1 text-center text-slate-500 text-sm">{item.Year}</div>
              <div className="col-span-2 flex justify-center">
                {item.MyRating ? (
                  <span className={`px-2 py-1 rounded text-xs font-bold bg-slate-800 border ${getRatingColorClass(item.MyRating).replace('shadow-[0_0_15px_rgba(34,197,94,0.3)]', '')} border-opacity-50`}>
                    {item.MyRating}
                  </span>
                ) : (
                  <span className="text-slate-700 text-xs">-</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};