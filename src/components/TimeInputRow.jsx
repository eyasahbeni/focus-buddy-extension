import { useState, useEffect } from 'react';

const InputBox = ({ value, setter, label, name, focusedInput, setFocusedInput, handleChange, disabled }) => {
  const isFocused = focusedInput === name;
  return (
    <div 
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'var(--bg-surface)',
        padding: '8px 12px',
        borderRadius: '12px',
        border: `1px solid ${isFocused ? 'rgba(124,58,237,0.5)' : 'var(--bg-elevated)'}`,
        width: '64px',
        transition: 'all 0.2s ease',
        boxShadow: isFocused ? '0 0 0 2px rgba(124,58,237,0.2)' : 'none',
        opacity: disabled ? 0.5 : 1,
        pointerEvents: disabled ? 'none' : 'auto'
      }}
    >
      <input
        type="text"
        value={value}
        onChange={(e) => handleChange(e, setter)}
        onFocus={() => setFocusedInput(name)}
        onBlur={() => setFocusedInput(null)}
        placeholder="00"
        disabled={disabled}
        style={{
          background: 'transparent',
          border: 'none',
          outline: 'none',
          color: 'var(--text-primary)',
          fontFamily: 'var(--font-display)',
          fontSize: '20px',
          textAlign: 'center',
          width: '100%',
          transform: isFocused ? 'scale(1.05)' : 'scale(1)',
          transition: 'transform 0.2s ease'
        }}
      />
      <span style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: '2px' }}>
        {label}
      </span>
    </div>
  );
};

export default function TimeInputRow({ onTimeChange, disabled }) {
  const [hours, setHours] = useState('00');
  const [minutes, setMinutes] = useState('25');
  const [seconds, setSeconds] = useState('00');
  const [focusedInput, setFocusedInput] = useState(null);

  useEffect(() => {
    const totalSeconds = parseInt(hours || 0) * 3600 + parseInt(minutes || 0) * 60 + parseInt(seconds || 0);
    onTimeChange(totalSeconds);
  }, [hours, minutes, seconds]);

  const handleChange = (e, setter) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 2);
    setter(val);
  };

  return (
    <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginBottom: '8px' }}>
      <InputBox value={hours} setter={setHours} label="HH" name="hours" focusedInput={focusedInput} setFocusedInput={setFocusedInput} handleChange={handleChange} disabled={disabled} />
      <InputBox value={minutes} setter={setMinutes} label="MM" name="minutes" focusedInput={focusedInput} setFocusedInput={setFocusedInput} handleChange={handleChange} disabled={disabled} />
      <InputBox value={seconds} setter={setSeconds} label="SS" name="seconds" focusedInput={focusedInput} setFocusedInput={setFocusedInput} handleChange={handleChange} disabled={disabled} />
    </div>
  );
}
