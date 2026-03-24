// KeyHub Content Script — API Key field detector
// TODO Sprint 3: Implement detection rules and autofill popup
// For now, this is a placeholder that doesn't do anything visible

const API_KEY_HINTS = [
  'api-key', 'api_key', 'apikey', 'apiKey',
  'sk-', 'sk-ant-', 'bearer', 'token',
  'secret', 'api key', 'API Key',
];

function hasApiKeyInput(): boolean {
  const inputs = document.querySelectorAll('input[type="text"], input[type="password"]');
  for (const input of inputs) {
    const el = input as HTMLInputElement;
    const hints = [el.placeholder, el.name, el.id, el.getAttribute('aria-label') || ''].join(' ').toLowerCase();
    if (API_KEY_HINTS.some((h) => hints.includes(h.toLowerCase()))) {
      return true;
    }
  }
  return false;
}

// Detection result available for future Sprint 3 autofill feature
hasApiKeyInput();
