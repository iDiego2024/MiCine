import React, { useState, useEffect } from 'react';
import { parseCSV } from './utils';
import { RAW_CSV_DATA } from './constants';
import { Movie } from './types';
import { Navbar } from './components/Navbar';
import { Catalog } from './views/Catalog';
import { Analysis } from './views/Analysis';
import { AFI } from './views/AFI';
import { Oscars } from './views/Oscars';
import { PickMovie } from './views/PickMovie';

const App: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [activeTab, setActiveTab] = useState('catalog');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data
    const loadData = async () => {
      try {
        const parsed = parseCSV(RAW_CSV_DATA);
        setMovies(parsed);
      } catch (error) {
        console.error("Failed to parse movie data", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-cine-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-cine-400 border-t-transparent rounded-full animate-spin"></div>
          <div className="text-cine-400 font-mono animate-pulse">CARGANDO CATÁLOGO...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cine-950 text-slate-200 font-sans selection:bg-cine-500/30 selection:text-cine-200">
      <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none z-0"></div>
      
      <div className="relative z-10">
        <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {activeTab === 'catalog' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <Catalog movies={movies} />
            </div>
          )}
          {activeTab === 'analysis' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <Analysis movies={movies} />
            </div>
          )}
          {activeTab === 'afi' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <AFI movies={movies} />
            </div>
          )}
          {activeTab === 'oscars' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <Oscars movies={movies} />
            </div>
          )}
          {activeTab === 'pick' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <PickMovie movies={movies} />
            </div>
          )}
        </main>

        <footer className="border-t border-slate-900 bg-cine-950/80 backdrop-blur py-8 mt-12">
          <div className="max-w-7xl mx-auto px-4 text-center text-slate-600 text-sm">
            <p>© {new Date().getFullYear()} Mi Cine. Desarrollado con React & Tailwind.</p>
            <p className="mt-2 text-xs">Datos basados en exportaciones de IMDb.</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default App;