import { useState } from 'react';
import { Smartphone, Wallet, CreditCard, ShoppingBag, MessageCircle, QrCode } from 'lucide-react';
import type { SiteSettings } from '@/types';

interface DonateSectionProps {
  settings: SiteSettings;
}

export function DonateSection({ settings }: DonateSectionProps) {
  const [showQRIS, setShowQRIS] = useState(false);

  const gojekHref = `https://wa.me/${settings.gojek_number}?text=${encodeURIComponent(settings.whatsapp_msg)}`;
  const waHref = `https://wa.me/${settings.whatsapp_number}?text=${encodeURIComponent(settings.whatsapp_msg)}`;

  const donateButtons = [
    { 
      name: 'Gojek', 
      href: gojekHref, 
      icon: Smartphone, 
      className: 'bg-gradient-to-br from-[#00880a] to-[#00b010] hover:shadow-[0_8px_24px_rgba(0,176,16,0.3)]',
      color: '#00b010'
    },
    { 
      name: 'DANA', 
      href: settings.dana_link, 
      icon: Wallet, 
      className: 'bg-gradient-to-br from-[#1a8cff] to-[#0062d6] hover:shadow-[0_8px_24px_rgba(26,140,255,0.3)]',
      color: '#1a8cff'
    },
    { 
      name: 'OVO', 
      href: settings.ovo_link, 
      icon: CreditCard, 
      className: 'bg-gradient-to-br from-[#4e2d9e] to-[#6e3dc8] hover:shadow-[0_8px_24px_rgba(110,61,200,0.3)]',
      color: '#6e3dc8'
    },
    { 
      name: 'ShopeePay', 
      href: settings.shopee_link, 
      icon: ShoppingBag, 
      className: 'bg-gradient-to-br from-[#f05a22] to-[#d44010] hover:shadow-[0_8px_24px_rgba(240,90,34,0.3)]',
      color: '#f05a22'
    },
  ];

  return (
    <div className="bg-gradient-to-br from-[#e63946]/10 to-[#7209b7]/5 border border-[#e63946]/20 rounded-xl p-5">
      <div className="text-center mb-4">
        <h3 className="font-['Bebas_Neue'] text-2xl tracking-wider text-[#e63946]">Support Kami</h3>
        <p className="text-xs text-[#888] mt-1">Donasimu membantu kami tetap online & terus update subtitle</p>
      </div>
      
      <div className="grid grid-cols-2 gap-2.5 mb-3">
        {donateButtons.map((btn) => (
          <a
            key={btn.name}
            href={btn.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`${btn.className} flex items-center justify-center gap-2 py-3.5 px-3 rounded-lg text-white font-bold text-sm transition-all hover:-translate-y-0.5`}
          >
            <btn.icon className="w-4 h-4" />
            {btn.name}
          </a>
        ))}
      </div>
      
      <a
        href={waHref}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 w-full bg-[#25d166]/10 border border-[#25d166]/30 text-[#25d166] py-2.5 rounded-lg font-bold text-sm hover:bg-[#25d166]/20 transition-colors"
      >
        <MessageCircle className="w-4 h-4" />
        Donasi via WhatsApp
      </a>
      
      {settings.qris_image && (
        <>
          <button
            onClick={() => setShowQRIS(!showQRIS)}
            className="flex items-center justify-center gap-1.5 text-[#888] text-xs mt-3 hover:text-[#f0f0f0] transition-colors w-full"
          >
            <QrCode className="w-3.5 h-3.5" />
            {showQRIS ? 'Tutup QRIS' : 'Tampilkan QRIS'}
          </button>
          
          {showQRIS && (
            <img 
              src={settings.qris_image} 
              alt="QRIS"
              className="w-40 h-40 object-contain rounded-lg border-2 border-white/[0.08] mx-auto mt-3 bg-white p-1.5"
            />
          )}
        </>
      )}
    </div>
  );
}
