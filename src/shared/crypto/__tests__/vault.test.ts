import { describe, it, expect } from 'vitest';
import { encryptVault, decryptVault } from '../vault';
import { generateSalt, bufToBase64, base64ToBuf } from '../master-key';

describe('vault encrypt/decrypt roundtrip', () => {
  const password = 'TestPassword123!';

  it('should encrypt and decrypt empty key list', async () => {
    const salt = generateSalt();
    const vault = await encryptVault([], password, salt);
    const result = await decryptVault(vault, password);
    expect(result).toEqual([]);
  });

  it('should encrypt and decrypt multiple keys', async () => {
    const keys = [
      {
        id: 'test-1',
        provider: 'openai' as const,
        label: 'My OpenAI Key',
        keyValue: 'sk-abc123def456',
        keyPrefix: 'sk-abc12···f456',
        createdAt: Date.now(),
      },
      {
        id: 'test-2',
        provider: 'anthropic' as const,
        label: 'My Anthropic Key',
        keyValue: 'sk-ant-xyz789000111',
        keyPrefix: 'sk-ant-x···0111',
        createdAt: Date.now(),
        notes: 'Production key',
      },
    ];

    const salt = generateSalt();
    const vault = await encryptVault(keys, password, salt);
    const result = await decryptVault(vault, password);

    expect(result).toHaveLength(2);
    expect(result[0].id).toBe('test-1');
    expect(result[0].keyValue).toBe('sk-abc123def456');
    expect(result[1].notes).toBe('Production key');
  });

  it('should fail to decrypt with wrong password', async () => {
    const salt = generateSalt();
    const vault = await encryptVault([], password, salt);

    await expect(decryptVault(vault, 'WrongPassword99!')).rejects.toThrow();
  });

  it('should produce different ciphertext for same input (random IV)', async () => {
    const keys = [{ id: '1', provider: 'custom' as const, label: 'Test', keyValue: 'key', keyPrefix: 'key', createdAt: 1 }];
    const salt = generateSalt();

    const vault1 = await encryptVault(keys, password, salt);
    const vault2 = await encryptVault(keys, password, salt);

    expect(vault1.ciphertext).not.toBe(vault2.ciphertext);
    expect(vault1.iv).not.toBe(vault2.iv);
  });

  it('should preserve vault version and salt', async () => {
    const salt = generateSalt();
    const vault = await encryptVault([], password, salt);

    expect(vault.version).toBe(1);
    expect(vault.salt).toBe(salt);
  });
});

describe('bufToBase64 / base64ToBuf', () => {
  it('should roundtrip small data', () => {
    const original = new Uint8Array([1, 2, 3, 4, 5]);
    const b64 = bufToBase64(original.buffer);
    const restored = new Uint8Array(base64ToBuf(b64));
    expect(restored).toEqual(original);
  });

  it('should handle large data without stack overflow', () => {
    // 100KB — would crash with spread operator approach
    const large = new Uint8Array(100_000);
    for (let i = 0; i < large.length; i++) large[i] = i % 256;

    const b64 = bufToBase64(large.buffer);
    const restored = new Uint8Array(base64ToBuf(b64));
    expect(restored).toEqual(large);
  });

  it('should handle empty buffer', () => {
    const empty = new Uint8Array(0);
    const b64 = bufToBase64(empty.buffer);
    const restored = new Uint8Array(base64ToBuf(b64));
    expect(restored).toEqual(empty);
  });
});
