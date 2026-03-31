import { signal } from '@preact/signals';
import { encryptVault } from '@/shared/crypto/vault';
import { saveVault } from '@/shared/storage/vault-store';
import { currentPage, masterPassword, vaultSalt, keys, resetAutoLock } from '../App';
import { generateSalt } from '@/shared/crypto/master-key';
import { t } from '@/shared/i18n';

const pw = signal('');
const pwConfirm = signal('');
const error = signal('');

const MIN_PASSWORD_LENGTH = 12;

function checkPasswordStrength(password: string): string | null {
  if (password.length < MIN_PASSWORD_LENGTH) return t('setupErrorShort');
  if (!/[A-Z]/.test(password)) return t('setupErrorUppercase');
  if (!/[a-z]/.test(password)) return t('setupErrorLowercase');
  if (!/[0-9]/.test(password)) return t('setupErrorDigit');
  if (!/[^A-Za-z0-9]/.test(password)) return t('setupErrorSpecial');
  return null;
}

export function Setup() {
  const handleCreate = async () => {
    const strengthError = checkPasswordStrength(pw.value);
    if (strengthError) {
      error.value = strengthError;
      return;
    }
    if (pw.value !== pwConfirm.value) {
      error.value = t('setupErrorMatch');
      return;
    }

    const salt = generateSalt();
    const vault = await encryptVault([], pw.value, salt);
    await saveVault(vault);

    masterPassword.value = pw.value;
    vaultSalt.value = salt;
    keys.value = [];
    currentPage.value = 'list';
    resetAutoLock();
  };

  return (
    <div style={{ padding: '32px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '480px' }}>
      <div style={{ marginBottom: '24px', textAlign: 'center' }}>
        <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px', fontSize: '28px' }}>
          🔐
        </div>
        <h1 style={{ fontSize: '22px', fontWeight: 700 }}>{t('appName')}</h1>
        <p style={{ fontSize: '13px', color: '#94a3b8', marginTop: '4px' }}>{t('appTagline')}</p>
      </div>

      <div style={{ width: '100%', marginTop: '8px' }}>
        <p style={{ fontSize: '15px', fontWeight: 600, marginBottom: '16px', textAlign: 'center' }}>
          {t('setupTitle')}
        </p>
        <p style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '16px', textAlign: 'center' }}>
          {t('setupDesc')}
        </p>

        <input
          type="password"
          value={pw.value}
          onInput={(e) => { pw.value = (e.target as HTMLInputElement).value; error.value = ''; }}
          placeholder={t('setupPassword')}
          style={inputStyle}
          autoFocus
        />
        <p style={{ fontSize: '11px', color: '#64748b', marginTop: '4px' }}>
          {t('setupPasswordHint')}
        </p>
        <input
          type="password"
          value={pwConfirm.value}
          onInput={(e) => { pwConfirm.value = (e.target as HTMLInputElement).value; error.value = ''; }}
          placeholder={t('setupConfirm')}
          onKeyDown={(e) => e.key === 'Enter' && handleCreate()}
          style={{ ...inputStyle, marginTop: '8px' }}
        />

        {error.value && (
          <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '8px' }}>{error.value}</p>
        )}

        <button onClick={handleCreate} style={btnPrimary}>
          {t('setupButton')}
        </button>
      </div>
    </div>
  );
}

const inputStyle: Record<string, string> = {
  width: '100%', padding: '10px 14px', border: '1px solid #334155',
  borderRadius: '10px', fontSize: '14px', outline: 'none',
  background: '#1e293b', color: '#e2e8f0', fontFamily: 'inherit',
};

const btnPrimary: Record<string, string> = {
  width: '100%', marginTop: '16px', padding: '10px', border: 'none',
  borderRadius: '10px', fontSize: '14px', fontWeight: '600',
  background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
  color: '#fff', cursor: 'pointer', fontFamily: 'inherit',
};
