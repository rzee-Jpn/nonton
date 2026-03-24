import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster, toast } from 'sonner';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Home } from '@/pages/Home';
import { AnimeDetail } from '@/pages/AnimeDetail';
import { EpisodePlayer } from '@/pages/EpisodePlayer';
import { AdminLogin } from '@/pages/AdminLogin';
import { AdminDashboard } from '@/pages/AdminDashboard';
import { useDatabase } from '@/hooks/useDatabase';
import { useWatchHistory } from '@/hooks/useWatchHistory';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import './App.css';

function App() {
  const {
    isLoaded,
    settings,
    anime,
    donators,
    episodeCache,
    loadEpisodes,
    getEpisodes,
    getEpisode,
    getAnimeBySlug,
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
    getTotalEpisodes,
    getTotalDonations,
  } = useDatabase();

  const {
    preferredServer,
    setLastWatchedEpisode,
    getLastWatchedEpisode,
    markAsWatched,
    getWatchedEpisodes,
    setServerPreference,
  } = useWatchHistory();

  const { isAuthenticated, isLoading: isAuthLoading, login, logout } = useAdminAuth();

  // Toast wrappers
  const handleAddAnime = (animeData: Parameters<typeof addAnime>[0]) => {
    addAnime(animeData);
    toast.success('Anime berhasil ditambahkan!');
  };
  const handleUpdateAnime = (id: number, animeData: Parameters<typeof updateAnime>[1]) => {
    updateAnime(id, animeData);
    toast.success('Anime berhasil diupdate!');
  };
  const handleDeleteAnime = (id: number) => {
    if (confirm('Hapus anime ini?')) {
      deleteAnime(id);
      toast.success('Anime dihapus.');
    }
  };
  const handleAddEpisode = (slug: string, episode: Parameters<typeof addEpisode>[1], number?: number) => {
    addEpisode(slug, episode, number);
    toast.success('Episode berhasil ditambahkan!');
  };
  const handleUpdateEpisode = (slug: string, number: number, episode: Parameters<typeof updateEpisode>[2]) => {
    updateEpisode(slug, number, episode);
    toast.success('Episode berhasil diupdate!');
  };
  const handleDeleteEpisode = (slug: string, number: number) => {
    if (confirm('Hapus episode ini?')) {
      deleteEpisode(slug, number);
      toast.success('Episode dihapus.');
    }
  };
  const handleAddDonator = (donator: Parameters<typeof addDonator>[0]) => {
    addDonator(donator);
    toast.success('Donatur ditambahkan!');
  };
  const handleDeleteDonator = (id: number) => {
    if (confirm('Hapus donatur ini?')) {
      deleteDonator(id);
      toast.success('Donatur dihapus.');
    }
  };
  const handleUpdateSettings = (newSettings: Parameters<typeof updateSettings>[0]) => {
    updateSettings(newSettings);
    toast.success('Pengaturan disimpan!');
  };
  const handleReset = () => {
    resetToDefault();
    toast.success('Data direset ke default!');
  };
  const handleAdminLogin = (password: string) => {
    const success = login(password, settings.admin_password);
    if (success) toast.success('Login berhasil!');
    return success;
  };
  const handleAdminLogout = () => {
    logout();
    toast.info('Logout berhasil!');
  };

  if (!isLoaded || isAuthLoading) {
    return (
      <div className="min-h-screen bg-[#08080f] flex items-center justify-center">
        <div className="text-[#e63946] text-xl font-['Bebas_Neue'] tracking-wider">Loading...</div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: '#14141f',
            border: '1px solid rgba(255,255,255,0.08)',
            color: '#f0f0f0',
          },
        }}
      />

      <Routes>
        {/* Public Routes */}
        <Route
          path="/"
          element={
            <>
              <Header siteName={settings.site_name} anime={anime} />
              <Home settings={settings} anime={anime} totalEpisodes={getTotalEpisodes()} />
              <Footer siteName={settings.site_name} />
            </>
          }
        />

        <Route
          path="/anime/:slug"
          element={
            <>
              <Header siteName={settings.site_name} anime={anime} />
              <AnimeDetail
                getAnimeBySlug={getAnimeBySlug}
                getEpisodes={getEpisodes}
                loadEpisodes={loadEpisodes}
                getLastWatchedEpisode={getLastWatchedEpisode}
                getWatchedEpisodes={getWatchedEpisodes}
              />
              <Footer siteName={settings.site_name} />
            </>
          }
        />

        <Route
          path="/episode/:slug/:number"
          element={
            <EpisodePlayer
              settings={settings}
              getAnimeBySlug={getAnimeBySlug}
              getEpisodes={getEpisodes}
              getEpisode={getEpisode}
              loadEpisodes={loadEpisodes}
              donators={donators}
              setLastWatchedEpisode={setLastWatchedEpisode}
              markAsWatched={markAsWatched}
              preferredServer={preferredServer}
              setServerPreference={setServerPreference}
            />
          }
        />

        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            isAuthenticated ? (
              <Navigate to="/admin/dashboard" />
            ) : (
              <AdminLogin siteName={settings.site_name} onLogin={handleAdminLogin} />
            )
          }
        />

        <Route
          path="/admin/dashboard"
          element={
            isAuthenticated ? (
              <AdminDashboard
                settings={settings}
                anime={anime}
                episodeCache={episodeCache}
                donators={donators}
                totalEpisodes={getTotalEpisodes()}
                totalDonations={getTotalDonations()}
                loadEpisodes={loadEpisodes}
                updateSettings={handleUpdateSettings}
                addAnime={handleAddAnime}
                updateAnime={handleUpdateAnime}
                deleteAnime={handleDeleteAnime}
                addEpisode={handleAddEpisode}
                updateEpisode={handleUpdateEpisode}
                deleteEpisode={handleDeleteEpisode}
                addDonator={handleAddDonator}
                deleteDonator={handleDeleteDonator}
                resetToDefault={handleReset}
                logout={handleAdminLogout}
              />
            ) : (
              <Navigate to="/admin" />
            )
          }
        />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
