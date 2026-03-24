export type ProviderId =
  | 'openai'
  | 'anthropic'
  | 'deepseek'
  | 'google'
  | 'mistral'
  | 'serpapi'
  | 'elevenlabs'
  | 'replicate'
  | 'huggingface'
  | 'custom';

export interface ProviderDef {
  id: ProviderId;
  name: string;
  color: string;
  keyPattern?: RegExp;
  keyPrefix?: string;
  usageApiSupported: boolean;
  signupUrl: string;
  docsUrl: string;
}
