import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';

interface FooterProps {
  siteName: string;
}

export function Footer({ siteName }: FooterProps) {
  const splitIndex = Math.floor(siteName.length / 2);
  const logoPart1 = siteName.slice(0, splitIndex);
  const logoMid = siteName[splitIndex];
  const logoPart2 = siteName.slice(splitIndex + 1);

  return (
    <footer className="bg-[#0e0e1a] border-t border-white/[0.08] pt-10 pb-5">
      <div className="px-[5%]">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-10 mb-8">
          <div>
            <Link to="/" className="font-['Bebas_Neue'] text-2xl tracking-wider text-[#f0f0f0] inline-block mb-3">
              {logoPart1}<span className="text-[#e63946]">{logoMid}</span>{logoPart2}
            </Link>
            <p className="text-sm text-[#888] leading-relaxed max-w-md">
              Platform streaming anime subtitle Indonesia terlengkap. Nikmati anime favoritmu secara gratis dengan kualitas terbaik.
            </p>
          </div>
          
          <div>
            <h4 className="font-['Bebas_Neue'] tracking-wider text-lg mb-3.5 text-[#e63946]">Navigasi</h4>
            <div className="flex flex-col gap-2">
              <Link to="/" className="text-sm text-[#888] hover:text-[#f0f0f0] transition-colors">Home</Link>
              <Link to="/" className="text-sm text-[#888] hover:text-[#f0f0f0] transition-colors">Daftar Anime</Link>
              <Link to="/admin" className="text-sm text-[#888] hover:text-[#f0f0f0] transition-colors">Admin</Link>
            </div>
          </div>
          
          <div>
            <h4 className="font-['Bebas_Neue'] tracking-wider text-lg mb-3.5 text-[#e63946]">Info</h4>
            <div className="flex flex-col gap-2">
              <span className="text-sm text-[#888] hover:text-[#f0f0f0] transition-colors cursor-pointer">Tentang Kami</span>
              <span className="text-sm text-[#888] hover:text-[#f0f0f0] transition-colors cursor-pointer">DMCA</span>
              <span className="text-sm text-[#888] hover:text-[#f0f0f0] transition-colors cursor-pointer">Request Anime</span>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/[0.08] pt-5 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-[#888]">
          <span>© 2025 {siteName}</span>
          <span className="flex items-center gap-1">
            Made with <Heart className="w-3.5 h-3.5 text-[#e63946] fill-[#e63946]" /> for Anime Fans
          </span>
        </div>
      </div>
    </footer>
  );
}
