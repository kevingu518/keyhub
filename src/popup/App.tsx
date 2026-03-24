import { signal, computed } from '@preact/signals';
import type { ApiKeyEntry } from '@/shared/types';
import { decryptVault, encryptVault } from '@/shared/crypto/vault';
import { loadVault, saveVault, hasVault as checkHasVault } from '@/shared/storage/vault-store';
import { Unlock } from './pages/Unlock';
import { Setup } from './pages/Setup';
import { KeyList } from './pages/KeyList';
import { AddKey } from './pages/AddKey';
import { useEffect } from 'preact/hooks';

export type Page = 'loading' | 'setup' | 'unlock' | 'list' | 'add' | 'edit';

export const currentPage = signal<Page>('loading');
export const keys = signal<ApiKeyEntry[]>([]);
export const masterPassword = signal('');
export const editingKey = signal<ApiKeyEntry | null>(null);
export const vaultSalt = signal<string | undefined>(undefined);

// Save vault whenever keys change (after unlock)
export async function persistVault() {
  if (!masterPassword.value) return;
  const vault = await encryptVault(keys.value, masterPassword.value, vaultSalt.value);
  await saveVault(vault);
}

export function App() {
  useEffect(() => {
    checkHasVault().then((exists) => {
      currentPage.value = exists ? 'unlock' : 'setup';
    });
  }, []);

  const page = currentPage.value;

  if (page === 'loading') {
    return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '480px', color: '#64748b' }}>Loading...</div>;
  }

  if (page === 'setup') {
    return <Setup />;
  }

  if (page === 'unlock') {
    return <Unlock />;
  }

  if (page === 'add' || page === 'edit') {
    return <AddKey />;
  }

  return <KeyList />;
}
