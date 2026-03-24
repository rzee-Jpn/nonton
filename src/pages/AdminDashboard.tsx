import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  LayoutDashboard, Film, PlayCircle, Wallet, Heart, Settings, 
  LogOut, ExternalLink, Plus, RotateCcw, Save, Trash2, Edit, 
  X, Users, DollarSign, Github, Upload, CheckCircle, AlertCircle, Loader2, Eye, EyeOff
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import type { Anime, Episode, Donator, SiteSettings } from '@/types';
import { pushToGitHub } from '@/lib/githubSync';

interface AdminDashboardProps {
  settings: SiteSettings;
  anime: Anime[];
  episodes: Record<string, Episode[]>;
  donators: Donator[];
  totalEpisodes: number;
  totalDonations: number;
  updateSettings: (settings: Partial<SiteSettings>) => void;
  addAnime: (anime: Omit<Anime, 'id'>) => void;
  updateAnime: (id: number, anime: Partial<Anime>) => void;
  deleteAnime: (id: number) => void;
  addEpisode: (slug: string, episode: Omit<Episode, 'number'>, number?: number) => void;
  updateEpisode: (slug: string, number: number, episode: Partial<Episode>) => void;
  deleteEpisode: (slug: string, number: number) => void;
  addDonator: (donator: Omit<Donator, 'id' | 'date'>) => void;
  deleteDonator: (id: number) => void;
  resetToDefault: () => void;
  logout: () => void;
}

export function AdminDashboard({
  settings,
  anime,
  episodes,
  donators,
  totalEpisodes,
  totalDonations,
  updateSettings,
  addAnime,
  updateAnime,
  deleteAnime,
  addEpisode,
  updateEpisode,
  deleteEpisode,
  addDonator,
  deleteDonator,
  resetToDefault,
  logout
}: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showResetDialog, setShowResetDialog] = useState(false);

  // Dashboard Stats
  const stats = [
    { icon: Film, label: 'Total Anime', value: anime.length, color: 'text-[#e63946]' },
    { icon: PlayCircle, label: 'Total Episode', value: totalEpisodes, color: 'text-[#e63946]' },
    { icon: Users, label: 'Donatur', value: donators.length, color: 'text-[#e63946]' },
    { icon: DollarSign, label: 'Total Donasi', value: `Rp ${totalDonations.toLocaleString('id-ID')}`, color: 'text-[#20c864]', valueSize: 'text-xl' },
  ];

  return (
    <div className="min-h-screen bg-[#08080f]">
      {/* Header */}
      <header className="bg-[#0e0e1a] border-b border-white/[0.08] h-[60px] px-[5%] flex items-center justify-between">
        <Link to="/" className="font-['Bebas_Neue'] text-2xl tracking-wider text-[#f0f0f0]">
          {settings.site_name.slice(0, Math.floor(settings.site_name.length / 2))}
          <span className="text-[#e63946]">{settings.site_name[Math.floor(settings.site_name.length / 2)]}</span>
          {settings.site_name.slice(Math.floor(settings.site_name.length / 2) + 1)}
        </Link>
        <div className="flex items-center gap-4">
          <Link to="/" target="_blank" className="text-[#888] hover:text-[#e63946] text-sm flex items-center gap-1.5 transition-colors">
            <ExternalLink className="w-4 h-4" />
            <span className="hidden sm:inline">Lihat Site</span>
          </Link>
          <Button 
            variant="outline" 
            size="sm"
            onClick={logout}
            className="border-[#e63946]/30 text-[#e63946] hover:bg-[#e63946]/10"
          >
            <LogOut className="w-4 h-4 mr-1.5" />
            Logout
          </Button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] min-h-[calc(100vh-60px)]">
        {/* Sidebar */}
        <aside className="bg-[#0e0e1a] border-r border-white/[0.08] p-6">
          <nav className="space-y-6">
            <div>
              <div className="text-[0.7rem] font-bold uppercase tracking-wider text-[#888] mb-2 px-3">Overview</div>
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors ${
                  activeTab === 'dashboard' 
                    ? 'text-[#e63946] bg-[#e63946]/10 border-l-2 border-[#e63946]' 
                    : 'text-[#888] hover:text-[#f0f0f0] hover:bg-white/[0.03]'
                }`}
              >
                <LayoutDashboard className="w-4 h-4" />
                Dashboard
              </button>
            </div>

            <div>
              <div className="text-[0.7rem] font-bold uppercase tracking-wider text-[#888] mb-2 px-3">Konten</div>
              <div className="space-y-1">
                <button
                  onClick={() => setActiveTab('anime')}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors ${
                    activeTab === 'anime' 
                      ? 'text-[#e63946] bg-[#e63946]/10 border-l-2 border-[#e63946]' 
                      : 'text-[#888] hover:text-[#f0f0f0] hover:bg-white/[0.03]'
                  }`}
                >
                  <Film className="w-4 h-4" />
                  Anime
                </button>
                <button
                  onClick={() => setActiveTab('episodes')}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors ${
                    activeTab === 'episodes' 
                      ? 'text-[#e63946] bg-[#e63946]/10 border-l-2 border-[#e63946]' 
                      : 'text-[#888] hover:text-[#f0f0f0] hover:bg-white/[0.03]'
                  }`}
                >
                  <PlayCircle className="w-4 h-4" />
                  Episode
                </button>
              </div>
            </div>

            <div>
              <div className="text-[0.7rem] font-bold uppercase tracking-wider text-[#888] mb-2 px-3">Donasi</div>
              <div className="space-y-1">
                <button
                  onClick={() => setActiveTab('donate')}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors ${
                    activeTab === 'donate' 
                      ? 'text-[#e63946] bg-[#e63946]/10 border-l-2 border-[#e63946]' 
                      : 'text-[#888] hover:text-[#f0f0f0] hover:bg-white/[0.03]'
                  }`}
                >
                  <Wallet className="w-4 h-4" />
                  Pengaturan Donasi
                </button>
                <button
                  onClick={() => setActiveTab('donators')}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors ${
                    activeTab === 'donators' 
                      ? 'text-[#e63946] bg-[#e63946]/10 border-l-2 border-[#e63946]' 
                      : 'text-[#888] hover:text-[#f0f0f0] hover:bg-white/[0.03]'
                  }`}
                >
                  <Heart className="w-4 h-4" />
                  Daftar Donatur
                </button>
              </div>
            </div>

            <div>
              <div className="text-[0.7rem] font-bold uppercase tracking-wider text-[#888] mb-2 px-3">Sistem</div>
              <div className="space-y-1">
                <button
                  onClick={() => setActiveTab('settings')}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors ${
                    activeTab === 'settings' 
                      ? 'text-[#e63946] bg-[#e63946]/10 border-l-2 border-[#e63946]' 
                      : 'text-[#888] hover:text-[#f0f0f0] hover:bg-white/[0.03]'
                  }`}
                >
                  <Settings className="w-4 h-4" />
                  Pengaturan Site
                </button>
                <button
                  onClick={() => setActiveTab('github')}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors ${
                    activeTab === 'github' 
                      ? 'text-[#e63946] bg-[#e63946]/10 border-l-2 border-[#e63946]' 
                      : 'text-[#888] hover:text-[#f0f0f0] hover:bg-white/[0.03]'
                  }`}
                >
                  <Github className="w-4 h-4" />
                  GitHub Sync
                </button>
              </div>
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="p-6 lg:p-8 overflow-y-auto">
          {activeTab === 'dashboard' && (
            <DashboardTab 
              stats={stats} 
              onTabChange={setActiveTab}
              onReset={() => setShowResetDialog(true)}
            />
          )}
          {activeTab === 'anime' && (
            <AnimeTab 
              anime={anime}
              onAdd={addAnime}
              onUpdate={updateAnime}
              onDelete={deleteAnime}
            />
          )}
          {activeTab === 'episodes' && (
            <EpisodesTab
              anime={anime}
              episodes={episodes}
              onAdd={addEpisode}
              onUpdate={updateEpisode}
              onDelete={deleteEpisode}
            />
          )}
          {activeTab === 'donate' && (
            <DonateTab settings={settings} onSave={updateSettings} />
          )}
          {activeTab === 'donators' && (
            <DonatorsTab
              donators={donators}
              onAdd={addDonator}
              onDelete={deleteDonator}
            />
          )}
          {activeTab === 'settings' && (
            <SettingsTab settings={settings} onSave={updateSettings} />
          )}
          {activeTab === 'github' && (
            <GitHubSyncTab 
              settings={settings}
              onSave={updateSettings}
              data={{ settings, anime, episodes, donators }}
            />
          )}
        </main>
      </div>

      {/* Reset Dialog */}
      <Dialog open={showResetDialog} onOpenChange={setShowResetDialog}>
        <DialogContent className="bg-[#14141f] border-white/[0.08] text-[#f0f0f0]">
          <DialogHeader>
            <DialogTitle className="font-['Bebas_Neue'] text-xl tracking-wider">Reset Data</DialogTitle>
            <DialogDescription className="text-[#888]">
              Apakah Anda yakin ingin mereset semua data ke default? Semua perubahan akan hilang!
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowResetDialog(false)} className="border-white/[0.08]">
              Batal
            </Button>
            <Button 
              onClick={() => { resetToDefault(); setShowResetDialog(false); }}
              className="bg-[#e63946] hover:bg-[#ff4d5a]"
            >
              <RotateCcw className="w-4 h-4 mr-1.5" />
              Reset
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Dashboard Tab
function DashboardTab({ 
  stats, 
  onTabChange,
  onReset 
}: { 
  stats: { icon: any; label: string; value: string | number; color: string; valueSize?: string }[];
  onTabChange: (tab: string) => void;
  onReset: () => void;
}) {
  return (
    <div>
      <h2 className="font-['Bebas_Neue'] text-3xl tracking-wider text-[#f0f0f0] mb-1">Dashboard</h2>
      <p className="text-sm text-[#888] mb-6">Selamat datang kembali di Admin Panel.</p>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-[#14141f] border border-white/[0.08] rounded-xl p-5">
            <stat.icon className={`w-6 h-6 ${stat.color} float-right -mt-1 opacity-50`} />
            <div className={`font-['Bebas_Neue'] text-3xl ${stat.color} mb-1 ${stat.valueSize || ''}`}>
              {stat.value}
            </div>
            <div className="text-xs text-[#888] uppercase tracking-wider">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="bg-[#14141f] border border-white/[0.08] rounded-xl p-6">
        <h3 className="font-['Bebas_Neue'] text-lg tracking-wider text-[#f0f0f0] mb-4">Quick Actions</h3>
        <div className="flex flex-wrap gap-3">
          <Button onClick={() => onTabChange('anime')} className="bg-[#e63946] hover:bg-[#ff4d5a]">
            <Plus className="w-4 h-4 mr-1.5" />
            Tambah Anime
          </Button>
          <Button onClick={() => onTabChange('episodes')} className="bg-[#e63946] hover:bg-[#ff4d5a]">
            <Plus className="w-4 h-4 mr-1.5" />
            Tambah Episode
          </Button>
          <Button onClick={() => onTabChange('donators')} className="bg-[#e63946] hover:bg-[#ff4d5a]">
            <Heart className="w-4 h-4 mr-1.5" />
            Tambah Donatur
          </Button>
          <Button onClick={onReset} variant="outline" className="border-[#7209b7] text-[#7209b7] hover:bg-[#7209b7]/10">
            <RotateCcw className="w-4 h-4 mr-1.5" />
            Reset ke Default
          </Button>
        </div>
      </div>
    </div>
  );
}

// Anime Tab
function AnimeTab({ 
  anime, 
  onAdd, 
  onUpdate, 
  onDelete 
}: { 
  anime: Anime[];
  onAdd: (anime: Omit<Anime, 'id'>) => void;
  onUpdate: (id: number, anime: Partial<Anime>) => void;
  onDelete: (id: number) => void;
}) {
  const [editing, setEditing] = useState<Anime | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    cover: '',
    banner: '',
    studio: '',
    status: 'Ongoing' as 'Ongoing' | 'Completed',
    total_episodes: '',
    year: '',
    rating: '',
    genres: '',
    description: '',
  });

  const resetForm = () => {
    setFormData({
      title: '',
      slug: '',
      cover: '',
      banner: '',
      studio: '',
      status: 'Ongoing',
      total_episodes: '',
      year: '',
      rating: '',
      genres: '',
      description: '',
    });
    setEditing(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      title: formData.title,
      slug: formData.slug || formData.title.toLowerCase().replace(/\s+/g, '-'),
      cover: formData.cover,
      banner: formData.banner || formData.cover,
      studio: formData.studio,
      status: formData.status,
      total_episodes: parseInt(formData.total_episodes) || 0,
      year: parseInt(formData.year) || new Date().getFullYear(),
      rating: formData.rating || '8.0',
      genres: formData.genres.split(',').map(g => g.trim()).filter(Boolean),
      description: formData.description,
      trailer: '',
    };

    if (editing) {
      onUpdate(editing.id, data);
    } else {
      onAdd(data);
    }
    resetForm();
  };

  const handleEdit = (a: Anime) => {
    setEditing(a);
    setFormData({
      title: a.title,
      slug: a.slug,
      cover: a.cover,
      banner: a.banner,
      studio: a.studio,
      status: a.status,
      total_episodes: a.total_episodes.toString(),
      year: a.year.toString(),
      rating: a.rating,
      genres: a.genres.join(', '),
      description: a.description,
    });
  };

  return (
    <div>
      <h2 className="font-['Bebas_Neue'] text-3xl tracking-wider text-[#f0f0f0] mb-1">Manajemen Anime</h2>
      <p className="text-sm text-[#888] mb-6">Tambah, edit, atau hapus anime dari database.</p>

      {/* Form */}
      <div className="bg-[#14141f] border border-white/[0.08] rounded-xl p-6 mb-6">
        <h3 className="font-['Bebas_Neue'] text-lg tracking-wider text-[#f0f0f0] mb-4">
          {editing ? 'Edit Anime' : 'Tambah Anime Baru'}
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-xs uppercase tracking-wider text-[#888] mb-1.5">Judul Anime</Label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Contoh: Naruto"
                className="bg-white/[0.06] border-white/[0.08]"
                required
              />
            </div>
            <div>
              <Label className="text-xs uppercase tracking-wider text-[#888] mb-1.5">Slug (URL)</Label>
              <Input
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                placeholder="contoh: naruto"
                className="bg-white/[0.06] border-white/[0.08]"
              />
            </div>
            <div>
              <Label className="text-xs uppercase tracking-wider text-[#888] mb-1.5">URL Cover</Label>
              <Input
                value={formData.cover}
                onChange={(e) => setFormData({ ...formData, cover: e.target.value })}
                placeholder="https://..."
                className="bg-white/[0.06] border-white/[0.08]"
                required
              />
            </div>
            <div>
              <Label className="text-xs uppercase tracking-wider text-[#888] mb-1.5">Studio</Label>
              <Input
                value={formData.studio}
                onChange={(e) => setFormData({ ...formData, studio: e.target.value })}
                placeholder="Studio Pierrot"
                className="bg-white/[0.06] border-white/[0.08]"
              />
            </div>
            <div>
              <Label className="text-xs uppercase tracking-wider text-[#888] mb-1.5">Status</Label>
              <Select 
                value={formData.status} 
                onValueChange={(v) => setFormData({ ...formData, status: v as 'Ongoing' | 'Completed' })}
              >
                <SelectTrigger className="bg-white/[0.06] border-white/[0.08]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#14141f] border-white/[0.08]">
                  <SelectItem value="Ongoing">Ongoing</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-xs uppercase tracking-wider text-[#888] mb-1.5">Total Episode</Label>
              <Input
                type="number"
                value={formData.total_episodes}
                onChange={(e) => setFormData({ ...formData, total_episodes: e.target.value })}
                placeholder="220"
                className="bg-white/[0.06] border-white/[0.08]"
              />
            </div>
            <div>
              <Label className="text-xs uppercase tracking-wider text-[#888] mb-1.5">Tahun Rilis</Label>
              <Input
                type="number"
                value={formData.year}
                onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                placeholder="2002"
                className="bg-white/[0.06] border-white/[0.08]"
              />
            </div>
            <div>
              <Label className="text-xs uppercase tracking-wider text-[#888] mb-1.5">Rating (0-10)</Label>
              <Input
                value={formData.rating}
                onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                placeholder="8.4"
                className="bg-white/[0.06] border-white/[0.08]"
              />
            </div>
          </div>
          <div>
            <Label className="text-xs uppercase tracking-wider text-[#888] mb-1.5">Genre (pisahkan koma)</Label>
            <Input
              value={formData.genres}
              onChange={(e) => setFormData({ ...formData, genres: e.target.value })}
              placeholder="Action, Adventure, Comedy"
              className="bg-white/[0.06] border-white/[0.08]"
            />
          </div>
          <div>
            <Label className="text-xs uppercase tracking-wider text-[#888] mb-1.5">Deskripsi</Label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Cerita singkat anime..."
              className="bg-white/[0.06] border-white/[0.08] min-h-[100px]"
            />
          </div>
          <div className="flex gap-3">
            <Button type="submit" className="bg-[#e63946] hover:bg-[#ff4d5a]">
              <Save className="w-4 h-4 mr-1.5" />
              {editing ? 'Update' : 'Simpan'}
            </Button>
            {editing && (
              <Button type="button" variant="outline" onClick={resetForm} className="border-white/[0.08]">
                <X className="w-4 h-4 mr-1.5" />
                Batal
              </Button>
            )}
          </div>
        </form>
      </div>

      {/* Table */}
      <div className="bg-[#14141f] border border-white/[0.08] rounded-xl overflow-hidden">
        <h3 className="font-['Bebas_Neue'] text-lg tracking-wider text-[#f0f0f0] p-4 pb-2">Daftar Anime</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/[0.08]">
                <th className="text-left p-4 text-xs uppercase tracking-wider text-[#888] font-bold">Cover</th>
                <th className="text-left p-4 text-xs uppercase tracking-wider text-[#888] font-bold">Judul</th>
                <th className="text-left p-4 text-xs uppercase tracking-wider text-[#888] font-bold">Status</th>
                <th className="text-left p-4 text-xs uppercase tracking-wider text-[#888] font-bold">Episode</th>
                <th className="text-left p-4 text-xs uppercase tracking-wider text-[#888] font-bold">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {anime.map((a) => (
                <tr key={a.id} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                  <td className="p-4">
                    <img 
                      src={a.cover} 
                      alt={a.title}
                      className="w-9 h-[50px] object-cover rounded"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://via.placeholder.com/36x50';
                      }}
                    />
                  </td>
                  <td className="p-4">
                    <div className="font-semibold text-sm text-[#f0f0f0]">{a.title}</div>
                    <div className="text-xs text-[#888]">{a.slug}</div>
                  </td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                      a.status === 'Ongoing' 
                        ? 'bg-[#20c864]/15 text-[#20c864]' 
                        : 'bg-[#a020f0]/15 text-[#bf7fff]'
                    }`}>
                      {a.status}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-[#f0f0f0]">{a.total_episodes}</td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => handleEdit(a)} className="border-white/[0.08] h-8">
                        <Edit className="w-3.5 h-3.5" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => onDelete(a.id)}
                        className="border-red-500/30 text-red-500 hover:bg-red-500/10 h-8"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// Episodes Tab
function EpisodesTab({
  anime,
  episodes,
  onAdd,
  onUpdate,
  onDelete
}: {
  anime: Anime[];
  episodes: Record<string, Episode[]>;
  onAdd: (slug: string, episode: Omit<Episode, 'number'>, number?: number) => void;
  onUpdate: (slug: string, number: number, episode: Partial<Episode>) => void;
  onDelete: (slug: string, number: number) => void;
}) {
  const [selectedAnime, setSelectedAnime] = useState(anime[0]?.slug || '');
  const [editing, setEditing] = useState<Episode | null>(null);
  const [formData, setFormData] = useState({
    number: '',
    title: '',
    description: '',
    servers: [{ name: '', url: '' }],
  });

  const currentEpisodes = episodes[selectedAnime] || [];
  const selectedAnimeData = anime.find(a => a.slug === selectedAnime);

  const resetForm = () => {
    setFormData({
      number: '',
      title: '',
      description: '',
      servers: [{ name: '', url: '' }],
    });
    setEditing(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      title: formData.title,
      description: formData.description,
      servers: formData.servers.filter(s => s.name && s.url),
    };

    if (editing) {
      onUpdate(selectedAnime, editing.number, data);
    } else {
      onAdd(selectedAnime, data, formData.number ? parseInt(formData.number) : undefined);
    }
    resetForm();
  };

  const handleEdit = (ep: Episode) => {
    setEditing(ep);
    setFormData({
      number: ep.number.toString(),
      title: ep.title,
      description: ep.description,
      servers: ep.servers.length > 0 ? ep.servers : [{ name: '', url: '' }],
    });
  };

  const addServer = () => {
    setFormData({ ...formData, servers: [...formData.servers, { name: '', url: '' }] });
  };

  const removeServer = (index: number) => {
    setFormData({ 
      ...formData, 
      servers: formData.servers.filter((_, i) => i !== index) 
    });
  };

  const updateServer = (index: number, field: 'name' | 'url', value: string) => {
    const newServers = [...formData.servers];
    newServers[index][field] = value;
    setFormData({ ...formData, servers: newServers });
  };

  if (anime.length === 0) {
    return (
      <div>
        <h2 className="font-['Bebas_Neue'] text-3xl tracking-wider text-[#f0f0f0] mb-1">Manajemen Episode</h2>
        <p className="text-sm text-[#888]">Tambah anime terlebih dahulu untuk mengelola episode.</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="font-['Bebas_Neue'] text-3xl tracking-wider text-[#f0f0f0] mb-1">Manajemen Episode</h2>
      <p className="text-sm text-[#888] mb-6">Tambah atau hapus episode untuk setiap anime.</p>

      {/* Form */}
      <div className="bg-[#14141f] border border-white/[0.08] rounded-xl p-6 mb-6">
        <h3 className="font-['Bebas_Neue'] text-lg tracking-wider text-[#f0f0f0] mb-4">
          {editing ? 'Edit Episode' : 'Tambah Episode'}
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-xs uppercase tracking-wider text-[#888] mb-1.5">Pilih Anime</Label>
              <Select value={selectedAnime} onValueChange={setSelectedAnime}>
                <SelectTrigger className="bg-white/[0.06] border-white/[0.08]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#14141f] border-white/[0.08]">
                  {anime.map((a) => (
                    <SelectItem key={a.slug} value={a.slug}>{a.title}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-xs uppercase tracking-wider text-[#888] mb-1.5">Nomor Episode</Label>
              <Input
                type="number"
                value={formData.number}
                onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                placeholder="1"
                className="bg-white/[0.06] border-white/[0.08]"
                disabled={!!editing}
              />
            </div>
          </div>
          <div>
            <Label className="text-xs uppercase tracking-wider text-[#888] mb-1.5">Judul Episode</Label>
            <Input
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Judul Episode"
              className="bg-white/[0.06] border-white/[0.08]"
            />
          </div>
          <div>
            <Label className="text-xs uppercase tracking-wider text-[#888] mb-1.5">Deskripsi</Label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Deskripsi singkat episode..."
              className="bg-white/[0.06] border-white/[0.08]"
            />
          </div>

          {/* Servers */}
          <div>
            <Label className="text-xs uppercase tracking-wider text-[#888] mb-1.5">Server Video</Label>
            <div className="space-y-2">
              {formData.servers.map((server, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={server.name}
                    onChange={(e) => updateServer(index, 'name', e.target.value)}
                    placeholder="Nama server (misal: YouTube)"
                    className="bg-white/[0.06] border-white/[0.08] flex-1"
                  />
                  <Input
                    value={server.url}
                    onChange={(e) => updateServer(index, 'url', e.target.value)}
                    placeholder="URL Embed"
                    className="bg-white/[0.06] border-white/[0.08] flex-[2]"
                  />
                  {formData.servers.length > 1 && (
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => removeServer(index)}
                      className="border-red-500/30 text-red-500 hover:bg-red-500/10 px-3"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
            <Button type="button" variant="outline" onClick={addServer} className="mt-2 border-white/[0.08] text-sm">
              <Plus className="w-4 h-4 mr-1.5" />
              Tambah Server
            </Button>
          </div>

          <div className="flex gap-3">
            <Button type="submit" className="bg-[#e63946] hover:bg-[#ff4d5a]">
              <Save className="w-4 h-4 mr-1.5" />
              {editing ? 'Update' : 'Simpan'}
            </Button>
            {editing && (
              <Button type="button" variant="outline" onClick={resetForm} className="border-white/[0.08]">
                <X className="w-4 h-4 mr-1.5" />
                Batal
              </Button>
            )}
          </div>
        </form>
      </div>

      {/* Episode List */}
      <div className="bg-[#14141f] border border-white/[0.08] rounded-xl overflow-hidden">
        <h3 className="font-['Bebas_Neue'] text-lg tracking-wider text-[#f0f0f0] p-4 pb-2">
          Daftar Episode: <span className="text-[#e63946]">{selectedAnimeData?.title || '—'}</span>
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/[0.08]">
                <th className="text-left p-4 text-xs uppercase tracking-wider text-[#888] font-bold">#</th>
                <th className="text-left p-4 text-xs uppercase tracking-wider text-[#888] font-bold">Judul</th>
                <th className="text-left p-4 text-xs uppercase tracking-wider text-[#888] font-bold">Server</th>
                <th className="text-left p-4 text-xs uppercase tracking-wider text-[#888] font-bold">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {currentEpisodes.length > 0 ? currentEpisodes.map((ep) => (
                <tr key={ep.number} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                  <td className="p-4">
                    <span className="text-[#e63946] font-bold">#{ep.number}</span>
                  </td>
                  <td className="p-4 text-sm text-[#f0f0f0]">{ep.title || '—'}</td>
                  <td className="p-4 text-xs text-[#888]">
                    {ep.servers?.map(s => s.name).join(', ') || '—'}
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => handleEdit(ep)} className="border-white/[0.08] h-8">
                        <Edit className="w-3.5 h-3.5" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => onDelete(selectedAnime, ep.number)}
                        className="border-red-500/30 text-red-500 hover:bg-red-500/10 h-8"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-[#888]">Belum ada episode</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// Donate Tab
function DonateTab({ settings, onSave }: { settings: SiteSettings; onSave: (s: Partial<SiteSettings>) => void }) {
  const [formData, setFormData] = useState({
    gojek_number: settings.gojek_number,
    dana_link: settings.dana_link,
    ovo_link: settings.ovo_link,
    shopee_link: settings.shopee_link,
    whatsapp_number: settings.whatsapp_number,
    whatsapp_msg: settings.whatsapp_msg,
    qris_image: settings.qris_image,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div>
      <h2 className="font-['Bebas_Neue'] text-3xl tracking-wider text-[#f0f0f0] mb-1">Pengaturan Donasi</h2>
      <p className="text-sm text-[#888] mb-6">Atur link dan nomor e-wallet yang ditampilkan kepada pengguna.</p>

      <div className="bg-[#14141f] border border-white/[0.08] rounded-xl p-6">
        <h3 className="font-['Bebas_Neue'] text-lg tracking-wider text-[#f0f0f0] mb-4">E-Wallet & Link Donasi</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-xs uppercase tracking-wider text-[#888] mb-1.5 flex items-center gap-1.5">
                <span className="text-[#00b010]">Nomor Gojek / WA</span>
              </Label>
              <Input
                value={formData.gojek_number}
                onChange={(e) => setFormData({ ...formData, gojek_number: e.target.value })}
                placeholder="6285000000001"
                className="bg-white/[0.06] border-white/[0.08]"
              />
            </div>
            <div>
              <Label className="text-xs uppercase tracking-wider text-[#888] mb-1.5 flex items-center gap-1.5">
                <span className="text-[#1a8cff]">Link DANA</span>
              </Label>
              <Input
                value={formData.dana_link}
                onChange={(e) => setFormData({ ...formData, dana_link: e.target.value })}
                placeholder="https://link.dana.id/..."
                className="bg-white/[0.06] border-white/[0.08]"
              />
            </div>
            <div>
              <Label className="text-xs uppercase tracking-wider text-[#888] mb-1.5 flex items-center gap-1.5">
                <span className="text-[#6e3dc8]">Link OVO</span>
              </Label>
              <Input
                value={formData.ovo_link}
                onChange={(e) => setFormData({ ...formData, ovo_link: e.target.value })}
                placeholder="https://ovo.id/..."
                className="bg-white/[0.06] border-white/[0.08]"
              />
            </div>
            <div>
              <Label className="text-xs uppercase tracking-wider text-[#888] mb-1.5 flex items-center gap-1.5">
                <span className="text-[#f05a22]">Link ShopeePay</span>
              </Label>
              <Input
                value={formData.shopee_link}
                onChange={(e) => setFormData({ ...formData, shopee_link: e.target.value })}
                placeholder="https://shopee.co.id/..."
                className="bg-white/[0.06] border-white/[0.08]"
              />
            </div>
            <div>
              <Label className="text-xs uppercase tracking-wider text-[#888] mb-1.5 flex items-center gap-1.5">
                <span className="text-[#25d166]">Nomor WhatsApp</span>
              </Label>
              <Input
                value={formData.whatsapp_number}
                onChange={(e) => setFormData({ ...formData, whatsapp_number: e.target.value })}
                placeholder="6285000000001"
                className="bg-white/[0.06] border-white/[0.08]"
              />
            </div>
            <div>
              <Label className="text-xs uppercase tracking-wider text-[#888] mb-1.5">Pesan WhatsApp (Pre-filled)</Label>
              <Input
                value={formData.whatsapp_msg}
                onChange={(e) => setFormData({ ...formData, whatsapp_msg: e.target.value })}
                placeholder="Halo, saya ingin donasi..."
                className="bg-white/[0.06] border-white/[0.08]"
              />
            </div>
          </div>
          <div>
            <Label className="text-xs uppercase tracking-wider text-[#888] mb-1.5">URL Gambar QRIS (opsional)</Label>
            <Input
              value={formData.qris_image}
              onChange={(e) => setFormData({ ...formData, qris_image: e.target.value })}
              placeholder="https://...gambar-qris.jpg"
              className="bg-white/[0.06] border-white/[0.08]"
            />
          </div>
          <Button type="submit" className="bg-[#20c864] hover:bg-[#1aad54]">
            <Save className="w-4 h-4 mr-1.5" />
            Simpan Pengaturan
          </Button>
        </form>
      </div>
    </div>
  );
}

// Donators Tab
function DonatorsTab({
  donators,
  onAdd,
  onDelete
}: {
  donators: Donator[];
  onAdd: (d: Omit<Donator, 'id' | 'date'>) => void;
  onDelete: (id: number) => void;
}) {
  const [formData, setFormData] = useState({ name: '', amount: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({
      name: formData.name,
      amount: parseInt(formData.amount) || 0,
      message: formData.message,
    });
    setFormData({ name: '', amount: '', message: '' });
  };

  const sortedDonators = [...donators].sort((a, b) => b.amount - a.amount);

  return (
    <div>
      <h2 className="font-['Bebas_Neue'] text-3xl tracking-wider text-[#f0f0f0] mb-1">Manajemen Donatur</h2>
      <p className="text-sm text-[#888] mb-6">Tambah atau hapus data donatur yang ditampilkan sebagai social proof.</p>

      {/* Form */}
      <div className="bg-[#14141f] border border-white/[0.08] rounded-xl p-6 mb-6">
        <h3 className="font-['Bebas_Neue'] text-lg tracking-wider text-[#f0f0f0] mb-4">Tambah Donatur</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-xs uppercase tracking-wider text-[#888] mb-1.5">Nama</Label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Nama donatur / Anonymous"
                className="bg-white/[0.06] border-white/[0.08]"
                required
              />
            </div>
            <div>
              <Label className="text-xs uppercase tracking-wider text-[#888] mb-1.5">Nominal (Rp)</Label>
              <Input
                type="number"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                placeholder="50000"
                className="bg-white/[0.06] border-white/[0.08]"
                required
              />
            </div>
          </div>
          <div>
            <Label className="text-xs uppercase tracking-wider text-[#888] mb-1.5">Pesan (opsional)</Label>
            <Input
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Pesan dari donatur..."
              className="bg-white/[0.06] border-white/[0.08]"
            />
          </div>
          <Button type="submit" className="bg-[#20c864] hover:bg-[#1aad54]">
            <Heart className="w-4 h-4 mr-1.5" />
            Tambah Donatur
          </Button>
        </form>
      </div>

      {/* Table */}
      <div className="bg-[#14141f] border border-white/[0.08] rounded-xl overflow-hidden">
        <h3 className="font-['Bebas_Neue'] text-lg tracking-wider text-[#f0f0f0] p-4 pb-2">Daftar Donatur</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/[0.08]">
                <th className="text-left p-4 text-xs uppercase tracking-wider text-[#888] font-bold">Nama</th>
                <th className="text-left p-4 text-xs uppercase tracking-wider text-[#888] font-bold">Nominal</th>
                <th className="text-left p-4 text-xs uppercase tracking-wider text-[#888] font-bold">Pesan</th>
                <th className="text-left p-4 text-xs uppercase tracking-wider text-[#888] font-bold">Tanggal</th>
                <th className="text-left p-4 text-xs uppercase tracking-wider text-[#888] font-bold">Hapus</th>
              </tr>
            </thead>
            <tbody>
              {sortedDonators.map((d, index) => (
                <tr key={d.id} className={`border-b border-white/[0.04] hover:bg-white/[0.02] ${index === 0 ? 'bg-[#ffd700]/5' : ''}`}>
                  <td className="p-4">
                    <span className="font-semibold text-sm text-[#f0f0f0]">
                      {index === 0 && '🥇 '}{d.name}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-[#20c864] font-bold">
                    Rp {d.amount.toLocaleString('id-ID')}
                  </td>
                  <td className="p-4 text-xs text-[#888]">{d.message || '—'}</td>
                  <td className="p-4 text-xs text-[#888]">{d.date || '—'}</td>
                  <td className="p-4">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => onDelete(d.id)}
                      className="border-red-500/30 text-red-500 hover:bg-red-500/10 h-8"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// Settings Tab
function SettingsTab({ settings, onSave }: { settings: SiteSettings; onSave: (s: Partial<SiteSettings>) => void }) {
  const [formData, setFormData] = useState({
    site_name: settings.site_name,
    site_tagline: settings.site_tagline,
    featured_slug: settings.featured_slug,
    new_password: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const update: Partial<SiteSettings> = {
      site_name: formData.site_name,
      site_tagline: formData.site_tagline,
      featured_slug: formData.featured_slug,
    };
    if (formData.new_password) {
      update.admin_password = formData.new_password;
    }
    onSave(update);
    setFormData({ ...formData, new_password: '' });
  };

  return (
    <div>
      <h2 className="font-['Bebas_Neue'] text-3xl tracking-wider text-[#f0f0f0] mb-1">Pengaturan Site</h2>
      <p className="text-sm text-[#888] mb-6">Konfigurasi umum website.</p>

      <div className="bg-[#14141f] border border-white/[0.08] rounded-xl p-6">
        <h3 className="font-['Bebas_Neue'] text-lg tracking-wider text-[#f0f0f0] mb-4">Identitas Site</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-xs uppercase tracking-wider text-[#888] mb-1.5">Nama Site</Label>
              <Input
                value={formData.site_name}
                onChange={(e) => setFormData({ ...formData, site_name: e.target.value })}
                placeholder="AnimeXStream"
                className="bg-white/[0.06] border-white/[0.08]"
              />
            </div>
            <div>
              <Label className="text-xs uppercase tracking-wider text-[#888] mb-1.5">Tagline</Label>
              <Input
                value={formData.site_tagline}
                onChange={(e) => setFormData({ ...formData, site_tagline: e.target.value })}
                placeholder="Nonton Anime Subtitle Indonesia"
                className="bg-white/[0.06] border-white/[0.08]"
              />
            </div>
            <div>
              <Label className="text-xs uppercase tracking-wider text-[#888] mb-1.5">Anime Featured (slug)</Label>
              <Input
                value={formData.featured_slug}
                onChange={(e) => setFormData({ ...formData, featured_slug: e.target.value })}
                placeholder="naruto"
                className="bg-white/[0.06] border-white/[0.08]"
              />
            </div>
            <div>
              <Label className="text-xs uppercase tracking-wider text-[#888] mb-1.5">Ganti Password Admin</Label>
              <Input
                type="password"
                value={formData.new_password}
                onChange={(e) => setFormData({ ...formData, new_password: e.target.value })}
                placeholder="Kosongkan jika tidak ingin ganti"
                className="bg-white/[0.06] border-white/[0.08]"
              />
            </div>
          </div>
          <Button type="submit" className="bg-[#20c864] hover:bg-[#1aad54]">
            <Save className="w-4 h-4 mr-1.5" />
            Simpan Pengaturan
          </Button>
        </form>
      </div>
    </div>
  );
}

// GitHub Sync Tab
function GitHubSyncTab({
  settings,
  onSave,
  data,
}: {
  settings: SiteSettings;
  onSave: (s: Partial<SiteSettings>) => void;
  data: { settings: SiteSettings; anime: Anime[]; episodes: Record<string, Episode[]>; donators: Donator[] };
}) {
  const [formData, setFormData] = useState({
    github_token: settings.github_token || '',
    github_owner: settings.github_owner || '',
    github_repo: settings.github_repo || '',
    github_branch: settings.github_branch || 'main',
  });
  const [showToken, setShowToken] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string; commitUrl?: string } | null>(null);

  const handleSaveConfig = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    setResult({ success: true, message: 'Konfigurasi GitHub disimpan!' });
    setTimeout(() => setResult(null), 3000);
  };

  const handlePush = async () => {
    setSyncing(true);
    setResult(null);
    const res = await pushToGitHub(data, {
      token: formData.github_token,
      owner: formData.github_owner,
      repo: formData.github_repo,
      branch: formData.github_branch,
    });
    setResult(res);
    setSyncing(false);
  };

  return (
    <div>
      <h2 className="font-['Bebas_Neue'] text-3xl tracking-wider text-[#f0f0f0] mb-1">GitHub Sync</h2>
      <p className="text-sm text-[#888] mb-6">
        Push data anime & episode langsung ke GitHub. Vercel akan otomatis deploy ulang.
      </p>

      {/* How it works */}
      <div className="bg-[#7209b7]/10 border border-[#7209b7]/30 rounded-xl p-5 mb-6">
        <h3 className="text-sm font-bold text-[#bf7fff] mb-3 flex items-center gap-2">
          <Github className="w-4 h-4" /> Cara Kerja
        </h3>
        <ol className="text-sm text-[#888] space-y-1.5 list-decimal list-inside">
          <li>Kamu edit anime/episode dari dashboard seperti biasa</li>
          <li>Klik tombol <strong className="text-[#f0f0f0]">"Push ke GitHub"</strong> di bawah</li>
          <li>File <code className="text-[#e63946]">src/data/default.ts</code> di repo kamu otomatis terupdate</li>
          <li>Vercel detect perubahan → auto deploy → website live dalam ~1 menit</li>
        </ol>
      </div>

      {/* Config Form */}
      <div className="bg-[#14141f] border border-white/[0.08] rounded-xl p-6 mb-6">
        <h3 className="font-['Bebas_Neue'] text-lg tracking-wider text-[#f0f0f0] mb-4">Konfigurasi GitHub</h3>
        <form onSubmit={handleSaveConfig} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-xs uppercase tracking-wider text-[#888] mb-1.5">
                GitHub Username / Org Owner
              </Label>
              <Input
                value={formData.github_owner}
                onChange={(e) => setFormData({ ...formData, github_owner: e.target.value })}
                placeholder="contoh: johndoe"
                className="bg-white/[0.06] border-white/[0.08]"
              />
            </div>
            <div>
              <Label className="text-xs uppercase tracking-wider text-[#888] mb-1.5">
                Nama Repository
              </Label>
              <Input
                value={formData.github_repo}
                onChange={(e) => setFormData({ ...formData, github_repo: e.target.value })}
                placeholder="contoh: anime-website"
                className="bg-white/[0.06] border-white/[0.08]"
              />
            </div>
            <div>
              <Label className="text-xs uppercase tracking-wider text-[#888] mb-1.5">
                Branch
              </Label>
              <Input
                value={formData.github_branch}
                onChange={(e) => setFormData({ ...formData, github_branch: e.target.value })}
                placeholder="main"
                className="bg-white/[0.06] border-white/[0.08]"
              />
            </div>
            <div>
              <Label className="text-xs uppercase tracking-wider text-[#888] mb-1.5">
                Personal Access Token
              </Label>
              <div className="relative">
                <Input
                  type={showToken ? 'text' : 'password'}
                  value={formData.github_token}
                  onChange={(e) => setFormData({ ...formData, github_token: e.target.value })}
                  placeholder="ghp_xxxxxxxxxxxx"
                  className="bg-white/[0.06] border-white/[0.08] pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowToken(!showToken)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#888] hover:text-[#f0f0f0]"
                >
                  {showToken ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <p className="text-xs text-[#888] mt-1">
                Buat di{' '}
                <a
                  href="https://github.com/settings/tokens/new"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#e63946] hover:underline"
                >
                  github.com/settings/tokens
                </a>
                {' '}→ centang permission <code className="text-[#bf7fff]">repo</code>
              </p>
            </div>
          </div>
          <Button type="submit" className="bg-[#7209b7] hover:bg-[#5a0791]">
            <Save className="w-4 h-4 mr-1.5" />
            Simpan Konfigurasi
          </Button>
        </form>
      </div>

      {/* Push Button */}
      <div className="bg-[#14141f] border border-white/[0.08] rounded-xl p-6">
        <h3 className="font-['Bebas_Neue'] text-lg tracking-wider text-[#f0f0f0] mb-2">Push ke GitHub</h3>
        <p className="text-sm text-[#888] mb-5">
          Semua data saat ini (anime, episode, donatur, pengaturan) akan ditulis ke{' '}
          <code className="text-[#e63946]">src/data/default.ts</code> dan di-commit ke repo GitHub kamu.
        </p>

        {result && (
          <div className={`flex items-start gap-3 p-4 rounded-xl mb-4 text-sm ${
            result.success
              ? 'bg-[#20c864]/10 border border-[#20c864]/30 text-[#20c864]'
              : 'bg-[#e63946]/10 border border-[#e63946]/30 text-[#e63946]'
          }`}>
            {result.success
              ? <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              : <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            }
            <div>
              <p>{result.message}</p>
              {result.commitUrl && (
                <a
                  href={result.commitUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#20c864] underline text-xs mt-1 inline-block"
                >
                  Lihat commit di GitHub →
                </a>
              )}
            </div>
          </div>
        )}

        <Button
          onClick={handlePush}
          disabled={syncing || !formData.github_token || !formData.github_owner || !formData.github_repo}
          className="bg-[#e63946] hover:bg-[#ff4d5a] disabled:opacity-50"
        >
          {syncing ? (
            <>
              <Loader2 className="w-4 h-4 mr-1.5 animate-spin" />
              Sedang Push...
            </>
          ) : (
            <>
              <Upload className="w-4 h-4 mr-1.5" />
              Push ke GitHub Sekarang
            </>
          )}
        </Button>

        {(!formData.github_token || !formData.github_owner || !formData.github_repo) && (
          <p className="text-xs text-[#888] mt-3">
            ⚠️ Isi konfigurasi GitHub di atas terlebih dahulu sebelum push.
          </p>
        )}
      </div>
    </div>
  );
}
