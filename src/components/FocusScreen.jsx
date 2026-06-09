import TimerRing from './TimerRing';
import TimeInputRow from './TimeInputRow';
import ControlsRow from './ControlsRow';

export default function FocusScreen({ activeTask, onCompleteTask, timer }) {
  const { remainingTime, totalTime, isActive, startTimer, pauseTimer, resetTimer, updateTime } = timer;
  
  let pColor = '#2DD4BF';
  if (activeTask?.priority === 'p1') pColor = '#ef4444';
  if (activeTask?.priority === 'p2') pColor = '#f59e0b';
  if (activeTask?.priority === 'p3') pColor = '#7C3AED';

  const spentSoFar = totalTime - remainingTime;
  const isOver = false; // Add logic if timer goes into negative

  const percentDone = totalTime > 0 ? (totalTime - remainingTime) / totalTime : 0;
  const showNudge = (percentDone > 0.49 && percentDone < 0.55) || (percentDone > 0.79 && percentDone < 0.85);

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      
      <div style={{ 
        margin: '8px 12px', background: 'var(--bg-surface)', borderRadius: '8px', padding: '8px 10px',
        display: 'flex', alignItems: 'center', gap: '8px', borderLeft: `3px solid ${pColor}`
      }}>
        <div style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: pColor }} />
        <div style={{ fontSize: '12px', color: 'var(--text-primary)', fontWeight: '500', flex: 1 }}>{activeTask?.text || 'Select a task'}</div>
        <div style={{ fontSize: '9px', fontWeight: 'bold', padding: '2px 5px', borderRadius: '4px', color: pColor, background: `${pColor}22`, textTransform: 'uppercase' }}>
          {activeTask?.priority || 'P4'}
        </div>
        <div onClick={onCompleteTask} style={{
          width: '15px', height: '15px', borderRadius: '4px', border: '1.5px solid var(--bg-elevated)', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <span style={{ fontSize: '10px', color: 'transparent' }}>✓</span>
        </div>
      </div>

      <TimerRing remainingTime={remainingTime} totalTime={totalTime} isActive={isActive} activeTask={activeTask} />

      <div style={{ margin: '0 12px 6px', display: 'flex', gap: '5px' }}>
        <div style={{ flex: 1, background: 'var(--bg-surface)', border: '0.5px solid var(--bg-elevated)', borderRadius: '7px', padding: '5px 8px', textAlign: 'center' }}>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: '13px', fontWeight: '600', color: 'var(--text-primary)' }}>{Math.floor(totalTime/60)}m</div>
          <div style={{ fontSize: '9px', color: 'var(--text-muted)' }}>Planned</div>
        </div>
        <div style={{ flex: 1, background: 'var(--bg-surface)', border: '0.5px solid var(--bg-elevated)', borderRadius: '7px', padding: '5px 8px', textAlign: 'center' }}>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: '13px', fontWeight: '600', color: isOver ? '#f59e0b' : '#2DD4BF' }}>{Math.floor(spentSoFar/60)}m</div>
          <div style={{ fontSize: '9px', color: 'var(--text-muted)' }}>Spent so far</div>
        </div>
        <div style={{ flex: 1, background: 'var(--bg-surface)', border: '0.5px solid var(--bg-elevated)', borderRadius: '7px', padding: '5px 8px', textAlign: 'center' }}>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: '13px', fontWeight: '600', color: 'var(--text-primary)' }}>{Math.floor(remainingTime/60)}m</div>
          <div style={{ fontSize: '9px', color: 'var(--text-muted)' }}>Remaining</div>
        </div>
      </div>

      <TimeInputRow onTimeChange={(s) => !isActive && updateTime(s)} disabled={isActive} />
      <ControlsRow isActive={isActive} onStartPause={() => isActive ? pauseTimer() : startTimer(totalTime)} onReset={resetTimer} />

      {showNudge && (
        <div style={{
          margin: '0 12px 6px', background: 'rgba(124,58,237,0.12)', border: '0.5px solid rgba(124,58,237,0.3)',
          borderRadius: '8px', padding: '7px 10px', display: 'flex', alignItems: 'center', gap: '7px'
        }}>
          <span style={{ fontSize: '14px' }}>⚡</span>
          <span style={{ fontSize: '11px', color: '#A78BFA', flex: 1 }}>Just a little more time left — you've got this. Stay locked in.</span>
        </div>
      )}

    </div>
  );
}
