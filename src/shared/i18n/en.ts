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
  setupErrorShort: 'Password must be at least 6 characters',
  setupErrorMatch: 'Passwords do not match',

  // Unlock
  unlockTitle: 'Unlock your vault',
  unlockPassword: 'Master Password',
  unlockButton: 'Unlock',
  unlockLoading: 'Unlocking...',
  unlockError: 'Wrong password',

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
