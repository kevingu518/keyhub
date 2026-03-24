import type { EncryptedVault } from '@/shared/types';

const VAULT_KEY = 'keyhub_vault';

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
