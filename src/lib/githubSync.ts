import type { Database } from '@/types';

/**
 * Generate konten file src/data/default.ts dari data saat ini
 */
export function generateDefaultTs(db: Database): string {
  // Hapus field github dari settings sebelum disimpan ke file
  // agar token tidak tersimpan di repo
  const { github_token, ...settingsToSave } = db.settings;
  void github_token; // suppress unused warning

  const dbToSave: Database = {
    ...db,
    settings: {
      ...settingsToSave,
      github_token: '',
    },
  };

  const json = JSON.stringify(dbToSave, null, 2);

  return `import type { Database } from '@/types';

export const DEFAULT_DB: Database = ${json};
`;
}

interface GitHubConfig {
  token: string;
  owner: string;
  repo: string;
  branch: string;
}

interface SyncResult {
  success: boolean;
  message: string;
  commitUrl?: string;
}

/**
 * Push file default.ts ke GitHub menggunakan GitHub Contents API
 */
export async function pushToGitHub(
  db: Database,
  config: GitHubConfig
): Promise<SyncResult> {
  const { token, owner, repo, branch } = config;

  if (!token || !owner || !repo) {
    return { success: false, message: 'GitHub token, owner, dan repo harus diisi.' };
  }

  const filePath = 'src/data/default.ts';
  const apiBase = `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`;
  const headers = {
    Authorization: `Bearer ${token}`,
    Accept: 'application/vnd.github+json',
    'Content-Type': 'application/json',
    'X-GitHub-Api-Version': '2022-11-28',
  };

  try {
    // 1. Dapatkan SHA file yang ada (dibutuhkan untuk update)
    let currentSha: string | undefined;
    const getRes = await fetch(`${apiBase}?ref=${branch}`, { headers });

    if (getRes.ok) {
      const fileData = await getRes.json();
      currentSha = fileData.sha;
    } else if (getRes.status !== 404) {
      const err = await getRes.json();
      return { success: false, message: `Gagal baca file: ${err.message}` };
    }

    // 2. Generate konten file dan encode ke base64
    const content = generateDefaultTs(db);
    const encoded = btoa(unescape(encodeURIComponent(content)));

    // 3. PUT file baru ke GitHub
    const body: Record<string, string> = {
      message: `chore: update database via admin dashboard [${new Date().toLocaleString('id-ID')}]`,
      content: encoded,
      branch,
    };
    if (currentSha) body.sha = currentSha;

    const putRes = await fetch(apiBase, {
      method: 'PUT',
      headers,
      body: JSON.stringify(body),
    });

    if (!putRes.ok) {
      const err = await putRes.json();
      return { success: false, message: `Gagal push: ${err.message}` };
    }

    const result = await putRes.json();
    const commitUrl = result.commit?.html_url;

    return {
      success: true,
      message: 'Berhasil push ke GitHub! Vercel akan auto-deploy dalam ~1 menit.',
      commitUrl,
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return { success: false, message: `Error: ${message}` };
  }
}
