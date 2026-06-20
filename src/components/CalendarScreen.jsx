import { useMemo, useState } from 'react';

export default function CalendarScreen({ tasks, stats }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  // Default selection to today
  const [selectedDateStr, setSelectedDateStr] = useState(() => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  });

  // Group completed tasks by standard YYYY-MM-DD local string for easy mapping
  const tasksByDate = useMemo(() => {
    const map = {};
    tasks.forEach(task => {
      if (task.completed && task.completedAt) {
        const d = new Date(task.completedAt);
        const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
        if (!map[key]) map[key] = [];
        map[key].push(task);
      }
    });
    return map;
  }, [tasks]);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay(); // 0 (Sun) to 6 (Sat)

  const monthName = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });

  const handlePrevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const handleNextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  // Generate calendar grid
  const days = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(null); // empty padding
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  const selectedTasks = selectedDateStr ? (tasksByDate[selectedDateStr] || []) : [];

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '0 12px', overflowY: 'auto' }}>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '16px' }}>
        <div>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '18px', color: 'var(--text-primary)', marginBottom: '4px', marginTop: 0 }}>
            History Log
          </h2>
          <p style={{ fontSize: '11px', color: 'var(--text-muted)', margin: 0 }}>
            Lifetime Focus: <span style={{ color: 'var(--color-teal)', fontWeight: 'bold' }}>{stats?.focusMinutes || 0}m</span>
          </p>
        </div>
        <div style={{ fontSize: '24px' }}>📅</div>
      </div>

      {/* True Calendar Grid UI */}
      <div style={{ background: 'var(--bg-surface)', borderRadius: '12px', padding: '12px', marginBottom: '16px', border: '1px solid var(--bg-elevated)', flexShrink: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <button onClick={handlePrevMonth} style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>◀</button>
          <div style={{ fontSize: '13px', fontWeight: 'bold' }}>{monthName}</div>
          <button onClick={handleNextMonth} style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>▶</button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px', textAlign: 'center', fontSize: '10px', color: 'var(--text-muted)', marginBottom: '8px' }}>
          <div>Su</div><div>Mo</div><div>Tu</div><div>We</div><div>Th</div><div>Fr</div><div>Sa</div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px' }}>
          {days.map((day, idx) => {
            if (!day) return <div key={idx} />;

            const dateKey = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const hasTasks = tasksByDate[dateKey]?.length > 0;
            const isSelected = selectedDateStr === dateKey;

            return (
              <div 
                key={idx} 
                onClick={() => setSelectedDateStr(dateKey)}
                style={{ 
                  aspectRatio: '1', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                  fontSize: '11px', borderRadius: '6px', cursor: 'pointer',
                  background: isSelected ? 'var(--color-violet)' : (hasTasks ? 'var(--bg-elevated)' : 'transparent'),
                  color: isSelected ? '#fff' : (hasTasks ? 'var(--text-primary)' : 'var(--text-secondary)'),
                  border: isSelected ? 'none' : '1px solid transparent',
                  position: 'relative'
                }}>
                {day}
                {hasTasks && !isSelected && (
                  <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--color-teal)', position: 'absolute', bottom: '4px' }} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Day Tasks */}
      {selectedDateStr && (
        <div style={{ paddingBottom: '16px' }}>
          <div style={{ fontSize: '11px', fontWeight: 'bold', color: 'var(--text-secondary)', marginBottom: '8px', textTransform: 'uppercase' }}>
            Tasks on {selectedDateStr}
          </div>
          {selectedTasks.length === 0 ? (
            <div style={{ fontSize: '12px', color: 'var(--text-muted)', textAlign: 'center', padding: '10px', background: 'var(--bg-surface)', borderRadius: '8px' }}>
              No tasks completed on this day.
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {selectedTasks.map(task => {
                let pColor = '#2DD4BF';
                if (task.priority === 'p1') pColor = '#ef4444';
                if (task.priority === 'p2') pColor = '#f59e0b';
                if (task.priority === 'p3') pColor = '#7C3AED';

                return (
                  <div key={task.id} style={{
                    background: 'var(--bg-surface)', border: '0.5px solid var(--bg-elevated)', borderLeft: `3px solid ${pColor}`,
                    borderRadius: '8px', padding: '8px 10px', display: 'flex', alignItems: 'center', gap: '8px'
                  }}>
                    <div style={{ color: '#2DD4BF', fontSize: '12px' }}>✓</div>
                    <div style={{ flex: 1, fontSize: '12px', color: 'var(--text-primary)', opacity: 0.8 }}>
                      {task.text}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
