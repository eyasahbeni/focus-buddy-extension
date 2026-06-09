import { useState, useEffect } from 'react';
import { useTimer } from './hooks/useTimer';
import { useStats } from './hooks/useStats';
import Header from './components/Header';
import TimerRing from './components/TimerRing';
import TimeInputRow from './components/TimeInputRow';
import ControlsRow from './components/ControlsRow';
import MicPill from './components/MicPill';
import StatsBar from './components/StatsBar';
import TaskSpace from './components/TaskSpace';

function App() {
  const { 
    remainingTime, 
    totalTime, 
    isActive, 
    startTimer, 
    pauseTimer, 
    resetTimer, 
    updateTime 
  } = useTimer(25 * 60);

  const { stats, addSession } = useStats();

  // Load tasks from local storage or start empty
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('focusBuddyTasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [activeTask, setActiveTask] = useState(null);

  // Save tasks on change
  useEffect(() => {
    localStorage.setItem('focusBuddyTasks', JSON.stringify(tasks));
  }, [tasks]);

  // Track completed sessions
  const [hasFinished, setHasFinished] = useState(false);
  useEffect(() => {
    if (totalTime > 0 && remainingTime === 0 && !hasFinished) {
      setHasFinished(true); // Prevent multiple triggers
      const focusMinutes = totalTime / 60;
      addSession(focusMinutes);
    } else if (remainingTime > 0) {
      setHasFinished(false);
    }
  }, [remainingTime, totalTime, hasFinished]);

  const handleTimeChange = (seconds) => {
    if (!isActive) updateTime(seconds);
  };

  const handleStartPause = () => {
    if (isActive) pauseTimer();
    else startTimer(totalTime);
  };

  const handleTasksParsed = (newTasks) => {
    setTasks(prev => [...prev, ...newTasks]);
  };

  const handleDeleteTask = (taskId) => {
    setTasks(prev => prev.filter(t => t.id !== taskId));
    if (activeTask && activeTask.id === taskId) {
      setActiveTask(null);
    }
  };

  return (
    <>
      <Header />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <TimerRing remainingTime={remainingTime} totalTime={totalTime} isActive={isActive} activeTask={activeTask} />
        
        <TimeInputRow onTimeChange={handleTimeChange} disabled={isActive} />
        <ControlsRow isActive={isActive} onStartPause={handleStartPause} onReset={resetTimer} />
        <MicPill onTasksParsed={handleTasksParsed} />
        
        <TaskSpace 
          tasks={tasks} 
          activeTask={activeTask} 
          onSetActiveTask={setActiveTask} 
          onDeleteTask={handleDeleteTask} 
        />
      </div>
      <div style={{ marginTop: 'auto', paddingTop: '20px' }}>
        <StatsBar stats={stats} />
      </div>
    </>
  );
}

export default App;
