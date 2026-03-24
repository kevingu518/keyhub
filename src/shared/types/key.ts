import type { ProviderId } from './provider';

export interface ApiKeyEntry {
  id: string;
  provider: ProviderId;
  label: string;
  keyValue: string;
  keyPrefix: string;
  createdAt: number;
  lastUsedAt?: number;
  expiresAt?: number;
  notes?: string;
}

export interface EncryptedVault {
  version: number;
  salt: string;
  iv: string;
  ciphertext: string;
}
