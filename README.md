# KeyHub

Chrome 擴充功能，安全儲存與管理 AI API Key。所有資料使用 AES-256-GCM 在本地加密，不會離開你的瀏覽器。

## 功能特色

- **加密保險箱** — AES-256-GCM + PBKDF2（100K iterations），使用瀏覽器原生 Web Crypto API
- **自動辨識供應商** — 貼上 Key 自動識別 OpenAI、Anthropic、Google AI、Mistral、Replicate、Hugging Face 等
- **自動鎖定** — 閒置 5 分鐘自動鎖定，主密碼不會被持久化儲存
- **暴力破解防護** — 連續輸錯 5 次鎖定 60 秒
- **剪貼簿自動清除** — 複製 Key 後 30 秒自動清空剪貼簿
- **多語系** — 英文 / 繁體中文（自動偵測瀏覽器語系）
- **零網路請求** — 完全離線運作，無遙測、無分析追蹤

## 支援的供應商

OpenAI · Anthropic · Google AI · Mistral · SerpAPI · ElevenLabs · Replicate · Hugging Face · 自訂

## 技術架構

| 層級 | 選擇 |
|------|------|
| UI | Preact + Signals |
| 語言 | TypeScript（strict mode） |
| 建置 | Vite + CRXJS |
| 加密 | Web Crypto API（AES-GCM、PBKDF2-SHA256） |
| 儲存 | `chrome.storage.local` |
| 測試 | Vitest |
| 擴充規範 | Manifest V3 |

## 開始使用

### 環境需求

- Node.js 18+
- npm

### 安裝與開發

```bash
npm install
npm run dev
```

在 Chrome 載入擴充功能：

1. 前往 `chrome://extensions`
2. 開啟右上角 **開發人員模式**
3. 點擊 **載入未封裝項目**，選擇 `dist/` 資料夾

### 建置

```bash
npm run build
```

### 測試

```bash
npm run test
```

## 專案結構

```
src/
├── popup/                  # 擴充功能彈出視窗 UI（360 × 480px）
│   ├── App.tsx             # 全域狀態 + 頁面路由 + 自動鎖定
│   ├── pages/
│   │   ├── Setup.tsx       # 建立主密碼
│   │   ├── Unlock.tsx      # 解鎖保險箱（含重試限制）
│   │   ├── KeyList.tsx     # Key 清單（複製 / 編輯 / 刪除）
│   │   ├── AddKey.tsx      # 新增或編輯 Key
│   │   └── Settings.tsx    # 語言設定
│   └── components/
│       └── KeyCard.tsx     # 單一 Key 卡片（複製、編輯、二次確認刪除）
├── shared/
│   ├── crypto/
│   │   ├── master-key.ts   # PBKDF2 金鑰衍生、鹽值產生
│   │   └── vault.ts        # AES-GCM 加密 / 解密
│   ├── storage/
│   │   └── vault-store.ts  # chrome.storage.local 封裝
│   ├── providers/
│   │   └── registry.ts     # 供應商定義 + Key 自動偵測
│   ├── types/              # TypeScript 型別定義
│   └── i18n/               # EN / ZH-TW 翻譯
├── background/
│   └── service-worker.ts   # 背景 Service Worker（預留）
└── content/
    └── detector.ts         # API Key 欄位偵測器（預留）
```

## 安全模型

| 項目 | 實作方式 |
|------|---------|
| 金鑰衍生 | PBKDF2-SHA256，100K iterations，16 bytes 隨機鹽值 |
| 加密演算法 | AES-256-GCM，每次儲存產生 12 bytes 隨機 IV |
| 密碼儲存 | 僅存於記憶體（Preact signal），鎖定時清除 |
| 保險箱儲存 | 加密後的資料存入 `chrome.storage.local` |
| 密碼政策 | 至少 12 字元，需含大寫、小寫英文及數字 |
| 暴力破解防護 | 5 次失敗 → 鎖定 60 秒 |
| Session 逾時 | 閒置 5 分鐘自動鎖定 |
| 剪貼簿 | 複製後 30 秒自動清除 |
| 網路請求 | 零對外連線 |
| CSP | `script-src 'self'; object-src 'none'` |

## Roadmap

- [ ] 用量追蹤與預算提醒（Sprint 2）
- [ ] 網頁 API Key 欄位自動填入（Sprint 3）
- [ ] 匯出 / 匯入加密備份
- [ ] 修改主密碼
- [ ] Key 到期提醒

## License

MIT
