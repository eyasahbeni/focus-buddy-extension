import { useState } from 'react';

export default function PlanningScreen({ tasks, setTasks, onSelectTask, onToggleDone }) {
  const [inputText, setInputText] = useState('');
  const [isRecording, setIsRecording] = useState(false);

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

  const handleAddTask = (e) => {
    if (e.key === 'Enter' && inputText.trim()) {
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
            display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'
          }}>🎤</button>
          <input 
            value={inputText} onChange={e => setInputText(e.target.value)} onKeyDown={handleAddTask}
            placeholder={isRecording ? "Listening..." : "Brain dump here... speak or type"}
            style={{ flex: 1, background: 'transparent', border: 'none', color: 'var(--text-primary)', outline: 'none', fontSize: '12px' }}
          />
        </div>
        <div style={{ fontSize: '10px', color: 'var(--text-muted)', paddingLeft: '38px' }}>
          Try: "Write email high priority, clean desk low priority" (Press Enter)
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '8px' }}>
        <span>Today's Tasks</span>
        <span>{tasks.length} tasks</span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {tasks.map(task => {
          let pColor = '#2DD4BF';
          if (task.priority === 'p1') pColor = '#ef4444';
          if (task.priority === 'p2') pColor = '#f59e0b';
          if (task.priority === 'p3') pColor = '#7C3AED';

          return (
            <div key={task.id} 
              onClick={() => !task.completed && onSelectTask(task)}
              style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                background: 'var(--bg-surface)', border: '0.5px solid var(--bg-elevated)',
                borderRadius: '8px', padding: '8px 10px', cursor: task.completed ? 'default' : 'pointer',
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
              <div style={{ flex: 1, fontSize: '12px', color: 'var(--text-primary)', textDecoration: task.completed ? 'line-through' : 'none' }}>
                {task.text}
              </div>
              <div style={{ fontSize: '9px', fontWeight: 'bold', padding: '2px 5px', borderRadius: '4px', color: pColor, background: `${pColor}22`, textTransform: 'uppercase' }}>
                {task.priority}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
}
