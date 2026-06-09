export default function StatsBar({ stats }) {
  const StatItem = ({ value, label, highlight }) => (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      flex: 1
    }}>
      <div style={{
        fontFamily: 'var(--font-display)',
        fontSize: '16px',
        color: highlight ? 'var(--color-teal)' : 'var(--text-primary)',
        display: 'flex',
        alignItems: 'center',
        gap: '4px'
      }}>
        {value}
      </div>
      <div style={{
        fontSize: '9px',
        color: 'var(--text-muted)',
        letterSpacing: '1px',
        textTransform: 'uppercase',
        marginTop: '2px'
      }}>
        {label}
      </div>
    </div>
  );

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      paddingTop: '16px',
      borderTop: '1px solid var(--bg-surface)'
    }}>
      <StatItem value={stats?.sessions || 0} label="SESSIONS" />
      <div style={{ width: '1px', height: '24px', backgroundColor: 'var(--bg-surface)' }} />
      <StatItem value={`${stats?.focusMinutes || 0}m`} label="FOCUSED" highlight />
      <div style={{ width: '1px', height: '24px', backgroundColor: 'var(--bg-surface)' }} />
      <StatItem value={<>🔥 {stats?.streak || 0}</>} label="DAY STREAK" />
    </div>
  );
}
