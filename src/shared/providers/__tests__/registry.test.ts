import { describe, it, expect } from 'vitest';
import { detectProvider, maskKey, getProvider } from '../registry';

describe('detectProvider', () => {
  it('should detect OpenAI keys', () => {
    expect(detectProvider('sk-abcdefghijklmnopqrstuvwx')).toBe('openai');
  });

  it('should detect Anthropic keys before OpenAI', () => {
    expect(detectProvider('sk-ant-abcdefghijklmnopqrstuvwx')).toBe('anthropic');
  });

  it('should detect Google AI keys', () => {
    expect(detectProvider('AI' + 'a'.repeat(35))).toBe('google');
  });

  it('should detect Replicate keys', () => {
    expect(detectProvider('r8_' + 'a'.repeat(35))).toBe('replicate');
  });

  it('should detect Hugging Face keys', () => {
    expect(detectProvider('hf_' + 'a'.repeat(25))).toBe('huggingface');
  });

  it('should return custom for unknown keys', () => {
    expect(detectProvider('unknown-key-format')).toBe('custom');
    expect(detectProvider('')).toBe('custom');
  });
});

describe('maskKey', () => {
  it('should mask long keys showing first 8 and last 4', () => {
    expect(maskKey('sk-abc123def456xyz')).toBe('sk-abc12···6xyz');
  });

  it('should return *** for very short keys', () => {
    expect(maskKey('short')).toBe('***');
    expect(maskKey('12345678')).toBe('***');
  });

  it('should handle keys just over 8 characters', () => {
    expect(maskKey('123456789')).toBe('12345678···6789');
  });
});

describe('getProvider', () => {
  it('should find known providers', () => {
    expect(getProvider('openai')?.name).toBe('OpenAI');
    expect(getProvider('anthropic')?.name).toBe('Anthropic');
  });

  it('should return undefined for custom', () => {
    expect(getProvider('custom')).toBeUndefined();
  });
});
