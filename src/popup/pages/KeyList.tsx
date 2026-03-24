import { keys, currentPage, editingKey, persistVault, resetAutoLock } from '../App';
import { KeyCard } from '../components/KeyCard';
import { t } from '@/shared/i18n';
import type { ApiKeyEntry } from '@/shared/types';

const CLIPBOARD_CLEAR_MS = 30_000;

export function KeyList() {
  const handleDelete = async (id: string) => {
    keys.value = keys.value.filter((k) => k.id !== id);
    await persistVault();
    resetAutoLock();
  };

  const handleEdit = (key: ApiKeyEntry) => {
    editingKey.value = key;
    currentPage.value = 'edit';
    resetAutoLock();
  };

  const handleCopy = async (keyValue: string) => {
    await navigator.clipboard.writeText(keyValue);
    resetAutoLock();
    // Auto-clear clipboard after 30 seconds
    setTimeout(async () => {
      try {
        const current = await navigator.clipboard.readText();
        if (current === keyValue) {
          await navigator.clipboard.writeText('');
        }
      } catch {
        // readText may fail without focus — silently ignore
      }
    }, CLIPBOARD_CLEAR_MS);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '480px' }}>
      {/* Header */}
      <div style={{
        padding: '16px 20px',
        borderBottom: '1px solid #1e293b',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '18px' }}>🔑</span>
          <h1 style={{ fontSize: '16px', fontWeight: 700 }}>{t('keyListTitle')}</h1>
          <span style={{ fontSize: '11px', color: '#64748b', background: '#1e293b', padding: '2px 8px', borderRadius: '8px' }}>
            {keys.value.length} {t('keyListCount')}
          </span>
        </div>
        <div style={{ display: 'flex', gap: '6px' }}>
          <button
            onClick={() => { currentPage.value = 'settings'; resetAutoLock(); }}
            aria-label={t('settingsTitle')}
            style={{
              padding: '6px 10px', border: 'none', borderRadius: '8px',
              fontSize: '13px', background: '#1e293b', color: '#94a3b8', cursor: 'pointer',
            }}
          >
            ⚙
          </button>
          <button
            onClick={() => { editingKey.value = null; currentPage.value = 'add'; resetAutoLock(); }}
            style={{
              padding: '6px 14px', border: 'none', borderRadius: '8px',
              fontSize: '13px', fontWeight: '600', background: '#6366f1',
              color: '#fff', cursor: 'pointer',
            }}
          >
            {t('keyListAdd')}
          </button>
        </div>
      </div>

      {/* Key list */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '8px 12px' }}>
        {keys.value.length === 0 ? (
          <div style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            justifyContent: 'center', height: '320px', color: '#64748b', textAlign: 'center',
          }}>
            <span style={{ fontSize: '40px', marginBottom: '12px' }}>🔒</span>
            <p style={{ fontSize: '15px', fontWeight: '600', color: '#94a3b8' }}>{t('keyListEmpty')}</p>
            <p style={{ fontSize: '12px', marginTop: '4px' }}>{t('keyListEmptyHint')}</p>
          </div>
        ) : (
          keys.value.map((key) => (
            <KeyCard
              key={key.id}
              entry={key}
              onCopy={() => handleCopy(key.keyValue)}
              onEdit={() => handleEdit(key)}
              onDelete={() => handleDelete(key.id)}
            />
          ))
        )}
      </div>
    </div>
  );
}
