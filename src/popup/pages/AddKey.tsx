import { signal } from '@preact/signals';
import { keys, currentPage, editingKey, persistVault } from '../App';
import type { ApiKeyEntry, ProviderId } from '@/shared/types';
import { PROVIDERS, detectProvider, maskKey } from '@/shared/providers/registry';

const keyValue = signal('');
const label = signal('');
const provider = signal<ProviderId>('custom');
const notes = signal('');
const error = signal('');

function resetForm() {
  const editing = editingKey.value;
  if (editing) {
    keyValue.value = editing.keyValue;
    label.value = editing.label;
    provider.value = editing.provider;
    notes.value = editing.notes || '';
  } else {
    keyValue.value = '';
    label.value = '';
    provider.value = 'custom';
    notes.value = '';
  }
  error.value = '';
}

export function AddKey() {
  // Initialize form
  if (editingKey.value && keyValue.value === '' && label.value === '') {
    resetForm();
  }

  const isEdit = !!editingKey.value;

  const handleKeyInput = (val: string) => {
    keyValue.value = val;
    // Auto-detect provider
    const detected = detectProvider(val);
    if (detected !== 'custom') {
      provider.value = detected;
      if (!label.value) {
        const p = PROVIDERS.find((p) => p.id === detected);
        if (p) label.value = p.name;
      }
    }
  };

  const handleSave = async () => {
    if (!keyValue.value.trim()) {
      error.value = 'API Key is required';
      return;
    }
    if (!label.value.trim()) {
      error.value = 'Label is required';
      return;
    }

    const entry: ApiKeyEntry = {
      id: editingKey.value?.id || crypto.randomUUID(),
      provider: provider.value,
      label: label.value.trim(),
      keyValue: keyValue.value.trim(),
      keyPrefix: maskKey(keyValue.value.trim()),
      createdAt: editingKey.value?.createdAt || Date.now(),
      notes: notes.value.trim() || undefined,
    };

    if (isEdit) {
      keys.value = keys.value.map((k) => k.id === entry.id ? entry : k);
    } else {
      keys.value = [...keys.value, entry];
    }

    await persistVault();
    editingKey.value = null;
    keyValue.value = '';
    label.value = '';
    notes.value = '';
    currentPage.value = 'list';
  };

  const handleCancel = () => {
    editingKey.value = null;
    keyValue.value = '';
    label.value = '';
    notes.value = '';
    currentPage.value = 'list';
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '480px' }}>
      {/* Header */}
      <div style={{
        padding: '12px 20px',
        borderBottom: '1px solid #1e293b',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
      }}>
        <button onClick={handleCancel} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: '18px' }}>
          ←
        </button>
        <h2 style={{ fontSize: '15px', fontWeight: 600 }}>{isEdit ? 'Edit Key' : 'Add Key'}</h2>
      </div>

      {/* Form */}
      <div style={{ padding: '16px 20px', flex: 1 }}>
        {/* API Key input */}
        <div style={{ marginBottom: '14px' }}>
          <label style={labelStyle}>API Key</label>
          <input
            type="password"
            value={keyValue.value}
            onInput={(e) => handleKeyInput((e.target as HTMLInputElement).value)}
            placeholder="sk-... / sk-ant-... / AI..."
            autoFocus
            style={inputStyle}
          />
        </div>

        {/* Provider */}
        <div style={{ marginBottom: '14px' }}>
          <label style={labelStyle}>Provider</label>
          <select
            value={provider.value}
            onChange={(e) => provider.value = (e.target as HTMLSelectElement).value as ProviderId}
            style={inputStyle}
          >
            {PROVIDERS.map((p) => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
            <option value="custom">Other</option>
          </select>
        </div>

        {/* Label */}
        <div style={{ marginBottom: '14px' }}>
          <label style={labelStyle}>Label</label>
          <input
            value={label.value}
            onInput={(e) => label.value = (e.target as HTMLInputElement).value}
            placeholder="My OpenAI Key"
            style={inputStyle}
          />
        </div>

        {/* Notes */}
        <div style={{ marginBottom: '14px' }}>
          <label style={labelStyle}>Notes (optional)</label>
          <textarea
            value={notes.value}
            onInput={(e) => notes.value = (e.target as HTMLTextAreaElement).value}
            placeholder="What is this key for?"
            rows={2}
            style={{ ...inputStyle, resize: 'vertical' }}
          />
        </div>

        {error.value && (
          <p style={{ color: '#ef4444', fontSize: '12px', marginBottom: '12px' }}>{error.value}</p>
        )}

        <button onClick={handleSave} style={btnPrimary}>
          {isEdit ? 'Save Changes' : 'Add Key'}
        </button>
      </div>
    </div>
  );
}

const labelStyle: Record<string, string> = {
  display: 'block',
  fontSize: '12px',
  fontWeight: '600',
  color: '#94a3b8',
  marginBottom: '6px',
};

const inputStyle: Record<string, string> = {
  width: '100%',
  padding: '9px 12px',
  border: '1px solid #334155',
  borderRadius: '8px',
  fontSize: '13px',
  outline: 'none',
  background: '#1e293b',
  color: '#e2e8f0',
  fontFamily: 'inherit',
};

const btnPrimary: Record<string, string> = {
  width: '100%',
  padding: '10px',
  border: 'none',
  borderRadius: '10px',
  fontSize: '14px',
  fontWeight: '600',
  background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
  color: '#fff',
  cursor: 'pointer',
  fontFamily: 'inherit',
};
