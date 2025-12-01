import React, { useMemo } from 'react';
import { Movie } from '../types';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, LineChart, Line } from 'recharts';

interface AnalysisProps {
  movies: Movie[];
}

export const Analysis: React.FC<AnalysisProps> = ({ movies }) => {
  const stats = useMemo(() => {
    const ratedMovies = movies.filter(m => m.YourRating !== null);
    const avgRating = ratedMovies.reduce((acc, m) => acc + (m.YourRating || 0), 0) / (ratedMovies.length || 1);
    
    // Rating Distribution
    const distribution = Array(11).fill(0);
    ratedMovies.forEach(m => {
      const r = Math.round(m.YourRating || 0);
      if (r >= 0 && r <= 10) distribution[r]++;
    });
    const distData = distribution.map((count, rating) => ({ rating: rating.toString(), count }));

    // Movies by Year
    const yearMap = new Map<number, number>();
    movies.forEach(m => {
      if(m.Year > 1900) yearMap.set(m.Year, (yearMap.get(m.Year) || 0) + 1);
    });
    const yearData = Array.from(yearMap.entries())
      .sort((a, b) => a[0] - b[0])
      .map(([year, count]) => ({ year: year.toString(), count }));

    return {
      total: movies.length,
      rated: ratedMovies.length,
      avg: avgRating.toFixed(2),
      distData,
      yearData
    };
  }, [movies]);

  return (
    <div className="space-y-8">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-cine-900 border border-slate-800 p-6 rounded-2xl shadow-lg relative overflow-hidden">
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-cine-400/10 rounded-full blur-2xl"></div>
          <h3 className="text-slate-400 text-sm font-medium uppercase tracking-wider">Total Películas</h3>
          <p className="text-4xl font-bold text-white mt-2">{stats.total}</p>
        </div>
        <div className="bg-cine-900 border border-slate-800 p-6 rounded-2xl shadow-lg relative overflow-hidden">
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-sky-400/10 rounded-full blur-2xl"></div>
          <h3 className="text-slate-400 text-sm font-medium uppercase tracking-wider">Calificadas</h3>
          <p className="text-4xl font-bold text-white mt-2">{stats.rated}</p>
        </div>
        <div className="bg-cine-900 border border-slate-800 p-6 rounded-2xl shadow-lg relative overflow-hidden">
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-purple-400/10 rounded-full blur-2xl"></div>
          <h3 className="text-slate-400 text-sm font-medium uppercase tracking-wider">Nota Promedio</h3>
          <p className="text-4xl font-bold text-white mt-2">{stats.avg}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Rating Distribution Chart */}
        <div className="bg-cine-900 border border-slate-800 p-6 rounded-2xl shadow-lg">
          <h3 className="text-lg font-bold text-white mb-6">Distribución de Notas</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.distData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
                <XAxis dataKey="rating" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '8px' }}
                  itemStyle={{ color: '#fbbf24' }}
                />
                <Bar dataKey="count" fill="#fbbf24" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Movies by Year Chart */}
        <div className="bg-cine-900 border border-slate-800 p-6 rounded-2xl shadow-lg">
          <h3 className="text-lg font-bold text-white mb-6">Películas por Año de Estreno</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={stats.yearData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
                <XAxis dataKey="year" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '8px' }}
                  itemStyle={{ color: '#38bdf8' }}
                />
                <Line type="monotone" dataKey="count" stroke="#38bdf8" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};