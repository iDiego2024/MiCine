import React from 'react';
import { Film, BarChart3, List, Trophy, Dices } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'catalog', label: 'Catálogo', icon: Film },
    { id: 'analysis', label: 'Análisis', icon: BarChart3 },
    { id: 'afi', label: 'Lista AFI', icon: List },
    { id: 'oscars', label: 'Premios Óscar', icon: Trophy },
    { id: 'pick', label: '¿Qué ver hoy?', icon: Dices },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full bg-cine-950/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-cine-400 to-sky-400 text-transparent bg-clip-text uppercase tracking-tighter">
              Mi Cine
            </span>
          </div>
          <div className="flex space-x-1 sm:space-x-4 overflow-x-auto scrollbar-hide">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium transition-all duration-200 
                    ${isActive 
                      ? 'bg-gradient-to-br from-cine-500/20 to-cine-900 text-cine-400 border border-cine-400/50 shadow-[0_0_15px_rgba(251,191,36,0.1)]' 
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }`}
                >
                  <Icon size={16} />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};