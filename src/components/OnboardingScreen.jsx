export default function OnboardingScreen({ onContinue }) {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px 20px', gap: '16px' }}>
      <div style={{
        width: '72px', height: '72px', borderRadius: '50%',
        backgroundColor: 'var(--bg-surface)', border: '2px solid var(--color-violet)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px'
      }}>
        🧠
      </div>
      <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '17px', color: 'var(--text-primary)', textAlign: 'center', margin: 0 }}>
        Your ADHD focus companion
      </h2>
      <p style={{ fontSize: '12px', color: 'var(--text-secondary)', textAlign: 'center', lineHeight: '1.6', margin: 0 }}>
        Speak your tasks, set a timer,<br />get it done — one thing at a time.
      </p>
      
      <div style={{ width: '100%', marginTop: '8px' }}>
        <button 
          onClick={onContinue}
          style={{
            width: '100%', padding: '10px', borderRadius: '10px',
            backgroundColor: 'var(--color-violet)', border: 'none', color: '#fff',
            fontFamily: 'var(--font-heading)', fontSize: '13px', fontWeight: '600',
            cursor: 'pointer', marginBottom: '8px'
          }}>
          Continue with Google
        </button>
        <button 
          onClick={onContinue}
          style={{
            width: '100%', padding: '9px', borderRadius: '10px',
            backgroundColor: 'transparent', border: '0.5px solid var(--bg-surface)', color: 'var(--text-secondary)',
            fontSize: '12px', cursor: 'pointer'
          }}>
          Use email instead
        </button>
      </div>
    </div>
  );
}
