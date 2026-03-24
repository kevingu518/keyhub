import type { ApiKeyEntry, EncryptedVault } from '@/shared/types';
import { deriveKey, generateSalt, bufToBase64, base64ToBuf } from './master-key';

const VAULT_VERSION = 1;

export async function encryptVault(
  keys: ApiKeyEntry[],
  password: string,
  existingSalt?: string,
): Promise<EncryptedVault> {
  const salt = existingSalt || generateSalt();
  const cryptoKey = await deriveKey(password, salt);
  const iv = crypto.getRandomValues(new Uint8Array(12));

  const plaintext = new TextEncoder().encode(JSON.stringify(keys));
  const cipherBuf = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    cryptoKey,
    plaintext,
  );

  return {
    version: VAULT_VERSION,
    salt,
    iv: bufToBase64(iv.buffer),
    ciphertext: bufToBase64(cipherBuf),
  };
}

export async function decryptVault(
  vault: EncryptedVault,
  password: string,
): Promise<ApiKeyEntry[]> {
  const cryptoKey = await deriveKey(password, vault.salt);
  const iv = new Uint8Array(base64ToBuf(vault.iv));
  const cipherBuf = base64ToBuf(vault.ciphertext);

  const plainBuf = await crypto.subtle.decrypt(
    { name: 'AES-GCM', iv },
    cryptoKey,
    cipherBuf,
  );

  const json = new TextDecoder().decode(plainBuf);
  return JSON.parse(json) as ApiKeyEntry[];
}
