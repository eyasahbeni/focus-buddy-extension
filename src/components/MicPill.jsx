import { useState } from 'react';

export default function MicPill({ onTasksParsed }) {
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
    recognition.maxAlternatives = 1;

    recognition.onstart = () => setIsRecording(true);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript.toLowerCase();
      console.log("Brain Dump:", transcript);
      
      // Split the brain dump into separate tasks using "and" or "then"
      const rawTasks = transcript.split(/\b(?:and|then)\b/);
      
      const newTasks = rawTasks.map(rawText => {
        let text = rawText.trim();
        if (!text) return null;
        
        let priority = 'normal';
        if (text.includes('high priority') || text.includes('priority one')) {
          priority = 'high';
          text = text.replace(/high priority|priority one/g, '').trim();
        } else if (text.includes('low priority')) {
          priority = 'low';
          text = text.replace(/low priority/g, '').trim();
        }
        
        // Capitalize first letter
        text = text.charAt(0).toUpperCase() + text.slice(1);
        
        return {
          id: Date.now() + Math.random(),
          text,
          priority
        };
      }).filter(Boolean);

      if (newTasks.length > 0) {
        onTasksParsed(newTasks);
      }
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error", event.error);
      setIsRecording(false);
    };

    recognition.onend = () => setIsRecording(false);

    recognition.start();
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
      <button
        onClick={startRecording}
        className={isRecording ? 'recording-pulse' : ''}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '8px 16px',
          borderRadius: '20px',
          backgroundColor: 'var(--bg-surface)',
          border: `1px solid ${isRecording ? 'var(--color-teal)' : 'var(--bg-elevated)'}`,
          color: 'var(--text-secondary)',
          fontSize: '12px',
          transition: 'all 0.3s ease'
        }}
      >
        <span style={{ color: isRecording ? 'var(--color-teal)' : 'inherit' }}>
          🎤
        </span>
        {isRecording ? 'Listening...' : 'Brain dump tasks...'}
      </button>
    </div>
  );
}
