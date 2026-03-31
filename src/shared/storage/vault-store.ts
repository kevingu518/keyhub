import type { EncryptedVault } from '@/shared/types';

const VAULT_KEY = 'keyhub_vault';
const LOCKOUT_KEY = 'keyhub_lockout';

export interface LockoutState {
  failCount: number;
  lockedUntil: number;
}

export async function loadVault(): Promise<EncryptedVault | null> {
  const result = await chrome.storage.local.get(VAULT_KEY);
  return result[VAULT_KEY] || null;
}

export async function saveVault(vault: EncryptedVault): Promise<void> {
  await chrome.storage.local.set({ [VAULT_KEY]: vault });
}

export async function deleteVault(): Promise<void> {
  await chrome.storage.local.remove(VAULT_KEY);
}

export async function hasVault(): Promise<boolean> {
  const vault = await loadVault();
  return vault !== null;
}

export async function loadLockoutState(): Promise<LockoutState> {
  const result = await chrome.storage.local.get(LOCKOUT_KEY);
  return result[LOCKOUT_KEY] || { failCount: 0, lockedUntil: 0 };
}

export async function saveLockoutState(state: LockoutState): Promise<void> {
  await chrome.storage.local.set({ [LOCKOUT_KEY]: state });
}
