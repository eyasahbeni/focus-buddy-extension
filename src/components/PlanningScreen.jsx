import { useState } from 'react';

export default function PlanningScreen({ tasks, setTasks, onSelectTask, onToggleDone, onOpenCalendar }) {
  const [inputText, setInputText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editTaskText, setEditTaskText] = useState('');

  const startRecording = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Voice input is not supported in your browser.");
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.onstart = () => setIsRecording(true);
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInputText(transcript);
    };
    recognition.onerror = () => setIsRecording(false);
    recognition.onend = () => setIsRecording(false);
    recognition.start();
  };

  const submitTasks = () => {
    if (inputText.trim()) {
      const rawTasks = inputText.toLowerCase().split(/\b(?:and|then)\b/);
      const newTasks = rawTasks.map(rawText => {
        let text = rawText.trim();
        if (!text) return null;
        let priority = 'p4'; // default
        if (text.includes('high priority') || text.includes('priority one') || text.includes('p1')) { priority = 'p1'; text = text.replace(/high priority|priority one|p1/g, '').trim(); }
        else if (text.includes('priority two') || text.includes('p2')) { priority = 'p2'; text = text.replace(/priority two|p2/g, '').trim(); }
        else if (text.includes('priority three') || text.includes('p3')) { priority = 'p3'; text = text.replace(/priority three|p3/g, '').trim(); }
        else if (text.includes('low priority') || text.includes('p4')) { priority = 'p4'; text = text.replace(/low priority|p4/g, '').trim(); }
        text = text.charAt(0).toUpperCase() + text.slice(1);
        return { id: Date.now() + Math.random(), text, priority, completed: false };
      }).filter(Boolean);
      
      setTasks(prev => [...prev, ...newTasks]);
      setInputText('');
    }
  };

  const handleCyclePriority = (e, taskId, currentPriority) => {
    e.stopPropagation();
    const nextMap = { p4: 'p3', p3: 'p2', p2: 'p1', p1: 'p4' };
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, priority: nextMap[currentPriority] } : t));
  };

  const handleDeleteTask = (e, taskId) => {
    e.stopPropagation();
    setTasks(prev => prev.filter(t => t.id !== taskId));
  };

  const handleStartEdit = (e, task) => {
    e.stopPropagation();
    setEditingTaskId(task.id);
    setEditTaskText(task.text);
  };

  const handleSaveEdit = (e, taskId) => {
    e.stopPropagation();
    if (editTaskText.trim()) {
      setTasks(prev => prev.map(t => t.id === taskId ? { ...t, text: editTaskText.trim() } : t));
    }
    setEditingTaskId(null);
  };

  const handleEditKeyDown = (e, taskId) => {
    if (e.key === 'Enter') handleSaveEdit(e, taskId);
    if (e.key === 'Escape') setEditingTaskId(null);
  };

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '0 12px' }}>
      
      <div style={{ 
        background: 'var(--bg-surface)', border: '1px dashed var(--bg-elevated)', 
        borderRadius: '10px', padding: '8px 10px', display: 'flex', flexDirection: 'column', gap: '4px',
        marginBottom: '16px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button onClick={startRecording} style={{
            width: '30px', height: '30px', borderRadius: '50%', background: 'var(--bg-elevated)',
            border: '1px solid var(--bg-surface)', color: isRecording ? '#ef4444' : 'var(--color-violet)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0
          }}>🎤</button>
          
          <input 
            value={inputText} onChange={e => setInputText(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && submitTasks()}
            placeholder={isRecording ? "Listening..." : "Brain dump here... speak or type"}
            style={{ flex: 1, background: 'transparent', border: 'none', color: 'var(--text-primary)', outline: 'none', fontSize: '12px', minWidth: 0 }}
          />

          <button onClick={submitTasks} style={{
            width: '28px', height: '28px', borderRadius: '6px', background: 'var(--color-violet)',
            border: 'none', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            opacity: inputText.trim() ? 1 : 0.5, pointerEvents: inputText.trim() ? 'auto' : 'none'
          }}>
            ↵
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '8px' }}>
        <span>Today's Tasks</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>{tasks.length} tasks</span>
          <div onClick={onOpenCalendar} style={{ cursor: 'pointer', fontSize: '14px', background: 'var(--bg-elevated)', padding: '4px', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>📅</div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {tasks.map(task => {
          let pColor = '#2DD4BF';
          if (task.priority === 'p1') pColor = '#ef4444';
          if (task.priority === 'p2') pColor = '#f59e0b';
          if (task.priority === 'p3') pColor = '#7C3AED';

          const isEditing = editingTaskId === task.id;

          return (
            <div key={task.id} 
              onClick={() => !task.completed && !isEditing && onSelectTask(task)}
              style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                background: 'var(--bg-surface)', border: '0.5px solid var(--bg-elevated)',
                borderRadius: '8px', padding: '8px 10px', cursor: task.completed || isEditing ? 'default' : 'pointer',
                opacity: task.completed ? 0.45 : 1
              }}>
              <div 
                onClick={(e) => { e.stopPropagation(); onToggleDone(task.id); }}
                style={{
                  width: '15px', height: '15px', borderRadius: '4px', border: `1.5px solid ${task.completed ? pColor : 'var(--bg-elevated)'}`,
                  background: task.completed ? pColor : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
                  color: '#fff', fontSize: '10px'
                }}>
                {task.completed && '✓'}
              </div>
              <div style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: pColor }} />
              
              {isEditing ? (
                <input 
                  value={editTaskText}
                  onChange={e => setEditTaskText(e.target.value)}
                  onKeyDown={e => handleEditKeyDown(e, task.id)}
                  onClick={e => e.stopPropagation()}
                  autoFocus
                  style={{ flex: 1, background: 'transparent', border: 'none', borderBottom: '1px solid var(--color-violet)', color: 'var(--text-primary)', outline: 'none', fontSize: '12px', paddingBottom: '2px' }}
                />
              ) : (
                <div style={{ flex: 1, fontSize: '12px', color: 'var(--text-primary)', textDecoration: task.completed ? 'line-through' : 'none', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {task.text}
                </div>
              )}

              <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                {isEditing ? (
                  <div onClick={(e) => handleSaveEdit(e, task.id)} style={{ cursor: 'pointer', fontSize: '12px', padding: '2px' }}>✅</div>
                ) : (
                  <>
                    {!task.completed && (
                      <div onClick={(e) => handleStartEdit(e, task)} style={{ cursor: 'pointer', fontSize: '11px', padding: '2px', opacity: 0.7 }}>✏️</div>
                    )}
                    <div onClick={(e) => handleDeleteTask(e, task.id)} style={{ cursor: 'pointer', fontSize: '11px', padding: '2px', opacity: 0.7 }}>❌</div>
                  </>
                )}
              </div>
              
              {!isEditing && (
                <div 
                  onClick={(e) => !task.completed && handleCyclePriority(e, task.id, task.priority)}
                  style={{ 
                    fontSize: '8.5px', fontWeight: 'bold', padding: '3px 6px', borderRadius: '4px', 
                    color: pColor, background: `${pColor}22`, textTransform: 'uppercase',
                    cursor: task.completed ? 'default' : 'pointer', userSelect: 'none', marginLeft: '4px',
                    whiteSpace: 'nowrap'
                  }}>
                  {task.priority === 'p1' ? 'HIGH PRIORITY' : 
                   task.priority === 'p2' ? 'MEDIUM PRIORITY' : 
                   task.priority === 'p3' ? 'LOW PRIORITY' : 'NORMAL'}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  );
}
