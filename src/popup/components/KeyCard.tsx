import type { ApiKeyEntry } from '@/shared/types';
import { getProvider } from '@/shared/providers/registry';
import { signal } from '@preact/signals';
import { t } from '@/shared/i18n';

interface Props {
  entry: ApiKeyEntry;
  onCopy: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

const copiedId = signal<string | null>(null);
const confirmDeleteId = signal<string | null>(null);

export function KeyCard({ entry, onCopy, onEdit, onDelete }: Props) {
  const provider = getProvider(entry.provider);
  const isCopied = copiedId.value === entry.id;
  const isConfirming = confirmDeleteId.value === entry.id;

  const handleCopy = () => {
    onCopy();
    copiedId.value = entry.id;
    setTimeout(() => { if (copiedId.value === entry.id) copiedId.value = null; }, 1500);
  };

  const handleDelete = () => {
    if (isConfirming) {
      confirmDeleteId.value = null;
      onDelete();
    } else {
      confirmDeleteId.value = entry.id;
      setTimeout(() => { if (confirmDeleteId.value === entry.id) confirmDeleteId.value = null; }, 3000);
    }
  };

  return (
    <div style={{
      background: '#1e293b', borderRadius: '10px', padding: '12px 14px',
      marginBottom: '8px', border: '1px solid #334155',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: provider?.color || '#64748b', flexShrink: 0 }} />
          <span style={{ fontSize: '13px', fontWeight: 600 }}>{entry.label}</span>
        </div>
        <span style={{ fontSize: '11px', color: '#64748b' }}>{provider?.name || 'Custom'}</span>
      </div>

      <div style={{ fontSize: '12px', color: '#64748b', fontFamily: 'monospace', marginBottom: '8px' }}>
        {entry.keyPrefix}
      </div>

      <div style={{ display: 'flex', gap: '6px' }}>
        <button onClick={handleCopy} style={actionBtn(isCopied)}>
          {isCopied ? `✓ ${t('keyCopied')}` : t('keyCopy')}
        </button>
        <button onClick={onEdit} style={actionBtn(false)}>{t('keyEdit')}</button>
        <button onClick={handleDelete} style={{
          ...actionBtn(false),
          color: isConfirming ? '#fff' : '#ef4444',
          background: isConfirming ? '#ef4444' : '#0f172a',
        }}>
          {isConfirming ? t('keyDeleteConfirm') : t('keyDelete')}
        </button>
      </div>
    </div>
  );
}

function actionBtn(active: boolean): Record<string, string> {
  return {
    padding: '4px 10px', border: 'none', borderRadius: '6px',
    fontSize: '11px', fontWeight: '500',
    background: active ? '#22c55e20' : '#0f172a',
    color: active ? '#22c55e' : '#94a3b8', cursor: 'pointer', fontFamily: 'inherit',
  };
}
