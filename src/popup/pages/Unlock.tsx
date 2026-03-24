import { signal } from '@preact/signals';
import { decryptVault } from '@/shared/crypto/vault';
import { loadVault } from '@/shared/storage/vault-store';
import { currentPage, masterPassword, keys, vaultSalt } from '../App';
import { t } from '@/shared/i18n';

const pw = signal('');
const error = signal('');
const loading = signal(false);

export function Unlock() {
  const handleUnlock = async () => {
    if (!pw.value) return;
    loading.value = true;
    error.value = '';

    try {
      const vault = await loadVault();
      if (!vault) { currentPage.value = 'setup'; return; }

      const decrypted = await decryptVault(vault, pw.value);
      masterPassword.value = pw.value;
      vaultSalt.value = vault.salt;
      keys.value = decrypted;
      currentPage.value = 'list';
    } catch {
      error.value = t('unlockError');
    } finally {
      loading.value = false;
    }
  };

  return (
    <div style={{ padding: '32px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '480px', justifyContent: 'center' }}>
      <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px', fontSize: '28px' }}>
        🔐
      </div>
      <h1 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '4px' }}>{t('appName')}</h1>
      <p style={{ fontSize: '13px', color: '#94a3b8', marginBottom: '24px' }}>{t('unlockTitle')}</p>

      <div style={{ width: '100%' }}>
        <input
          type="password"
          value={pw.value}
          onInput={(e) => { pw.value = (e.target as HTMLInputElement).value; error.value = ''; }}
          onKeyDown={(e) => e.key === 'Enter' && handleUnlock()}
          placeholder={t('unlockPassword')}
          disabled={loading.value}
          autoFocus
          style={{
            width: '100%', padding: '10px 14px',
            border: `1px solid ${error.value ? '#ef4444' : '#334155'}`,
            borderRadius: '10px', fontSize: '14px', outline: 'none',
            background: '#1e293b', color: '#e2e8f0', fontFamily: 'inherit',
          }}
        />

        {error.value && (
          <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '8px' }}>{error.value}</p>
        )}

        <button
          onClick={handleUnlock}
          disabled={loading.value || !pw.value}
          style={{
            width: '100%', marginTop: '12px', padding: '10px', border: 'none',
            borderRadius: '10px', fontSize: '14px', fontWeight: '600',
            background: loading.value ? '#475569' : 'linear-gradient(135deg, #6366f1, #8b5cf6)',
            color: '#fff', cursor: loading.value ? 'wait' : 'pointer', fontFamily: 'inherit',
          }}
        >
          {loading.value ? t('unlockLoading') : t('unlockButton')}
        </button>
      </div>
    </div>
  );
}
