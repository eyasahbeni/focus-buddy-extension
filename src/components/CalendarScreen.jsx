import { useMemo } from 'react';

export default function CalendarScreen({ tasks, stats }) {
  // Group completed tasks by day
  const groupedTasks = useMemo(() => {
    const groups = {};
    tasks.forEach(task => {
      if (task.completed && task.completedAt) {
        const dateObj = new Date(task.completedAt);
        const dateStr = dateObj.toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' });
        if (!groups[dateStr]) groups[dateStr] = { dateObj, tasks: [] };
        groups[dateStr].tasks.push(task);
      }
    });

    // Convert to sorted array (newest first)
    return Object.entries(groups).sort((a, b) => b[1].dateObj - a[1].dateObj);
  }, [tasks]);

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

      {groupedTasks.length === 0 ? (
        <div style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '12px', marginTop: '30px' }}>
          No completed tasks yet. Time to get to work!
        </div>
      ) : (
        groupedTasks.map(([dateStr, data]) => (
          <div key={dateStr} style={{ marginBottom: '16px' }}>
            <div style={{ fontSize: '11px', fontWeight: 'bold', color: 'var(--text-secondary)', marginBottom: '8px', textTransform: 'uppercase' }}>
              {dateStr}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {data.tasks.map(task => {
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
                    <div style={{ flex: 1, fontSize: '12px', color: 'var(--text-primary)', textDecoration: 'line-through', opacity: 0.8 }}>
                      {task.text}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
