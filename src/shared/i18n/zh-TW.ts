import type { en } from './en';

export const zhTW: Record<keyof typeof en, string> = {
  // App
  appName: 'KeyHub',
  appTagline: 'AI API Key 管理器',

  // Setup
  setupTitle: '建立主密碼',
  setupDesc: '此密碼用於在本地加密你的所有 API Key。密碼不會被儲存或傳送到任何地方。',
  setupPassword: '主密碼',
  setupConfirm: '確認密碼',
  setupButton: '建立保險箱',
  setupErrorShort: '密碼至少需要 12 個字元',
  setupErrorUppercase: '密碼需包含至少一個大寫英文字母',
  setupErrorLowercase: '密碼需包含至少一個小寫英文字母',
  setupErrorDigit: '密碼需包含至少一個數字',
  setupErrorSpecial: '密碼需包含至少一個特殊字元',
  setupErrorMatch: '兩次密碼不一致',
  setupPasswordHint: '至少 12 字元，需含大寫、小寫英文、數字及特殊字元',

  // Unlock
  unlockTitle: '解鎖保險箱',
  unlockPassword: '主密碼',
  unlockButton: '解鎖',
  unlockLoading: '解鎖中...',
  unlockError: '密碼錯誤',
  unlockAttemptsLeft: '次嘗試機會',
  unlockLocked: '嘗試次數過多，已鎖定',
  unlockRetryIn: '請等待',

  // Key List
  keyListTitle: 'KeyHub',
  keyListCount: '把金鑰',
  keyListAdd: '+ 新增',
  keyListEmpty: '還沒有金鑰',
  keyListEmptyHint: '點「+ 新增」儲存你的第一把 API Key',

  // Key Card
  keyCopy: '複製',
  keyCopied: '已複製',
  keyEdit: '編輯',
  keyDelete: '刪除',
  keyDeleteConfirm: '確定刪除？',

  // Add/Edit Key
  addTitle: '新增金鑰',
  editTitle: '編輯金鑰',
  addKeyLabel: 'API Key',
  addKeyPlaceholder: 'sk-... / sk-ant-... / AI...',
  addProvider: '供應商',
  addProviderOther: '其他',
  addLabel: '名稱',
  addLabelPlaceholder: '我的 OpenAI Key',
  addNotes: '備註（選填）',
  addNotesPlaceholder: '這把 Key 的用途？',
  addButton: '新增金鑰',
  editButton: '儲存變更',
  addErrorKey: '請輸入 API Key',
  addErrorLabel: '請輸入名稱',

  // Settings
  settingsTitle: '設定',
  settingsLang: '語言',
  settingsBack: '返回',
};
