import { Link } from 'react-router-dom';
import { Play, Star } from 'lucide-react';
import type { Anime } from '@/types';

interface AnimeCardProps {
  anime: Anime;
}

export function AnimeCard({ anime }: AnimeCardProps) {
  return (
    <Link 
      to={`/anime/${anime.slug}`}
      className="group bg-white/[0.04] border border-white/[0.08] rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:border-[#e63946]/40 hover:shadow-[0_12px_40px_rgba(0,0,0,0.5),0_0_20px_rgba(230,57,70,0.15)]"
    >
      <div className="relative aspect-[2/3] overflow-hidden">
        <img 
          src={anime.cover} 
          alt={anime.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/200x300/0e0e1a/e63946?text=No+Image';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#08080f]/95 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="w-12 h-12 bg-[#e63946] rounded-full flex items-center justify-center transform scale-70 group-hover:scale-100 transition-transform duration-300">
            <Play className="w-5 h-5 text-white fill-white ml-0.5" />
          </div>
        </div>
        <span className={`absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full text-[0.7rem] font-bold uppercase tracking-wide ${
          anime.status === 'Ongoing' 
            ? 'bg-[#20c864]/90 text-white' 
            : 'bg-[#7209b7]/90 text-white'
        }`}>
          {anime.status}
        </span>
      </div>
      
      <div className="p-3">
        <h3 className="font-semibold text-[0.95rem] text-[#f0f0f0] truncate mb-1">{anime.title}</h3>
        <div className="flex justify-between items-center text-xs text-[#888]">
          <span>{anime.total_episodes} Ep</span>
          <span className="flex items-center gap-1 text-[#ffd700]">
            <Star className="w-3 h-3 fill-[#ffd700]" />
            {anime.rating}
          </span>
        </div>
      </div>
    </Link>
  );
}
