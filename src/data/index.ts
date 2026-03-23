// ============================================================
// AnimeXStream Pro — Type Definitions
// ============================================================

// ============================================================
// AnimeXStream Pro — Type Definitions
// ============================================================

export interface Server {
  name: string;
  url: string;
}

export interface Episode {
  number: number;
  title: string;
  description: string;
  servers: Server[];
}

export interface Anime {
  id: number;
  title: string;
  slug: string;
  cover: string;
  banner: string;
  status: 'Ongoing' | 'Completed';
  total_episodes: number;
  genres: string[];
  year: number;
  studio: string;
  rating: string;
  description: string;
  trailer: string;
}

export interface Donator {
  id: number;
  name: string;
  amount: number;
  message: string;
  date: string;
}

export interface SiteSettings {
  site_name: string;
  site_tagline: string;
  gojek_number: string;
  dana_link: string;
  ovo_link: string;
  shopee_link: string;
  whatsapp_number: string;
  whatsapp_msg: string;
  qris_image: string;
  admin_password: string;
  featured_slug: string;
}

export interface Database {
  settings: SiteSettings;
  anime: Anime[];
  episodes: Record<string, Episode[]>;
  donators: Donator[];
}
