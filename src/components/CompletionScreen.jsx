export default function CompletionScreen({ activeTask, timeSpent, onBack, stats }) {
  const spentMinutes = Math.floor((timeSpent || 0) / 60);

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '16px 14px', gap: '10px' }}>
      <div style={{ fontSize: '36px' }}>✅</div>
      <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '16px', color: 'var(--text-primary)', margin: 0 }}>
        Session complete!
      </h2>
      <p style={{ fontSize: '11px', color: 'var(--text-secondary)', textAlign: 'center', lineHeight: '1.5', margin: 0 }}>
        {activeTask?.text || 'Task'} — done.<br />You focused for {spentMinutes} minutes.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', width: '100%', marginTop: '12px', marginBottom: '12px' }}>
        <div style={{ background: 'var(--bg-surface)', borderRadius: '8px', padding: '8px 10px', border: '0.5px solid var(--bg-elevated)' }}>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: '16px', fontWeight: '600', color: 'var(--color-teal)' }}>{spentMinutes}m</div>
          <div style={{ fontSize: '9px', color: 'var(--text-muted)', marginTop: '2px' }}>Time spent</div>
        </div>
        <div style={{ background: 'var(--bg-surface)', borderRadius: '8px', padding: '8px 10px', border: '0.5px solid var(--bg-elevated)' }}>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: '16px', fontWeight: '600', color: 'var(--color-violet)' }}>--</div>
          <div style={{ fontSize: '9px', color: 'var(--text-muted)', marginTop: '2px' }}>Over estimate</div>
        </div>
        <div style={{ background: 'var(--bg-surface)', borderRadius: '8px', padding: '8px 10px', border: '0.5px solid var(--bg-elevated)' }}>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: '16px', fontWeight: '600', color: 'var(--text-primary)' }}>{stats?.sessions || 0}</div>
          <div style={{ fontSize: '9px', color: 'var(--text-muted)', marginTop: '2px' }}>Sessions today</div>
        </div>
        <div style={{ background: 'var(--bg-surface)', borderRadius: '8px', padding: '8px 10px', border: '0.5px solid var(--bg-elevated)' }}>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: '16px', fontWeight: '600', color: '#f59e0b' }}>🔥 {stats?.streak || 0}</div>
          <div style={{ fontSize: '9px', color: 'var(--text-muted)', marginTop: '2px' }}>Day streak</div>
        </div>
      </div>

      <button onClick={onBack} style={{
        width: '100%', padding: '10px', borderRadius: '10px', backgroundColor: 'var(--color-violet)',
        border: 'none', color: '#fff', fontFamily: 'var(--font-heading)', fontSize: '13px', fontWeight: '600', cursor: 'pointer'
      }}>
        Back to tasks
      </button>
      <button onClick={onBack} style={{
        width: '100%', padding: '9px', borderRadius: '10px', backgroundColor: 'transparent',
        border: '0.5px solid var(--bg-surface)', color: 'var(--text-secondary)', fontSize: '12px', cursor: 'pointer'
      }}>
        Take a 5 min break
      </button>
    </div>
  );
}
