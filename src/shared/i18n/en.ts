export const en = {
  // App
  appName: 'KeyHub',
  appTagline: 'AI API Key Manager',

  // Setup
  setupTitle: 'Create Master Password',
  setupDesc: 'This password encrypts all your API keys locally. It is never stored or sent anywhere.',
  setupPassword: 'Master Password',
  setupConfirm: 'Confirm Password',
  setupButton: 'Create Vault',
  setupErrorShort: 'Password must be at least 12 characters',
  setupErrorUppercase: 'Password must contain at least one uppercase letter',
  setupErrorLowercase: 'Password must contain at least one lowercase letter',
  setupErrorDigit: 'Password must contain at least one digit',
  setupErrorSpecial: 'Password must contain at least one special character',
  setupErrorMatch: 'Passwords do not match',
  setupPasswordHint: 'Min 12 chars, include uppercase, lowercase, digit, and special character',

  // Unlock
  unlockTitle: 'Unlock your vault',
  unlockPassword: 'Master Password',
  unlockButton: 'Unlock',
  unlockLoading: 'Unlocking...',
  unlockError: 'Wrong password',
  unlockAttemptsLeft: 'attempts left',
  unlockLocked: 'Too many attempts — locked',
  unlockRetryIn: 'Retry in',

  // Key List
  keyListTitle: 'KeyHub',
  keyListCount: 'keys',
  keyListAdd: '+ Add',
  keyListEmpty: 'No keys yet',
  keyListEmptyHint: 'Click "+ Add" to store your first API key',

  // Key Card
  keyCopy: 'Copy',
  keyCopied: 'Copied',
  keyEdit: 'Edit',
  keyDelete: 'Delete',
  keyDeleteConfirm: 'Confirm?',

  // Add/Edit Key
  addTitle: 'Add Key',
  editTitle: 'Edit Key',
  addKeyLabel: 'API Key',
  addKeyPlaceholder: 'sk-... / sk-ant-... / AI...',
  addProvider: 'Provider',
  addProviderOther: 'Other',
  addLabel: 'Label',
  addLabelPlaceholder: 'My OpenAI Key',
  addNotes: 'Notes (optional)',
  addNotesPlaceholder: 'What is this key for?',
  addButton: 'Add Key',
  editButton: 'Save Changes',
  addErrorKey: 'API Key is required',
  addErrorLabel: 'Label is required',

  // Settings
  settingsTitle: 'Settings',
  settingsLang: 'Language',
  settingsBack: 'Back',
} as const;
