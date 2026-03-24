import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Home, StepBack, StepForward, Server, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DonateSection } from '@/components/ui-custom/DonateSection';
import { DonatorList } from '@/components/ui-custom/DonatorList';
import type { Anime, Episode, SiteSettings, Donator } from '@/types';

interface EpisodePlayerProps {
  settings: SiteSettings;
  getAnimeBySlug: (slug: string) => Anime | undefined;
  getEpisodes: (slug: string) => Episode[];
  getEpisode: (slug: string, number: number) => Episode | undefined;
  donators: Donator[];
  setLastWatchedEpisode: (slug: string, episode: number) => void;
  markAsWatched: (slug: string, episode: number) => void;
  preferredServer: number;
  setServerPreference: (index: number) => void;
}

export function EpisodePlayer({
  settings,
  getAnimeBySlug,
  getEpisodes,
  getEpisode,
  donators,
  setLastWatchedEpisode,
  markAsWatched,
  preferredServer,
  setServerPreference
}: EpisodePlayerProps) {
  const { slug, number } = useParams<{ slug: string; number: string }>();
  const navigate = useNavigate();
  const [activeServer, setActiveServer] = useState(preferredServer);
  const [isLoading, setIsLoading] = useState(true);

  const anime = slug ? getAnimeBySlug(slug) : undefined;
  const episodes = slug ? getEpisodes(slug) : [];
  const episode = slug && number ? getEpisode(slug, parseInt(number)) : undefined;

  const currentIndex = episode ? episodes.findIndex(e => e.number === episode.number) : -1;
  const prevEpisode = currentIndex > 0 ? episodes[currentIndex - 1] : null;
  const nextEpisode = currentIndex < episodes.length - 1 ? episodes[currentIndex + 1] : null;

  useEffect(() => {
    if (anime && episode) {
      document.title = `${anime.title} Ep.${episode.number}: ${episode.title} — ${settings.site_name}`;
      setLastWatchedEpisode(anime.slug, episode.number);
      markAsWatched(anime.slug, episode.number);
    }
  }, [anime, episode, settings.site_name, setLastWatchedEpisode, markAsWatched]);

  useEffect(() => {
    if (episode && activeServer >= episode.servers.length) {
      setActiveServer(0);
    }
  }, [episode, activeServer]);

  const handleServerChange = (index: number) => {
    setActiveServer(index);
    setServerPreference(index);
    setIsLoading(true);
  };

  if (!anime || !episode) {
    return (
      <div className="min-h-screen bg-[#08080f] pt-24 px-[5%] text-center">
        <h1 className="text-2xl font-bold text-[#f0f0f0] mb-2">Episode tidak ditemukan</h1>
        <p className="text-[#888] mb-6">Episode atau anime yang Anda cari tidak ada.</p>
        <Button onClick={() => navigate('/')} className="bg-[#e63946] hover:bg-[#ff4d5a]">
          <Home className="w-4 h-4 mr-1" />
          Kembali ke Home
        </Button>
      </div>
    );
  }

  const currentServer = episode.servers[activeServer];

  return (
    <div className="min-h-screen bg-[#08080f]">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#08080f]/92 backdrop-blur-xl border-b border-white/[0.08] h-[60px] px-[4%] flex items-center justify-between">
        <Link to="/" className="font-['Bebas_Neue'] text-2xl tracking-wider text-[#f0f0f0]">
          {settings.site_name.slice(0, Math.floor(settings.site_name.length / 2))}
          <span className="text-[#e63946]">{settings.site_name[Math.floor(settings.site_name.length / 2)]}</span>
          {settings.site_name.slice(Math.floor(settings.site_name.length / 2) + 1)}
        </Link>
        <div className="flex items-center gap-3.5">
          <Link to="/" className="text-[#888] hover:text-[#e63946] text-sm transition-colors">
            <Home className="w-4 h-4" />
          </Link>
          <span className="text-sm text-[#888] hidden sm:inline">
            <Link to={`/anime/${anime.slug}`} className="hover:text-[#f0f0f0] transition-colors">
              {anime.title}
            </Link>
            {' / '}
            <span className="text-[#f0f0f0] font-semibold">Ep.{episode.number}</span>
          </span>
        </div>
      </header>

      {/* Main Content */}
      <div className="mt-[60px] grid grid-cols-1 lg:grid-cols-[1fr_360px] min-h-[calc(100vh-60px)]">
        {/* Player Column */}
        <div className="p-5 lg:pl-[4%] lg:pr-5">
          {/* Player */}
          <div className="relative bg-black rounded-xl overflow-hidden aspect-video border border-white/[0.08]">
            {isLoading && (
              <div className="absolute inset-0 bg-black flex flex-col items-center justify-center gap-3.5 z-10">
                <Loader2 className="w-12 h-12 text-[#e63946] animate-spin" />
                <span className="text-sm text-[#888]">Memuat video...</span>
              </div>
            )}
            <iframe
              src={currentServer?.url}
              className="w-full h-full"
              allowFullScreen
              allow="autoplay; fullscreen"
              sandbox="allow-same-origin allow-scripts allow-forms allow-presentation allow-popups allow-popups-to-escape-sandbox"
              onLoad={() => setIsLoading(false)}
            />
          </div>

          {/* Episode Header */}
          <div className="mt-4 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div>
              <h1 className="font-['Bebas_Neue'] text-2xl tracking-wider text-[#f0f0f0]">
                {anime.title} — Episode {episode.number}
              </h1>
              {episode.title && (
                <p className="text-sm text-[#888] mt-0.5">{episode.title}</p>
              )}
            </div>
            <div className="flex gap-2 flex-shrink-0">
              {prevEpisode ? (
                <Link to={`/episode/${anime.slug}/${prevEpisode.number}`}>
                  <Button variant="outline" className="border-white/[0.08] text-[#f0f0f0] hover:border-[#e63946] hover:text-[#e63946]">
                    <StepBack className="w-4 h-4 mr-1.5" />
                    Prev
                  </Button>
                </Link>
              ) : (
                <Button variant="outline" disabled className="border-white/[0.08] text-[#888] opacity-50">
                  <StepBack className="w-4 h-4 mr-1.5" />
                  Prev
                </Button>
              )}
              {nextEpisode ? (
                <Link to={`/episode/${anime.slug}/${nextEpisode.number}`}>
                  <Button variant="outline" className="border-white/[0.08] text-[#f0f0f0] hover:border-[#e63946] hover:text-[#e63946]">
                    Next
                    <StepForward className="w-4 h-4 ml-1.5" />
                  </Button>
                </Link>
              ) : (
                <Button variant="outline" disabled className="border-white/[0.08] text-[#888] opacity-50">
                  Next
                  <StepForward className="w-4 h-4 ml-1.5" />
                </Button>
              )}
            </div>
          </div>

          {/* Server Selector */}
          <div className="mt-4 bg-[#14141f] border border-white/[0.08] rounded-xl p-4">
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#888] mb-3">
              <Server className="w-4 h-4" />
              Pilih Server
            </div>
            <div className="flex flex-wrap gap-2">
              {episode.servers.map((server, index) => (
                <button
                  key={index}
                  onClick={() => handleServerChange(index)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                    activeServer === index
                      ? 'bg-[#e63946]/15 border border-[#e63946] text-[#e63946]'
                      : 'bg-white/[0.04] border border-white/[0.08] text-[#f0f0f0] hover:border-[#e63946]/40 hover:text-[#e63946]'
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${activeServer === index ? 'bg-[#20c864]' : 'bg-[#888]'}`} />
                  {server.name}
                </button>
              ))}
            </div>
          </div>

          {/* Episode Info */}
          <div className="mt-4 bg-[#14141f] border border-white/[0.08] rounded-xl p-4">
            <h3 className="font-['Bebas_Neue'] text-lg tracking-wider text-[#f0f0f0] mb-2">Tentang Episode</h3>
            <p className="text-sm text-[#888] leading-relaxed">
              {episode.description || 'Tidak ada deskripsi tersedia.'}
            </p>
          </div>

          {/* Mobile Donate */}
          <div className="lg:hidden mt-4">
            <DonateSection settings={settings} />
          </div>
        </div>

        {/* Sidebar */}
        <div className="hidden lg:block p-5 pl-4 pr-[4%] border-l border-white/[0.08] bg-[#0e0e1a]">
          <DonateSection settings={settings} />
          
          <hr className="border-white/[0.08] my-5" />
          
          <div>
            <h3 className="font-['Bebas_Neue'] text-xl tracking-wider text-[#f0f0f0] mb-1">Donatur Bulan Ini</h3>
            <p className="text-xs text-[#888] mb-4">Terima kasih telah mendukung kami!</p>
            <DonatorList donators={donators} />
          </div>
        </div>
      </div>
    </div>
  );
}
