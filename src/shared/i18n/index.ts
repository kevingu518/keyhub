import { signal, computed } from '@preact/signals';
import { en } from './en';
import { zhTW } from './zh-TW';

export type Lang = 'en' | 'zh-TW';
export type TranslationKey = keyof typeof en;

const translations: Record<Lang, Record<TranslationKey, string>> = {
  'en': en,
  'zh-TW': zhTW,
};

const STORAGE_KEY = 'keyhub_lang';

export const currentLang = signal<Lang>('en');

export function t(key: TranslationKey): string {
  return translations[currentLang.value][key] || translations['en'][key] || key;
}

export async function initLang(): Promise<void> {
  const result = await chrome.storage.local.get(STORAGE_KEY);
  if (result[STORAGE_KEY]) {
    currentLang.value = result[STORAGE_KEY] as Lang;
  } else {
    // Auto-detect from browser
    const browserLang = navigator.language;
    if (browserLang.startsWith('zh')) {
      currentLang.value = 'zh-TW';
    }
  }
}

export async function setLang(lang: Lang): Promise<void> {
  currentLang.value = lang;
  await chrome.storage.local.set({ [STORAGE_KEY]: lang });
}
