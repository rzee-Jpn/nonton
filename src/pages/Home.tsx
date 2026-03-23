import { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Flame, Star, Film, CircleDot, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AnimeCard } from '@/components/ui-custom/AnimeCard';
import { StatsBar } from '@/components/ui-custom/StatsBar';
import type { Anime, SiteSettings } from '@/types';

interface HomeProps {
  settings: SiteSettings;
  anime: Anime[];
  totalEpisodes: number;
}

export function Home({ settings, anime, totalEpisodes }: HomeProps) {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';
  const [activeGenre, setActiveGenre] = useState('all');

  const featured = useMemo(() => {
    return anime.find(a => a.slug === settings.featured_slug) || anime[0];
  }, [anime, settings.featured_slug]);

  const allGenres = useMemo(() => {
    const genres = new Set<string>();
    anime.forEach(a => a.genres.forEach(g => genres.add(g)));
    return ['all', ...Array.from(genres).sort()];
  }, [anime]);

  const filteredAnime = useMemo(() => {
    return anime.filter(a => {
      const matchGenre = activeGenre === 'all' || a.genres.includes(activeGenre);
      const matchSearch = !searchQuery || a.title.toLowerCase().includes(searchQuery.toLowerCase());
      return matchGenre && matchSearch;
    });
  }, [anime, activeGenre, searchQuery]);

  return (
    <div className="min-h-screen bg-[#08080f]">
      {/* Hero Section */}
      {featured && !searchQuery && (
        <section className="relative mt-16 h-[520px] overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center transition-all duration-1000"
            style={{ 
              backgroundImage: `url('${featured.banner || featured.cover}')`,
              filter: 'brightness(0.35) saturate(1.2)'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#08080f]/95 via-[#08080f]/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#08080f] via-transparent to-transparent" />
          
          <div className="relative z-10 h-full flex flex-col justify-center px-[5%] max-w-2xl">
            <span className="inline-flex items-center gap-1.5 bg-gradient-to-r from-[#e63946] to-[#7209b7] px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-white w-fit mb-4">
              <Flame className="w-3.5 h-3.5" />
              Featured
            </span>
            
            <h1 className="font-['Bebas_Neue'] text-5xl md:text-6xl tracking-wider text-[#f0f0f0] mb-3 leading-none drop-shadow-[0_0_20px_rgba(230,57,70,0.3)]">
              {featured.title}
            </h1>
            
            <div className="flex flex-wrap gap-4 mb-3.5 text-sm text-[#888]">
              <span className="flex items-center gap-1 text-[#ffd700]">
                <Star className="w-4 h-4 fill-[#ffd700]" />
                {featured.rating}
              </span>
              <span className="flex items-center gap-1">
                <Film className="w-4 h-4" />
                {featured.total_episodes} Episode
              </span>
              <span className={`flex items-center gap-1 ${featured.status === 'Ongoing' ? 'text-[#20c864]' : 'text-[#a020f0]'}`}>
                <CircleDot className="w-4 h-4" />
                {featured.status}
              </span>
            </div>
            
            <p className="text-[0.95rem] leading-relaxed text-[#f0f0f0]/70 mb-6 line-clamp-3">
              {featured.description}
            </p>
            
            <Link to={`/anime/${featured.slug}`}>
              <Button 
                className="w-fit bg-[#e63946] hover:bg-[#ff4d5a] text-white px-7 py-5 rounded-full font-bold text-base flex items-center gap-2.5 shadow-[0_0_30px_rgba(230,57,70,0.4)] hover:shadow-[0_0_40px_rgba(230,57,70,0.6)] hover:-translate-y-0.5 transition-all"
              >
                <Play className="w-4 h-4 fill-white" />
                Nonton Sekarang
              </Button>
            </Link>
          </div>
        </section>
      )}

      {/* Stats Bar */}
      {!searchQuery && <StatsBar totalAnime={anime.length} totalEpisodes={totalEpisodes} />}

      {/* Anime Grid Section */}
      <section className="py-12 px-[5%]">
        <div className="flex items-center justify-between mb-7">
          <h2 className="font-['Bebas_Neue'] text-3xl tracking-wider text-[#f0f0f0] relative">
            {searchQuery ? `Hasil Pencarian: "${searchQuery}"` : 'Semua Anime'}
            <span className="absolute -bottom-1 left-0 w-10 h-0.5 bg-[#e63946] rounded-full" />
          </h2>
        </div>

        {/* Genre Filters */}
        {!searchQuery && (
          <div className="flex flex-wrap gap-2.5 mb-7">
            {allGenres.map((genre) => (
              <button
                key={genre}
                onClick={() => setActiveGenre(genre)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                  activeGenre === genre
                    ? 'bg-[#e63946] text-white border border-[#e63946]'
                    : 'bg-white/[0.04] text-[#888] border border-white/[0.08] hover:border-[#e63946]/50 hover:text-[#f0f0f0]'
                }`}
              >
                {genre === 'all' ? 'Semua' : genre}
              </button>
            ))}
          </div>
        )}

        {/* Anime Grid */}
        {filteredAnime.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5">
            {filteredAnime.map((a) => (
              <AnimeCard key={a.id} anime={a} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-[#888]">
            <Film className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p className="text-lg">Tidak ada anime yang ditemukan</p>
          </div>
        )}
      </section>
    </div>
  );
}
