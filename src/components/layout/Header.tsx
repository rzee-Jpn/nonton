import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Home, Lock } from 'lucide-react';
import { Input } from '@/components/ui/input';
import type { Anime } from '@/types';

interface HeaderProps {
  siteName: string;
  anime: Anime[];
}

export function Header({ siteName, anime }: HeaderProps) {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  
  const splitIndex = Math.floor(siteName.length / 2);
  const logoPart1 = siteName.slice(0, splitIndex);
  const logoMid = siteName[splitIndex];
  const logoPart2 = siteName.slice(splitIndex + 1);

  const filteredAnime = searchQuery.length >= 2
    ? anime.filter(a => a.title.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 6)
    : [];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?search=${encodeURIComponent(searchQuery)}`);
      setShowResults(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#08080f]/90 backdrop-blur-xl border-b border-white/[0.08]">
      <div className="h-16 px-[5%] flex items-center justify-between">
        <Link to="/" className="font-['Bebas_Neue'] text-2xl tracking-wider text-[#f0f0f0] hover:opacity-90 transition-opacity">
          {logoPart1}<span className="text-[#e63946]">{logoMid}</span>{logoPart2}
        </Link>

        <nav className="flex items-center gap-6">
          <Link 
            to="/" 
            className="text-[#888] hover:text-[#e63946] text-sm font-medium transition-colors flex items-center gap-1.5"
          >
            <Home className="w-4 h-4" />
            <span className="hidden sm:inline">Home</span>
          </Link>

          <div ref={searchRef} className="relative">
            <form onSubmit={handleSearch}>
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Cari anime..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowResults(e.target.value.length >= 2);
                  }}
                  onFocus={() => searchQuery.length >= 2 && setShowResults(true)}
                  className="w-[180px] sm:w-[240px] bg-white/[0.07] border-white/[0.08] rounded-full pl-4 pr-10 py-2 text-sm text-[#f0f0f0] placeholder:text-[#666] focus:border-[#e63946] focus:bg-[#e63946]/5 focus:w-[200px] sm:focus:w-[280px] transition-all"
                />
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#666] pointer-events-none" />
              </div>
            </form>

            {showResults && filteredAnime.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-[#14141f] border border-white/[0.08] rounded-xl overflow-hidden z-[200] max-h-[320px] overflow-y-auto shadow-2xl">
                {filteredAnime.map((a) => (
                  <Link
                    key={a.id}
                    to={`/anime/${a.slug}`}
                    onClick={() => {
                      setSearchQuery('');
                      setShowResults(false);
                    }}
                    className="flex items-center gap-3 p-3 hover:bg-[#e63946]/10 transition-colors"
                  >
                    <img 
                      src={a.cover} 
                      alt={a.title}
                      className="w-9 h-[50px] object-cover rounded"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://via.placeholder.com/36x50';
                      }}
                    />
                    <div className="min-w-0">
                      <div className="text-sm font-semibold text-[#f0f0f0] truncate">{a.title}</div>
                      <div className="text-xs text-[#888]">{a.total_episodes} Ep · {a.status}</div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link 
            to="/admin"
            className="bg-gradient-to-r from-[#7209b7] to-[#e63946] px-4 py-1.5 rounded-md text-white text-xs font-semibold flex items-center gap-1.5 hover:opacity-90 transition-opacity"
          >
            <Lock className="w-3.5 h-3.5" />
            Admin
          </Link>
        </nav>
      </div>
    </header>
  );
}
