import { Film, Play, BadgeCheck, Subtitles } from 'lucide-react';

interface StatsBarProps {
  totalAnime: number;
  totalEpisodes: number;
}

export function StatsBar({ totalAnime, totalEpisodes }: StatsBarProps) {
  const stats = [
    { icon: Film, value: totalAnime.toString(), label: 'Total Anime' },
    { icon: Play, value: `${totalEpisodes}+`, label: 'Total Episode' },
    { icon: BadgeCheck, value: 'FREE', label: 'Tanpa Biaya' },
    { icon: Subtitles, value: 'SUB ID', label: 'Subtitle Indonesia' },
  ];

  return (
    <div className="px-[5%] -mt-8 relative z-10">
      <div className="bg-gradient-to-br from-[#0e0e1a] to-[#14141f] border border-white/[0.08] rounded-2xl p-7 grid grid-cols-2 md:grid-cols-4 gap-5 text-center">
        {stats.map((stat, index) => (
          <div key={index} className="stat-item">
            <div className="font-['Bebas_Neue'] text-3xl md:text-4xl text-[#e63946] tracking-wider mb-1">
              {stat.value}
            </div>
            <div className="text-xs text-[#888] uppercase tracking-wider flex items-center justify-center gap-1.5">
              <stat.icon className="w-3.5 h-3.5" />
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
