import { Heart } from 'lucide-react';
import type { Donator } from '@/types';

interface DonatorListProps {
  donators: Donator[];
}

export function DonatorList({ donators }: DonatorListProps) {
  const formatRp = (n: number) => 'Rp ' + n.toLocaleString('id-ID');
  
  const sortedDonators = [...donators].sort((a, b) => b.amount - a.amount);

  if (sortedDonators.length === 0) {
    return (
      <div className="text-center py-8 text-[#888]">
        <Heart className="w-8 h-8 mx-auto mb-2.5 opacity-40" />
        <p className="text-sm">Jadilah donatur pertama!</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2 max-h-[340px] overflow-y-auto pr-1">
      {sortedDonators.map((donator, index) => {
        const initial = donator.name ? donator.name[0].toUpperCase() : '?';
        const isTop = index === 0;
        const isSupporter = donator.amount >= 50000 && index > 0;
        
        return (
          <div 
            key={donator.id} 
            className={`flex items-center gap-2.5 p-3 rounded-lg border animate-in fade-in slide-in-from-y-2 ${
              isTop 
                ? 'bg-[#ffd700]/5 border-[#ffd700]/30' 
                : 'bg-white/[0.04] border-white/[0.08]'
            }`}
          >
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#e63946] to-[#7209b7] flex items-center justify-center font-bold text-sm text-white flex-shrink-0">
              {initial}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold text-[#f0f0f0] truncate">
                {isTop && '🥇 '}{donator.name}
              </div>
              <div className="text-xs font-bold text-[#20c864]">
                {formatRp(donator.amount)}
              </div>
              {donator.message && (
                <div className="text-xs text-[#888] mt-0.5 truncate">"{donator.message}"</div>
              )}
            </div>
            {isTop && (
              <span className="text-[0.7rem] px-2 py-0.5 rounded-full bg-[#ffd700]/20 text-[#ffd700] font-bold flex-shrink-0">
                Top
              </span>
            )}
            {isSupporter && (
              <span className="text-[0.7rem] px-2 py-0.5 rounded-full bg-[#e63946]/15 text-[#e63946] font-bold flex-shrink-0">
                🔥
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}
