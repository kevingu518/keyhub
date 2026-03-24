# Privacy Policy — KeyHub

**Last updated:** 2026-03-24

## Overview

KeyHub is a Chrome extension that stores and manages AI API keys locally on your device. Your privacy is our top priority.

## Data Collection

KeyHub does **NOT** collect, transmit, or share any data. Specifically:

- **No personal information** is collected
- **No analytics or telemetry** is sent
- **No network requests** are made by the extension
- **No cookies or tracking** of any kind

## Data Storage

- All API keys are encrypted using **AES-256-GCM** with a master password you set
- Encrypted data is stored locally in Chrome's `storage.local` API
- Your master password is **never stored** — it is held in memory only during your active session
- Data never leaves your browser

## Permissions Used

| Permission | Purpose |
|------------|---------|
| `storage` | Store encrypted API key vault locally |
| `clipboardWrite` | Copy API keys to clipboard |
| `clipboardRead` | Verify clipboard content before auto-clearing (30 seconds after copy) |

## Third-Party Services

KeyHub does not integrate with or send data to any third-party services.

## Changes to This Policy

Any changes will be posted on the extension's GitHub repository.

## Contact

For questions or concerns, open an issue at: https://github.com/kevingu518/keyhub/issues
