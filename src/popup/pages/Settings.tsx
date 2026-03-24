import { currentPage } from '../App';
import { t, currentLang, setLang, type Lang } from '@/shared/i18n';

export function Settings() {
  const handleBack = () => { currentPage.value = 'list'; };

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', minHeight: '480px' }}
      onKeyDown={(e) => e.key === 'Escape' && handleBack()}
    >
      {/* Header */}
      <div style={{
        padding: '12px 20px', borderBottom: '1px solid #1e293b',
        display: 'flex', alignItems: 'center', gap: '12px',
      }}>
        <button
          onClick={handleBack}
          aria-label={t('settingsBack')}
          style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: '18px' }}
        >
          ←
        </button>
        <h2 style={{ fontSize: '15px', fontWeight: 600 }}>{t('settingsTitle')}</h2>
      </div>

      {/* Settings */}
      <div style={{ padding: '16px 20px' }}>
        {/* Language */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#94a3b8', marginBottom: '10px' }}>
            {t('settingsLang')}
          </label>
          <div style={{ display: 'flex', gap: '8px' }}>
            <LangButton lang="en" label="English" />
            <LangButton lang="zh-TW" label="繁體中文" />
          </div>
        </div>
      </div>
    </div>
  );
}

function LangButton({ lang, label }: { lang: Lang; label: string }) {
  const isActive = currentLang.value === lang;
  return (
    <button
      onClick={() => setLang(lang)}
      style={{
        flex: 1,
        padding: '10px',
        border: `2px solid ${isActive ? '#6366f1' : '#334155'}`,
        borderRadius: '10px',
        fontSize: '13px',
        fontWeight: isActive ? '700' : '500',
        background: isActive ? '#6366f120' : '#1e293b',
        color: isActive ? '#a5b4fc' : '#94a3b8',
        cursor: 'pointer',
        fontFamily: 'inherit',
        transition: 'all 0.15s',
      }}
    >
      {label}
    </button>
  );
}
