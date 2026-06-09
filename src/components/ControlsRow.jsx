import { useState } from 'react';

export default function ControlsRow({ isActive, onStartPause, onReset }) {
  const [isHovered, setIsHovered] = useState(false);
  const [resetRotation, setResetRotation] = useState(0);

  const handleResetClick = () => {
    setResetRotation(prev => prev - 360);
    onReset();
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
      
      {/* Reset Button */}
      <button 
        onClick={handleResetClick}
        style={{
          width: '40px',
          height: '40px',
          borderRadius: '10px',
          backgroundColor: 'var(--bg-elevated)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          transform: `rotate(${resetRotation}deg)`,
          transition: 'transform 300ms ease, background-color 0.2s ease',
          color: 'var(--text-secondary)'
        }}
        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-surface)'}
        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-elevated)'}
      >
        ↺
      </button>

      {/* Primary Start/Pause Button */}
      <button 
        onClick={onStartPause}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          width: '140px',
          height: '48px',
          borderRadius: '12px',
          background: 'linear-gradient(135deg, var(--color-violet), hsl(263, 70%, 50%))',
          color: 'var(--text-primary)',
          fontFamily: 'var(--font-display)',
          fontSize: '16px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '8px',
          boxShadow: isHovered ? '0 0 0 4px rgba(124,58,237,0.25)' : 'none',
          transform: isHovered ? 'scale(1.02)' : 'scale(1)',
          transition: 'all 200ms ease'
        }}
      >
        {isActive ? (
          <><span>⏸</span> Pause</>
        ) : (
          <><span>▶</span> Start</>
        )}
      </button>

      {/* Skip Button */}
      <button 
        style={{
          width: '40px',
          height: '40px',
          borderRadius: '10px',
          backgroundColor: 'var(--bg-elevated)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'var(--text-secondary)'
        }}
        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-surface)'}
        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-elevated)'}
      >
        ⏭
      </button>
    </div>
  );
}
