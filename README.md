# KeyHub

A Chrome extension for securely storing and managing AI API keys. All data is encrypted locally using AES-256-GCM — nothing leaves your browser.

## Features

- **Encrypted vault** — AES-256-GCM + PBKDF2 (100K iterations) via Web Crypto API
- **Auto-detect provider** — Paste a key and it auto-identifies OpenAI, Anthropic, Google AI, Mistral, Replicate, Hugging Face, and more
- **Auto-lock** — Vault locks after 5 minutes of inactivity; master password is never persisted
- **Brute-force protection** — 5 failed attempts triggers a 60-second lockout
- **Clipboard auto-clear** — Copied keys are wiped from clipboard after 30 seconds
- **Multi-language** — English and Traditional Chinese (auto-detected)
- **Zero network requests** — Fully offline, no telemetry, no analytics

## Supported Providers

OpenAI · Anthropic · Google AI · Mistral · SerpAPI · ElevenLabs · Replicate · Hugging Face · Custom

## Tech Stack

| Layer | Choice |
|-------|--------|
| UI | Preact + Signals |
| Language | TypeScript (strict) |
| Build | Vite + CRXJS |
| Encryption | Web Crypto API (AES-GCM, PBKDF2-SHA256) |
| Storage | `chrome.storage.local` |
| Testing | Vitest |
| Extension | Manifest V3 |

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Install & Dev

```bash
npm install
npm run dev
```

Then load the extension in Chrome:

1. Go to `chrome://extensions`
2. Enable **Developer mode**
3. Click **Load unpacked** and select the `dist/` folder

### Build

```bash
npm run build
```

### Test

```bash
npm run test
```

## Project Structure

```
src/
├── popup/                  # Extension popup UI (360 × 480px)
│   ├── App.tsx             # Global state + page router + auto-lock
│   ├── pages/
│   │   ├── Setup.tsx       # Master password creation
│   │   ├── Unlock.tsx      # Vault unlock with retry limiting
│   │   ├── KeyList.tsx     # Key list with copy/edit/delete
│   │   ├── AddKey.tsx      # Add or edit a key
│   │   └── Settings.tsx    # Language settings
│   └── components/
│       └── KeyCard.tsx     # Single key card (copy, edit, 2-click delete)
├── shared/
│   ├── crypto/
│   │   ├── master-key.ts   # PBKDF2 key derivation, salt generation
│   │   └── vault.ts        # AES-GCM encrypt / decrypt
│   ├── storage/
│   │   └── vault-store.ts  # chrome.storage.local wrapper
│   ├── providers/
│   │   └── registry.ts     # Provider definitions + key auto-detection
│   ├── types/              # TypeScript interfaces
│   └── i18n/               # EN / ZH-TW translations
├── background/
│   └── service-worker.ts   # Background service worker (placeholder)
└── content/
    └── detector.ts         # API key field detector (placeholder)
```

## Security Model

| Aspect | Implementation |
|--------|---------------|
| Key derivation | PBKDF2-SHA256, 100K iterations, 16-byte random salt |
| Encryption | AES-256-GCM with 12-byte random IV per save |
| Password storage | In-memory only (Preact signal), cleared on lock |
| Vault storage | Encrypted blob in `chrome.storage.local` |
| Password policy | Min 12 chars, requires uppercase + lowercase + digit |
| Brute-force | 5 attempts → 60s lockout |
| Session timeout | Auto-lock after 5 min inactivity |
| Clipboard | Auto-cleared 30s after copy |
| Network | Zero outbound requests |
| CSP | `script-src 'self'; object-src 'none'` |

## Roadmap

- [ ] Usage tracking & budget alerts (Sprint 2)
- [ ] API key auto-fill on web pages (Sprint 3)
- [ ] Export / import encrypted backup
- [ ] Change master password
- [ ] Key expiration reminders

## License

MIT
