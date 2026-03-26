// ============================================================
// VideoPlayer — Full-Featured Native + Iframe Hybrid Player
// ============================================================
// Fitur:
//  • Auto-detect: native player (mp4/m3u8) vs iframe embed
//  • Play / Pause (click area + space/K)
//  • Seek bar dengan buffered indicator + hover preview
//  • Skip ±10 detik (tombol + ← →)
//  • Volume slider + Mute (tombol M)
//  • Playback speed (0.25× – 2×)
//  • Fullscreen (tombol F)
//  • Picture-in-Picture
//  • HLS streaming (.m3u8) via hls.js CDN
//  • Subtitle (.vtt) multi-track
//  • Loading spinner + Buffering indicator
//  • Error state + Retry (termasuk HLS)
//  • Auto-hide controls (3 detik)
//  • Resume playback (localStorage)
//  • Touch-friendly
//  • Disable right-click
//  • Keyboard shortcuts
// ============================================================

import { useRef, useState, useEffect, useCallback } from 'react';
import {
  Play, Pause, Volume2, VolumeX, Volume1,
  Maximize, Minimize, PictureInPicture2,
  Subtitles, Loader2, AlertTriangle, RefreshCw,
} from 'lucide-react';

// ── Helpers ────────────────────────────────────────────────────────────────

function fmtTime(s: number): string {
  if (!isFinite(s) || s < 0) return '0:00';
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = Math.floor(s % 60);
  if (h > 0)
    return `${h}:${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
  return `${m}:${String(sec).padStart(2, '0')}`;
}

function isDirectVideo(url: string): boolean {
  const path = url.split('?')[0].toLowerCase();
  return (
    path.endsWith('.mp4') || path.endsWith('.webm') ||
    path.endsWith('.ogg') || path.endsWith('.m3u8')
  );
}

function isHLSUrl(url: string): boolean {
  return url.split('?')[0].toLowerCase().endsWith('.m3u8');
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function loadHlsJs(): Promise<any> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if ((window as any).Hls) return (window as any).Hls;
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src =
      'https://cdn.jsdelivr.net/npm/hls.js@1.5.7/dist/hls.min.js';
    script.onload = () =>
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      resolve((window as any).Hls);
    script.onerror = () => reject(new Error('Gagal memuat HLS.js'));
    document.head.appendChild(script);
  });
}

// ── Types ──────────────────────────────────────────────────────────────────

export interface SubtitleTrack {
  label: string;
  src: string;
  srclang: string;
}

export interface VideoPlayerProps {
  url: string;
  /** Kunci unik untuk resume (misal: "one-piece_123") */
  resumeKey?: string;
  subtitles?: SubtitleTrack[];
  onEnded?: () => void;
  className?: string;
}

const SPEEDS = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];

// ── Skip Icons (custom SVG) ────────────────────────────────────────────────

function SkipBackIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M11.99 5V1l-5 5 5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6h-2c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z"/>
      <text x="7.5" y="14.5" fontSize="5.5" fontWeight="bold" fill="currentColor" textAnchor="middle">10</text>
    </svg>
  );
}

function SkipForwardIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 5V1l5 5-5 5V7c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6h2c0 4.42-3.58 8-8 8s-8-3.58-8-8 3.58-8 8-8z"/>
      <text x="15.5" y="14.5" fontSize="5.5" fontWeight="bold" fill="currentColor" textAnchor="middle">10</text>
    </svg>
  );
}

// ── Main Export ────────────────────────────────────────────────────────────

export function VideoPlayer(props: VideoPlayerProps) {
  if (isDirectVideo(props.url)) {
    return <NativePlayer {...props} />;
  }
  return <IframePlayer url={props.url} />;
}

// ── Iframe Player ──────────────────────────────────────────────────────────

function IframePlayer({ url }: { url: string }) {
  const [loading, setLoading] = useState(true);
  return (
    <div className="relative w-full h-full bg-black">
      {loading && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-black">
          <Loader2 className="w-11 h-11 text-[#e63946] animate-spin" />
          <span className="text-xs text-[#888]">Memuat player…</span>
        </div>
      )}
      <iframe
        src={url}
        className="w-full h-full border-0"
        allowFullScreen
        allow="autoplay; fullscreen; picture-in-picture"
        sandbox="allow-same-origin allow-scripts allow-forms allow-presentation allow-popups allow-popups-to-escape-sandbox"
        onLoad={() => setLoading(false)}
      />
    </div>
  );
}

// ── Native Player ──────────────────────────────────────────────────────────

function NativePlayer({
  url,
  resumeKey,
  subtitles = [],
  onEnded,
  className = '',
}: VideoPlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const hlsRef = useRef<any>(null);
  // Refs to avoid stale closures in callbacks
  const resumeKeyRef = useRef(resumeKey);
  const urlRef = useRef(url);

  // Core state
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [buffered, setBuffered] = useState(0);
  const [volume, setVolume] = useState(1);
  const [muted, setMuted] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [pip, setPip] = useState(false);
  const [speed, setSpeed] = useState(1);
  // UI state
  const [loading, setLoading] = useState(true);
  const [buffering, setBuffering] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [controls, setControls] = useState(true);
  const [activeSub, setActiveSub] = useState(-1); // -1 = off
  const [showSpeed, setShowSpeed] = useState(false);
  const [showSub, setShowSub] = useState(false);
  const [hoverTime, setHoverTime] = useState<number | null>(null);
  // Flash play/pause icon
  const [flash, setFlash] = useState<'play' | 'pause' | null>(null);

  // Keep refs current so closures always see latest values
  useEffect(() => { resumeKeyRef.current = resumeKey; }, [resumeKey]);
  useEffect(() => { urlRef.current = url; }, [url]);

  // ── FIX 1: Timer cleanup on unmount ────────────────────────────────────
  useEffect(() => {
    return () => { clearTimeout(timerRef.current); };
  }, []);

  // ── HLS / Source Setup ─────────────────────────────────────────────────

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    setLoading(true);
    setError(null);
    setPlaying(false);
    setCurrentTime(0);
    setDuration(0);
    setBuffered(0);

    // Destroy previous HLS instance
    if (hlsRef.current) {
      hlsRef.current.destroy();
      hlsRef.current = null;
    }
    // Clear previous src to avoid stale video flash
    video.removeAttribute('src');
    video.load();

    // FIX 2: Use ref so applyResume always reads the latest resumeKey
    const applyResume = () => {
      const key = resumeKeyRef.current;
      if (!key) return;
      const saved = parseFloat(localStorage.getItem(`vp_resume_${key}`) || '0');
      if (saved > 5 && video.duration) {
        video.currentTime = Math.min(saved, video.duration - 3);
      }
    };

    if (isHLSUrl(url)) {
      if (video.canPlayType('application/vnd.apple.mpegurl')) {
        // Safari native HLS
        video.src = url;
        video.addEventListener('loadedmetadata', applyResume, { once: true });
      } else {
        loadHlsJs()
          .then((Hls) => {
            if (!Hls || !Hls.isSupported()) {
              setError('Browser Anda tidak mendukung HLS streaming.');
              return;
            }
            const hls = new Hls({ enableWorker: false });
            hlsRef.current = hls;
            hls.loadSource(url);
            hls.attachMedia(video);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            hls.on(Hls.Events.MANIFEST_PARSED, (_event: any) => {
              applyResume();
            });
            hls.on(Hls.Events.ERROR, (_: unknown, data: { fatal: boolean }) => {
              if (data.fatal) setError('Gagal memuat stream. Coba server lain.');
            });
          })
          .catch(() => setError('Gagal inisialisasi HLS player.'));
      }
    } else {
      video.src = url;
      video.addEventListener('loadedmetadata', applyResume, { once: true });
    }

    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
    };
  // resumeKey intentionally excluded — handled via ref (resumeKeyRef)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  // ── Video Event Listeners ──────────────────────────────────────────────

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    const onTimeUpdate = () => {
      setCurrentTime(v.currentTime);
      if (v.buffered.length > 0)
        setBuffered(v.buffered.end(v.buffered.length - 1));
      const key = resumeKeyRef.current;
      if (key && v.currentTime > 5)
        localStorage.setItem(`vp_resume_${key}`, String(v.currentTime));
    };
    const onDuration = () => setDuration(v.duration || 0);
    const onWaiting = () => setBuffering(true);
    const onPlaying = () => { setBuffering(false); setLoading(false); };
    const onLoaded = () => setLoading(false);
    const onError = () => setError('Gagal memuat video. Coba server lain.');
    const onEnd = () => {
      setPlaying(false);
      const key = resumeKeyRef.current;
      if (key) localStorage.removeItem(`vp_resume_${key}`);
      onEnded?.();
    };
    const onEnterPiP = () => setPip(true);
    const onLeavePiP = () => setPip(false);

    v.addEventListener('play', onPlay);
    v.addEventListener('pause', onPause);
    v.addEventListener('timeupdate', onTimeUpdate);
    v.addEventListener('durationchange', onDuration);
    v.addEventListener('waiting', onWaiting);
    v.addEventListener('playing', onPlaying);
    v.addEventListener('loadeddata', onLoaded);
    v.addEventListener('error', onError);
    v.addEventListener('ended', onEnd);
    v.addEventListener('enterpictureinpicture', onEnterPiP);
    v.addEventListener('leavepictureinpicture', onLeavePiP);

    return () => {
      v.removeEventListener('play', onPlay);
      v.removeEventListener('pause', onPause);
      v.removeEventListener('timeupdate', onTimeUpdate);
      v.removeEventListener('durationchange', onDuration);
      v.removeEventListener('waiting', onWaiting);
      v.removeEventListener('playing', onPlaying);
      v.removeEventListener('loadeddata', onLoaded);
      v.removeEventListener('error', onError);
      v.removeEventListener('ended', onEnd);
      v.removeEventListener('enterpictureinpicture', onEnterPiP);
      v.removeEventListener('leavepictureinpicture', onLeavePiP);
    };
  // onEnded is intentionally excluded — use a ref if it can change frequently
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Fullscreen listener ────────────────────────────────────────────────

  useEffect(() => {
    const h = () => setFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', h);
    return () => document.removeEventListener('fullscreenchange', h);
  }, []);

  // ── Subtitle tracks ────────────────────────────────────────────────────

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    Array.from(v.textTracks).forEach((t, i) => {
      t.mode = i === activeSub ? 'showing' : 'hidden';
    });
  }, [activeSub]);

  // ── FIX 3: Close speed/subtitle popups when clicking outside ──────────
  useEffect(() => {
    if (!showSpeed && !showSub) return;
    const handler = () => { setShowSpeed(false); setShowSub(false); };
    // Delay so the current click that opened it doesn't immediately close it
    const id = setTimeout(() => document.addEventListener('click', handler, { once: true }), 0);
    return () => {
      clearTimeout(id);
      document.removeEventListener('click', handler);
    };
  }, [showSpeed, showSub]);

  // ── Auto-hide controls ─────────────────────────────────────────────────

  const resetTimer = useCallback(() => {
    setControls(true);
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      if (videoRef.current && !videoRef.current.paused) setControls(false);
    }, 3000);
  }, []);

  // ── Flash icon helper ──────────────────────────────────────────────────

  const triggerFlash = useCallback((type: 'play' | 'pause') => {
    setFlash(type);
    setTimeout(() => setFlash(null), 600);
  }, []);

  // ── Actions ────────────────────────────────────────────────────────────

  const togglePlay = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) { v.play().catch(() => {}); triggerFlash('play'); }
    else { v.pause(); triggerFlash('pause'); }
    resetTimer();
  }, [resetTimer, triggerFlash]);

  const skip = useCallback((sec: number) => {
    const v = videoRef.current;
    if (!v || !v.duration) return;
    v.currentTime = Math.max(0, Math.min(v.duration, v.currentTime + sec));
    resetTimer();
  }, [resetTimer]);

  const setVol = useCallback((val: number) => {
    const v = videoRef.current;
    if (!v) return;
    const clamped = Math.max(0, Math.min(1, val));
    v.volume = clamped;
    v.muted = clamped === 0;
    setVolume(clamped);
    setMuted(clamped === 0);
  }, []);

  const toggleMute = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    const next = !v.muted;
    v.muted = next;
    setMuted(next);
    if (!next && v.volume === 0) { v.volume = 0.5; setVolume(0.5); }
  }, []);

  const toggleFS = useCallback(async () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement)
      await containerRef.current.requestFullscreen().catch(() => {});
    else await document.exitFullscreen().catch(() => {});
  }, []);

  const togglePiP = useCallback(async () => {
    const v = videoRef.current;
    if (!v) return;
    if (document.pictureInPictureElement)
      await document.exitPictureInPicture().catch(() => {});
    else if (document.pictureInPictureEnabled)
      await v.requestPictureInPicture().catch(() => {});
  }, []);

  const changeSpeed = useCallback((r: number) => {
    const v = videoRef.current;
    if (!v) return;
    v.playbackRate = r;
    setSpeed(r);
    setShowSpeed(false);
  }, []);

  const seek = useCallback(
    (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
      const bar = progressRef.current;
      const v = videoRef.current;
      if (!bar || !v || !v.duration) return;
      const rect = bar.getBoundingClientRect();
      const clientX =
        'touches' in e ? e.touches[0].clientX : e.clientX;
      const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
      v.currentTime = ratio * v.duration;
      setCurrentTime(ratio * v.duration);
    },
    []
  );

  // FIX 4: retryLoad now works for both native and HLS streams
  const retryLoad = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    setError(null);
    setLoading(true);

    if (isHLSUrl(urlRef.current)) {
      // Re-trigger HLS setup by destroying and re-initializing
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
      loadHlsJs()
        .then((Hls) => {
          if (!Hls || !Hls.isSupported()) {
            setError('Browser Anda tidak mendukung HLS streaming.');
            return;
          }
          const hls = new Hls({ enableWorker: false });
          hlsRef.current = hls;
          hls.loadSource(urlRef.current);
          hls.attachMedia(v);
          hls.on(Hls.Events.ERROR, (_: unknown, data: { fatal: boolean }) => {
            if (data.fatal) setError('Gagal memuat stream. Coba server lain.');
          });
          v.play().catch(() => {});
        })
        .catch(() => setError('Gagal inisialisasi HLS player.'));
    } else {
      v.src = urlRef.current;
      v.load();
      v.play().catch(() => {});
    }
  }, []);

  // ── Keyboard shortcuts ─────────────────────────────────────────────────

  // Use refs to avoid re-registering listeners on every volume change
  const volumeRef = useRef(volume);
  useEffect(() => { volumeRef.current = volume; }, [volume]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement).tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;
      switch (e.code) {
        case 'Space': case 'KeyK': e.preventDefault(); togglePlay(); break;
        case 'ArrowRight': e.preventDefault(); skip(10); break;
        case 'ArrowLeft':  e.preventDefault(); skip(-10); break;
        case 'ArrowUp':    e.preventDefault(); setVol(volumeRef.current + 0.1); break;
        case 'ArrowDown':  e.preventDefault(); setVol(volumeRef.current - 0.1); break;
        case 'KeyM': toggleMute(); break;
        case 'KeyF': toggleFS(); break;
        case 'KeyP': togglePiP(); break;
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  // volume removed from deps — read via volumeRef instead
  }, [togglePlay, skip, setVol, toggleMute, toggleFS, togglePiP]);

  // ── Derived values ─────────────────────────────────────────────────────

  const progress   = duration ? (currentTime / duration) * 100 : 0;
  const buffPct    = duration ? (buffered   / duration) * 100 : 0;
  const VIcon      = muted || volume === 0 ? VolumeX : volume < 0.5 ? Volume1 : Volume2;
  const showOverlay = controls || !playing;

  // ── Render ─────────────────────────────────────────────────────────────

  return (
    <div
      ref={containerRef}
      className={`relative bg-black overflow-hidden select-none outline-none ${className}`}
      onMouseMove={resetTimer}
      // FIX 5: Clear existing timer before setting new one in onMouseLeave
      onMouseLeave={() => {
        if (playing) {
          clearTimeout(timerRef.current);
          timerRef.current = setTimeout(() => setControls(false), 800);
        }
      }}
      onContextMenu={(e) => e.preventDefault()}
      tabIndex={0}
      style={{ cursor: showOverlay ? 'default' : 'none' }}
    >
      {/* ── Video ──────────────────────────────────────────────────────── */}
      <video
        ref={videoRef}
        className="w-full h-full"
        playsInline
        preload="metadata"
      >
        {subtitles.map((s, i) => (
          <track key={i} kind="subtitles" src={s.src} srcLang={s.srclang} label={s.label} />
        ))}
      </video>

      {/* ── Click-to-play overlay ───────────────────────────────────────── */}
      <div className="absolute inset-0 z-[5]" onClick={togglePlay} />

      {/* ── Flash play/pause icon ───────────────────────────────────────── */}
      {flash && (
        <div className="absolute inset-0 z-[15] flex items-center justify-center pointer-events-none">
          <div
            key={flash}
            className="bg-black/50 rounded-full p-5"
            style={{
              animation: 'vpFlash 0.6s ease-out forwards',
            }}
          >
            {flash === 'play'
              ? <Play className="w-8 h-8 text-white" fill="white" />
              : <Pause className="w-8 h-8 text-white" fill="white" />}
          </div>
        </div>
      )}

      {/* ── Loading / Buffering ─────────────────────────────────────────── */}
      {(loading || buffering) && !error && (
        <div className="absolute inset-0 z-[20] flex flex-col items-center justify-center gap-3 bg-black/50 pointer-events-none">
          <div className="relative">
            <div className="w-14 h-14 rounded-full border-2 border-[#e63946]/20 border-t-[#e63946] animate-spin" />
          </div>
          <span className="text-xs text-[#999] tracking-wide">
            {loading ? 'Memuat video…' : 'Buffering…'}
          </span>
        </div>
      )}

      {/* ── Error ───────────────────────────────────────────────────────── */}
      {error && (
        <div className="absolute inset-0 z-[30] flex flex-col items-center justify-center gap-4 bg-black/95 p-6">
          <div className="w-14 h-14 rounded-full bg-[#e63946]/10 flex items-center justify-center">
            <AlertTriangle className="w-7 h-7 text-[#e63946]" />
          </div>
          <p className="text-[#f0f0f0] font-semibold text-sm text-center max-w-xs">{error}</p>
          <button
            onClick={(e) => { e.stopPropagation(); retryLoad(); }}
            className="flex items-center gap-2 px-5 py-2 bg-[#e63946] hover:bg-[#ff4d5a] text-white rounded-lg text-sm font-semibold transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Coba Lagi
          </button>
        </div>
      )}

      {/* ── Controls Overlay ────────────────────────────────────────────── */}
      <div
        className={`absolute inset-0 z-[10] flex flex-col justify-end transition-opacity duration-300 ${showOverlay ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      >
        {/* gradient vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent pointer-events-none" />

        <div className="relative px-3 pb-2.5 space-y-1.5" onClick={(e) => e.stopPropagation()}>
          {/* ── Progress Bar ──────────────────────────────────────────── */}
          <div
            ref={progressRef}
            className="relative h-1 bg-white/20 rounded-full cursor-pointer group hover:h-[5px] transition-all duration-100"
            onClick={seek}
            onMouseMove={(e) => {
              const bar = progressRef.current;
              if (!bar || !duration) return;
              const rect = bar.getBoundingClientRect();
              setHoverTime(Math.max(0, Math.min(duration, ((e.clientX - rect.left) / rect.width) * duration)));
            }}
            onMouseLeave={() => setHoverTime(null)}
            onTouchStart={seek}
          >
            {/* buffered */}
            <div className="absolute inset-y-0 left-0 bg-white/25 rounded-full transition-all" style={{ width: `${buffPct}%` }} />
            {/* played */}
            <div className="absolute inset-y-0 left-0 bg-[#e63946] rounded-full transition-all" style={{ width: `${progress}%` }} />
            {/* thumb */}
            <div
              className="absolute top-1/2 w-3.5 h-3.5 bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity -translate-y-1/2"
              style={{ left: `${progress}%`, transform: 'translate(-50%, -50%)' }}
            />
            {/* hover time tooltip */}
            {hoverTime !== null && duration > 0 && (
              <div
                className="absolute bottom-4 bg-black/90 text-white text-[10px] px-1.5 py-0.5 rounded font-mono pointer-events-none"
                style={{ left: `${(hoverTime / duration) * 100}%`, transform: 'translateX(-50%)' }}
              >
                {fmtTime(hoverTime)}
              </div>
            )}
          </div>

          {/* ── Control Bar ───────────────────────────────────────────── */}
          <div className="flex items-center gap-0.5 sm:gap-1">

            {/* Play/Pause */}
            <button onClick={togglePlay} className="p-1.5 text-white hover:text-[#e63946] transition-colors" title="Play/Pause (Space)">
              {playing
                ? <Pause className="w-[18px] h-[18px]" fill="currentColor" />
                : <Play  className="w-[18px] h-[18px]" fill="currentColor" />}
            </button>

            {/* Skip −10 */}
            <button onClick={() => skip(-10)} className="p-1.5 text-white hover:text-[#e63946] transition-colors" title="Mundur 10 detik (←)">
              <SkipBackIcon />
            </button>

            {/* Skip +10 */}
            <button onClick={() => skip(10)} className="p-1.5 text-white hover:text-[#e63946] transition-colors" title="Maju 10 detik (→)">
              <SkipForwardIcon />
            </button>

            {/* Volume */}
            <div className="flex items-center group/vol gap-1">
              <button onClick={toggleMute} className="p-1.5 text-white hover:text-[#e63946] transition-colors" title="Mute (M)">
                <VIcon className="w-4 h-4" />
              </button>
              <div className="overflow-hidden transition-all duration-200 w-0 group-hover/vol:w-16 sm:group-hover/vol:w-20">
                <input
                  type="range" min={0} max={1} step={0.02}
                  value={muted ? 0 : volume}
                  onChange={(e) => setVol(parseFloat(e.target.value))}
                  className="w-16 sm:w-20 h-[3px] cursor-pointer"
                  style={{ accentColor: '#e63946' }}
                />
              </div>
            </div>

            {/* Time */}
            <span className="text-[11px] text-white/80 tabular-nums whitespace-nowrap ml-0.5">
              {fmtTime(currentTime)}
              <span className="text-white/40 mx-0.5">/</span>
              {fmtTime(duration)}
            </span>

            <div className="flex-1" />

            {/* Subtitle toggle */}
            {subtitles.length > 0 && (
              <div className="relative">
                <button
                  onClick={(e) => { e.stopPropagation(); setShowSub(v => !v); setShowSpeed(false); }}
                  className={`p-1.5 transition-colors ${activeSub >= 0 ? 'text-[#e63946]' : 'text-white hover:text-[#e63946]'}`}
                  title="Subtitle"
                >
                  <Subtitles className="w-4 h-4" />
                </button>
                {showSub && (
                  <div className="absolute bottom-full right-0 mb-2 bg-[#0e0e1a] border border-white/10 rounded-xl overflow-hidden shadow-2xl min-w-[110px]">
                    {[{ label: 'Nonaktif', srclang: '', src: '' }, ...subtitles].map((s, i) => (
                      <button
                        key={i}
                        onClick={(e) => { e.stopPropagation(); setActiveSub(i - 1); setShowSub(false); }}
                        className={`block w-full text-left px-3 py-1.5 text-xs transition-colors ${activeSub === i - 1 ? 'text-[#e63946] bg-[#e63946]/10' : 'text-white/70 hover:bg-white/5 hover:text-white'}`}
                      >
                        {s.label || 'Nonaktif'}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Speed */}
            <div className="relative">
              <button
                onClick={(e) => { e.stopPropagation(); setShowSpeed(v => !v); setShowSub(false); }}
                className={`p-1.5 text-[11px] font-bold w-9 text-center transition-colors ${speed !== 1 ? 'text-[#e63946]' : 'text-white hover:text-[#e63946]'}`}
                title="Kecepatan"
              >
                {speed}×
              </button>
              {showSpeed && (
                <div className="absolute bottom-full right-0 mb-2 bg-[#0e0e1a] border border-white/10 rounded-xl overflow-hidden shadow-2xl">
                  {SPEEDS.map((r) => (
                    <button
                      key={r}
                      onClick={(e) => { e.stopPropagation(); changeSpeed(r); }}
                      className={`block w-full text-right px-4 py-1.5 text-xs transition-colors ${speed === r ? 'text-[#e63946] bg-[#e63946]/10 font-bold' : 'text-white/70 hover:bg-white/5 hover:text-white'}`}
                    >
                      {r}×
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* PiP */}
            {typeof document !== 'undefined' && 'pictureInPictureEnabled' in document && (
              <button
                onClick={togglePiP}
                className={`p-1.5 transition-colors ${pip ? 'text-[#e63946]' : 'text-white hover:text-[#e63946]'}`}
                title="Picture-in-Picture (P)"
              >
                <PictureInPicture2 className="w-4 h-4" />
              </button>
            )}

            {/* Fullscreen */}
            <button
              onClick={toggleFS}
              className="p-1.5 text-white hover:text-[#e63946] transition-colors"
              title="Fullscreen (F)"
            >
              {fullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* ── Flash keyframe (inline style) ─────────────────────────────── */}
      <style>{`
        @keyframes vpFlash {
          0%   { opacity: 1; transform: scale(1); }
          60%  { opacity: 1; transform: scale(1.15); }
          100% { opacity: 0; transform: scale(1.3); }
        }
      `}</style>
    </div>
  );
}
