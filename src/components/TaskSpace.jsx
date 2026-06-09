export default function TaskSpace({ tasks, activeTask, onSetActiveTask, onDeleteTask }) {
  if (tasks.length === 0) return null;

  return (
    <div style={{ marginTop: '24px', borderTop: '1px solid var(--bg-surface)', paddingTop: '16px' }}>
      <h3 style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '1px' }}>
        Note Space
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {tasks.map(task => {
          const isActive = activeTask && activeTask.id === task.id;
          
          let priorityColor = 'var(--text-muted)';
          if (task.priority === 'high') priorityColor = '#EF4444'; // Red
          else if (task.priority === 'low') priorityColor = 'var(--color-teal)';

          return (
            <div 
              key={task.id}
              onClick={() => onSetActiveTask(task)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px',
                backgroundColor: isActive ? 'var(--bg-elevated)' : 'var(--bg-surface)',
                borderRadius: '8px',
                border: `1px solid ${isActive ? 'var(--color-violet)' : 'transparent'}`,
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: priorityColor }} />
                <span style={{ color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)', fontSize: '14px' }}>
                  {task.text}
                </span>
              </div>
              <button 
                onClick={(e) => { e.stopPropagation(); onDeleteTask(task.id); }}
                style={{ color: 'var(--text-muted)', fontSize: '14px' }}
              >
                ✕
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
