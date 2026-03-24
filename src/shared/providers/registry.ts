import type { ProviderDef, ProviderId } from '@/shared/types';

export const PROVIDERS: ProviderDef[] = [
  {
    id: 'openai',
    name: 'OpenAI',
    color: '#10a37f',
    keyPrefix: 'sk-proj-',
    keyPattern: /^sk-proj-[a-zA-Z0-9_-]{20,}$/,
    usageApiSupported: true,
    signupUrl: 'https://platform.openai.com/api-keys',
    docsUrl: 'https://platform.openai.com/docs',
  },
  {
    id: 'anthropic',
    name: 'Anthropic',
    color: '#d4a574',
    keyPrefix: 'sk-ant-',
    keyPattern: /^sk-ant-[a-zA-Z0-9_-]{20,}$/,
    usageApiSupported: true,
    signupUrl: 'https://console.anthropic.com/settings/keys',
    docsUrl: 'https://docs.anthropic.com',
  },
  {
    id: 'deepseek',
    name: 'DeepSeek',
    color: '#4d6bfe',
    keyPrefix: 'sk-',
    signupUrl: 'https://platform.deepseek.com/api_keys',
    docsUrl: 'https://platform.deepseek.com/docs',
    usageApiSupported: false,
  },
  {
    id: 'google',
    name: 'Google AI',
    color: '#4285f4',
    keyPrefix: 'AI',
    keyPattern: /^AI[a-zA-Z0-9_-]{30,}$/,
    usageApiSupported: false,
    signupUrl: 'https://aistudio.google.com/apikey',
    docsUrl: 'https://ai.google.dev/docs',
  },
  {
    id: 'mistral',
    name: 'Mistral',
    color: '#ff7000',
    usageApiSupported: false,
    signupUrl: 'https://console.mistral.ai/api-keys',
    docsUrl: 'https://docs.mistral.ai',
  },
  {
    id: 'serpapi',
    name: 'SerpAPI',
    color: '#546e7a',
    usageApiSupported: false,
    signupUrl: 'https://serpapi.com/manage-api-key',
    docsUrl: 'https://serpapi.com/docs',
  },
  {
    id: 'elevenlabs',
    name: 'ElevenLabs',
    color: '#000000',
    usageApiSupported: false,
    signupUrl: 'https://elevenlabs.io/app/settings/api-keys',
    docsUrl: 'https://elevenlabs.io/docs',
  },
  {
    id: 'replicate',
    name: 'Replicate',
    color: '#3b82f6',
    keyPrefix: 'r8_',
    keyPattern: /^r8_[a-zA-Z0-9]{30,}$/,
    usageApiSupported: false,
    signupUrl: 'https://replicate.com/account/api-tokens',
    docsUrl: 'https://replicate.com/docs',
  },
  {
    id: 'huggingface',
    name: 'Hugging Face',
    color: '#ffbd45',
    keyPrefix: 'hf_',
    keyPattern: /^hf_[a-zA-Z0-9]{20,}$/,
    usageApiSupported: false,
    signupUrl: 'https://huggingface.co/settings/tokens',
    docsUrl: 'https://huggingface.co/docs',
  },
];

export function getProvider(id: ProviderId): ProviderDef | undefined {
  return PROVIDERS.find((p) => p.id === id);
}

export function detectProvider(keyValue: string): ProviderId {
  // Check more specific prefixes first (e.g. sk-ant- before sk-)
  const sorted = [...PROVIDERS].filter((p) => p.keyPattern).sort(
    (a, b) => (b.keyPrefix?.length || 0) - (a.keyPrefix?.length || 0),
  );
  for (const p of sorted) {
    if (p.keyPattern!.test(keyValue)) return p.id;
  }
  return 'custom';
}

export function maskKey(keyValue: string): string {
  if (keyValue.length <= 8) return '***';
  return keyValue.slice(0, 8) + '···' + keyValue.slice(-4);
}
