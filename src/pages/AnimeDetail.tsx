import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Star, Calendar, Building2, CircleDot, Film, Play, History, Grid3X3, List, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Anime, Episode } from '@/types';

interface AnimeDetailProps {
  getAnimeBySlug: (slug: string) => Anime | undefined;
  getEpisodes: (slug: string) => Episode[];
  loadEpisodes: (slug: string) => Promise<Episode[]>;
  getLastWatchedEpisode: (slug: string) => number | null;
  getWatchedEpisodes: (slug: string) => number[];
}

export function AnimeDetail({ getAnimeBySlug, getEpisodes, loadEpisodes, getLastWatchedEpisode, getWatchedEpisodes }: AnimeDetailProps) {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Lazy load episodes saat halaman dibuka
  useEffect(() => {
    if (slug) loadEpisodes(slug);
  }, [slug, loadEpisodes]);

  const anime = slug ? getAnimeBySlug(slug) : undefined;
  const episodes = slug ? getEpisodes(slug) : [];
  const lastWatched = slug ? getLastWatchedEpisode(slug) : null;
  const watched = slug ? getWatchedEpisodes(slug) : [];

  useEffect(() => {
    if (anime) {
      document.title = `${anime.title} — AnimeXStream`;
    }
  }, [anime]);

  if (!anime) {
    return (
      <div className="min-h-screen bg-[#08080f] pt-24 px-[5%] text-center">
        <Film className="w-16 h-16 mx-auto mb-4 text-[#e63946] opacity-50" />
        <h1 className="text-2xl font-bold text-[#f0f0f0] mb-2">Anime tidak ditemukan</h1>
        <p className="text-[#888] mb-6">Anime yang Anda cari tidak ada dalam database.</p>
        <Button onClick={() => navigate('/')} className="bg-[#e63946] hover:bg-[#ff4d5a]">
          <ChevronLeft className="w-4 h-4 mr-1" />
          Kembali ke Home
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#08080f]">
      {/* Banner */}
      <div className="relative mt-16 h-[380px] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: `url('${anime.banner || anime.cover}')`,
            filter: 'brightness(0.25) saturate(1.3)'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#08080f] via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#08080f]/80 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="px-[5%] relative z-10 -mt-[180px]">
        <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-8 items-start">
          {/* Cover & Buttons */}
          <div className="md:sticky md:top-24">
            <div className="flex md:flex-col gap-4 items-end md:items-stretch">
              <img 
                src={anime.cover} 
                alt={anime.title}
                className="w-28 md:w-full rounded-xl shadow-[0_20px_60px_rgba(0,0,0,0.7),0_0_30px_rgba(230,57,70,0.2)]"
              />
              <div className="flex flex-col gap-2.5 flex-1">
                {episodes.length > 0 && (
                  <Link to={`/episode/${anime.slug}/${episodes[0].number}`}>
                    <Button className="w-full bg-[#e63946] hover:bg-[#ff4d5a] text-white font-bold">
                      <Play className="w-4 h-4 mr-1.5" />
                      Tonton Ep.1
                    </Button>
                  </Link>
                )}
                {lastWatched && lastWatched > 1 && (
                  <Link to={`/episode/${anime.slug}/${lastWatched}`}>
                    <Button variant="outline" className="w-full border-white/[0.08] text-[#f0f0f0] hover:border-[#e63946] hover:text-[#e63946]">
                      <History className="w-4 h-4 mr-1.5" />
                      Lanjut Ep.{lastWatched}
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* Info */}
          <div className="pt-2">
            <h1 className="font-['Bebas_Neue'] text-4xl md:text-5xl tracking-wider text-[#f0f0f0] mb-2 leading-tight">
              {anime.title}
            </h1>
            
            <div className="flex flex-wrap gap-2.5 mb-4">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold border text-[#ffd700] border-[#ffd700]/30 bg-[#ffd700]/10">
                <Star className="w-3.5 h-3.5 fill-[#ffd700]" />
                {anime.rating}
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold border text-[#69c0ff] border-[#69c0ff]/30 bg-[#69c0ff]/10">
                <Calendar className="w-3.5 h-3.5" />
                {anime.year}
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold border text-[#888] border-white/[0.08]">
                <Building2 className="w-3.5 h-3.5" />
                {anime.studio}
              </span>
              <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold border ${
                anime.status === 'Ongoing' 
                  ? 'text-[#4ecb71] border-[#4ecb71]/30 bg-[#4ecb71]/10' 
                  : 'text-[#a020f0] border-[#a020f0]/30 bg-[#a020f0]/10'
              }`}>
                <CircleDot className="w-3.5 h-3.5" />
                {anime.status}
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold border text-[#888] border-white/[0.08]">
                <Film className="w-3.5 h-3.5" />
                {anime.total_episodes} Episode
              </span>
            </div>

            <div className="flex flex-wrap gap-2 mb-5">
              {anime.genres.map((genre) => (
                <span 
                  key={genre}
                  className="px-3 py-1 rounded-xl text-xs font-semibold bg-[#7209b7]/15 text-[#bf7fff] border border-[#7209b7]/30"
                >
                  {genre}
                </span>
              ))}
            </div>

            <p className="text-[0.95rem] leading-7 text-[#f0f0f0]/75 mb-8">
              {anime.description}
            </p>

            {/* Episodes Section */}
            <div className="mt-10">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3.5">
                  <h2 className="font-['Bebas_Neue'] text-2xl tracking-wider text-[#f0f0f0]">Daftar Episode</h2>
                  <span className="bg-[#e63946] text-white px-3 py-1 rounded-full text-xs font-bold">
                    {episodes.length} Ep
                  </span>
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-[#e63946] text-white' : 'bg-white/[0.04] text-[#888] hover:text-[#f0f0f0]'}`}
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-md transition-colors ${viewMode === 'list' ? 'bg-[#e63946] text-white' : 'bg-white/[0.04] text-[#888] hover:text-[#f0f0f0]'}`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {episodes.length > 0 ? (
                viewMode === 'grid' ? (
                  <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2.5">
                    {episodes.map((ep) => (
                      <Link
                        key={ep.number}
                        to={`/episode/${anime.slug}/${ep.number}`}
                        className={`p-2.5 rounded-lg text-center transition-all border ${
                          watched.includes(ep.number)
                            ? 'bg-[#e63946]/15 border-[#e63946]/40 text-[#e63946]'
                            : 'bg-white/[0.04] border-white/[0.08] text-[#f0f0f0] hover:bg-[#e63946]/15 hover:border-[#e63946]/40 hover:text-[#e63946]'
                        }`}
                      >
                        <span className="font-['Bebas_Neue'] text-lg block">{ep.number}</span>
                        <span className="text-[0.65rem] text-[#888]">
                          {watched.includes(ep.number) ? '✓ Watched' : `Ep ${ep.number}`}
                        </span>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col gap-2">
                    {episodes.map((ep) => (
                      <Link
                        key={ep.number}
                        to={`/episode/${anime.slug}/${ep.number}`}
                        className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.04] border border-white/[0.08] text-[#f0f0f0] hover:border-[#e63946]/40 hover:bg-[#e63946]/5 hover:translate-x-1 transition-all"
                      >
                        <div className="w-10 h-10 rounded-lg bg-[#e63946] text-white flex items-center justify-center font-['Bebas_Neue'] text-lg flex-shrink-0">
                          {ep.number}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-sm truncate">{ep.title || `Episode ${ep.number}`}</div>
                          {ep.description && (
                            <div className="text-xs text-[#888] truncate">{ep.description}</div>
                          )}
                        </div>
                        <Play className="w-4 h-4 text-[#e63946] opacity-0 group-hover:opacity-100 transition-opacity" />
                      </Link>
                    ))}
                  </div>
                )
              ) : (
                <div className="text-center py-12 text-[#888]">
                  <Film className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>Belum ada episode tersedia</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="h-16" />
    </div>
  );
}
