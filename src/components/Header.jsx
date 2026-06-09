export default function Header({ onBack }) {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '12px 14px 8px',
      borderBottom: '0.5px solid var(--bg-surface)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--color-violet)' }} />
        <h1 style={{ margin: 0, fontSize: '13px', fontWeight: '600', color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>
          Focus Buddy
        </h1>
      </div>
      <div style={{ display: 'flex', gap: '8px' }}>
        {onBack && (
          <button onClick={onBack} style={{
            width: '26px', height: '26px', borderRadius: '6px', border: '0.5px solid var(--bg-surface)',
            background: 'var(--bg-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', color: 'var(--text-secondary)'
          }}>
            <span style={{ fontSize: '12px' }}>←</span>
          </button>
        )}
        <button style={{
          width: '26px', height: '26px', borderRadius: '6px', border: '0.5px solid var(--bg-surface)',
          background: 'var(--bg-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', color: 'var(--text-secondary)'
        }}>
          ⚙
        </button>
      </div>
    </div>
  );
}
