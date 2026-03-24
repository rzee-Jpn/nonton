import type { Anime, Episode, Donator, SiteSettings } from '@/types';

// ─── File generators ──────────────────────────────────────────

export function generateSettingsTs(settings: SiteSettings): string {
  // Jangan simpan token ke repo
  const safe = { ...settings, github_token: '' };
  return `import type { SiteSettings } from '@/types';

const DEFAULT_SETTINGS: SiteSettings = ${JSON.stringify(safe, null, 2)};

export default DEFAULT_SETTINGS;
`;
}

export function generateAnimeTs(anime: Anime[]): string {
  return `import type { Anime } from '@/types';

const DEFAULT_ANIME: Anime[] = ${JSON.stringify(anime, null, 2)};

export default DEFAULT_ANIME;
`;
}

export function generateDonatorsTs(donators: Donator[]): string {
  return `import type { Donator } from '@/types';

const DEFAULT_DONATORS: Donator[] = ${JSON.stringify(donators, null, 2)};

export default DEFAULT_DONATORS;
`;
}

export function generateEpisodeTs(_slug: string, episodes: Episode[]): string {
  return `import type { Episode } from '@/types';

const episodes: Episode[] = ${JSON.stringify(episodes, null, 2)};

export default episodes;
`;
}

// ─── GitHub API helper ────────────────────────────────────────

interface GitHubConfig {
  token: string;
  owner: string;
  repo: string;
  branch: string;
}

export interface SyncResult {
  success: boolean;
  message: string;
  commitUrl?: string;
}

async function pushFile(
  filePath: string,
  content: string,
  commitMessage: string,
  config: GitHubConfig
): Promise<SyncResult> {
  const { token, owner, repo, branch } = config;
  const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`;
  const headers = {
    Authorization: `Bearer ${token}`,
    Accept: 'application/vnd.github+json',
    'Content-Type': 'application/json',
    'X-GitHub-Api-Version': '2022-11-28',
  };

  // Dapatkan SHA file existing (untuk update)
  let sha: string | undefined;
  const getRes = await fetch(`${apiUrl}?ref=${branch}`, { headers });
  if (getRes.ok) {
    const fileData = await getRes.json();
    sha = fileData.sha;
  } else if (getRes.status !== 404) {
    const err = await getRes.json();
    return { success: false, message: `Gagal baca file: ${err.message}` };
  }

  // Encode konten ke base64
  const encoded = btoa(unescape(encodeURIComponent(content)));
  const body: Record<string, string> = { message: commitMessage, content: encoded, branch };
  if (sha) body.sha = sha;

  const putRes = await fetch(apiUrl, {
    method: 'PUT',
    headers,
    body: JSON.stringify(body),
  });

  if (!putRes.ok) {
    const err = await putRes.json();
    return { success: false, message: `Gagal push: ${err.message}` };
  }

  const result = await putRes.json();
  return {
    success: true,
    message: `✅ Berhasil push! Vercel akan auto-deploy dalam ~1 menit.`,
    commitUrl: result.commit?.html_url,
  };
}

// ─── Public push functions ─────────────────────────────────────

const timestamp = () => new Date().toLocaleString('id-ID');

export async function pushSettings(settings: SiteSettings, config: GitHubConfig): Promise<SyncResult> {
  try {
    return await pushFile(
      'src/data/settings.ts',
      generateSettingsTs(settings),
      `chore: update settings [${timestamp()}]`,
      config
    );
  } catch (e: unknown) {
    return { success: false, message: `Error: ${e instanceof Error ? e.message : String(e)}` };
  }
}

export async function pushAnime(anime: Anime[], config: GitHubConfig): Promise<SyncResult> {
  try {
    return await pushFile(
      'src/data/anime.ts',
      generateAnimeTs(anime),
      `chore: update anime list [${timestamp()}]`,
      config
    );
  } catch (e: unknown) {
    return { success: false, message: `Error: ${e instanceof Error ? e.message : String(e)}` };
  }
}

export async function pushDonators(donators: Donator[], config: GitHubConfig): Promise<SyncResult> {
  try {
    return await pushFile(
      'src/data/donators.ts',
      generateDonatorsTs(donators),
      `chore: update donators [${timestamp()}]`,
      config
    );
  } catch (e: unknown) {
    return { success: false, message: `Error: ${e instanceof Error ? e.message : String(e)}` };
  }
}

export async function pushEpisodes(
  slug: string,
  episodes: Episode[],
  config: GitHubConfig
): Promise<SyncResult> {
  try {
    return await pushFile(
      `src/data/episodes/${slug}.ts`,
      generateEpisodeTs(slug, episodes),
      `chore: update episodes ${slug} [${timestamp()}]`,
      config
    );
  } catch (e: unknown) {
    return { success: false, message: `Error: ${e instanceof Error ? e.message : String(e)}` };
  }
}
