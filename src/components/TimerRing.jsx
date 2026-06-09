import { useEffect, useState } from 'react';

export default function TimerRing({ remainingTime, totalTime, isActive, activeTask }) {
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  
  // Calculate progress safely
  const progress = totalTime > 0 ? (remainingTime / totalTime) : 0;
  const strokeDashoffset = circumference - progress * circumference;

  const formatTime = (timeInSeconds) => {
    const h = Math.floor(timeInSeconds / 3600);
    const m = Math.floor((timeInSeconds % 3600) / 60);
    const s = timeInSeconds % 60;
    if (h > 0) {
      return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    }
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const isComplete = totalTime > 0 && remainingTime === 0;

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      position: 'relative',
      margin: '20px 0'
    }}>
      <div style={{
        color: 'var(--text-muted)',
        fontSize: '10px',
        letterSpacing: '1px',
        textTransform: 'uppercase',
        marginBottom: '16px',
        fontFamily: 'var(--font-body)',
        textAlign: 'center',
        minHeight: '14px'
      }}>
        {activeTask ? activeTask.text : 'Deep Work · Session 1'}
      </div>

      <div style={{ position: 'relative', width: '180px', height: '180px' }}>
        <svg width="180" height="180" style={{ transform: 'rotate(-90deg)' }}>
          {/* Background Ring */}
          <circle
            cx="90"
            cy="90"
            r={radius}
            fill="transparent"
            stroke="var(--bg-elevated)"
            strokeWidth="8"
          />
          {/* Inner Teal Ghost Ring (trailing) */}
          <circle
            cx="90"
            cy="90"
            r={radius}
            fill="transparent"
            stroke="var(--color-teal)"
            strokeWidth="4"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            style={{
              transition: 'stroke-dashoffset 1.3s linear',
              opacity: isActive ? 0.3 : 0
            }}
          />
          {/* Primary Violet Progress Ring */}
          <circle
            cx="90"
            cy="90"
            r={radius}
            fill="transparent"
            stroke={isComplete ? "var(--color-teal)" : "var(--color-violet)"}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            style={{
              transition: isComplete ? 'stroke 0.6s ease' : 'stroke-dashoffset 1s linear',
              filter: 'drop-shadow(0 0 6px rgba(124,58,237,0.3))'
            }}
          />
        </svg>

        {/* Time Display */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <div 
            className={isActive ? 'ticking' : ''}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '34px',
              color: 'var(--text-primary)',
              lineHeight: 1,
              animation: isComplete ? 'ring-flash 0.6s ease' : 'none'
            }}
          >
            <span className="digit" style={{ display: 'inline-block' }}>
              {formatTime(remainingTime)}
            </span>
          </div>
          <div style={{
            fontSize: '10px',
            color: 'var(--text-muted)',
            marginTop: '4px',
            letterSpacing: '1px'
          }}>
            REMAINING
          </div>
        </div>
      </div>
    </div>
  );
}
