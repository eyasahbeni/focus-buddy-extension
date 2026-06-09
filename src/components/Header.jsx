export default function Header() {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: '40px',
      marginBottom: '20px'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div style={{
          width: '8px',
          height: '8px',
          backgroundColor: 'var(--color-violet)',
          borderRadius: '50%',
          boxShadow: '0 0 8px var(--color-lavender)'
        }} />
        <span style={{
          fontFamily: 'var(--font-display)',
          fontSize: '14px',
          color: 'var(--text-primary)'
        }}>Focus Buddy</span>
      </div>
      <button style={{
        color: 'var(--text-muted)',
        fontSize: '16px'
      }}>
        ⚙️
      </button>
    </div>
  );
}
