import { signal } from '@preact/signals';
import type { ApiKeyEntry } from '@/shared/types';
import { encryptVault } from '@/shared/crypto/vault';
import { saveVault, hasVault as checkHasVault } from '@/shared/storage/vault-store';
import { initLang } from '@/shared/i18n';
import { Unlock } from './pages/Unlock';
import { resetUnlockState } from './pages/Unlock';
import { Setup } from './pages/Setup';
import { KeyList } from './pages/KeyList';
import { AddKey } from './pages/AddKey';
import { resetAddKeyState } from './pages/AddKey';
import { Settings } from './pages/Settings';
import { useEffect } from 'preact/hooks';

export type Page = 'loading' | 'setup' | 'unlock' | 'list' | 'add' | 'edit' | 'settings';

export const currentPage = signal<Page>('loading');
export const keys = signal<ApiKeyEntry[]>([]);
export const masterPassword = signal('');
export const editingKey = signal<ApiKeyEntry | null>(null);
export const vaultSalt = signal<string | undefined>(undefined);

// Auto-lock after 5 minutes of inactivity
const AUTO_LOCK_MS = 5 * 60 * 1000;
let autoLockTimer: ReturnType<typeof setTimeout> | null = null;

function lockVault() {
  masterPassword.value = '';
  keys.value = [];
  vaultSalt.value = undefined;
  editingKey.value = null;
  resetAddKeyState();
  resetUnlockState();
  currentPage.value = 'unlock';
}

export function resetAutoLock() {
  if (autoLockTimer) clearTimeout(autoLockTimer);
  autoLockTimer = setTimeout(lockVault, AUTO_LOCK_MS);
}

export async function persistVault() {
  if (!masterPassword.value) return;
  const vault = await encryptVault(keys.value, masterPassword.value, vaultSalt.value);
  await saveVault(vault);
}

export function App() {
  useEffect(() => {
    Promise.all([
      initLang(),
      checkHasVault(),
    ]).then(([_, exists]) => {
      currentPage.value = exists ? 'unlock' : 'setup';
    });
  }, []);

  const page = currentPage.value;

  if (page === 'loading') {
    return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '480px', color: '#64748b' }}>Loading...</div>;
  }
  if (page === 'setup') return <Setup />;
  if (page === 'unlock') return <Unlock />;
  if (page === 'add' || page === 'edit') return <AddKey />;
  if (page === 'settings') return <Settings />;
  return <KeyList />;
}
