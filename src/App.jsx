import { useState, useEffect } from 'react';
import { useTimer } from './hooks/useTimer';
import { useStats } from './hooks/useStats';
import { speak } from './utils/speech';
import Header from './components/Header';
import StatsBar from './components/StatsBar';
import OnboardingScreen from './components/OnboardingScreen';
import PlanningScreen from './components/PlanningScreen';
import FocusScreen from './components/FocusScreen';
import CompletionScreen from './components/CompletionScreen';

function App() {
  const [currentScreen, setCurrentScreen] = useState('onboarding'); // onboarding, planning, focus, complete
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('focusBuddyTasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [activeTask, setActiveTask] = useState(null);

  const { stats, addSession } = useStats();
  
  // Timer setup
  const { 
    remainingTime, 
    totalTime, 
    isActive, 
    startTimer, 
    pauseTimer, 
    resetTimer, 
    updateTime 
  } = useTimer(25 * 60);

  const [hasFinished, setHasFinished] = useState(false);
  useEffect(() => {
    if (totalTime > 0 && remainingTime === 0 && !hasFinished) {
      setHasFinished(true); 
      const focusMinutes = totalTime / 60;
      addSession(focusMinutes);
      // Mark task as completed if timer finishes
      if (activeTask) {
        setTasks(prev => prev.map(t => t.id === activeTask.id ? { ...t, completed: true } : t));
        speak(`Awesome work. You have completed: ${activeTask.text}. Take a deep breath.`);
      } else {
        speak(`Awesome work. Session complete. Take a deep breath.`);
      }
      setCurrentScreen('complete');
    } else if (remainingTime > 0) {
      setHasFinished(false);
    }
  }, [remainingTime, totalTime, hasFinished, activeTask]);

  // Tasks persistence
  useEffect(() => {
    localStorage.setItem('focusBuddyTasks', JSON.stringify(tasks));
  }, [tasks]);

  // Helper to mark task done manually
  const toggleTaskDone = (taskId) => {
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, completed: !t.completed } : t));
  };

  return (
    <div className={`app-container s-${currentScreen}`}>
      
      {/* SCREEN 0 */}
      <div className="screen screen-onboarding">
        <Header />
        <OnboardingScreen onContinue={() => setCurrentScreen('planning')} />
      </div>

      {/* SCREEN 1 */}
      <div className="screen screen-planning">
        <Header />
        <PlanningScreen 
          tasks={tasks} 
          setTasks={setTasks} 
          onSelectTask={(task) => {
            setActiveTask(task);
            setCurrentScreen('focus');
          }}
          onToggleDone={toggleTaskDone}
        />
        <div style={{ marginTop: 'auto' }}>
          <StatsBar stats={stats} />
        </div>
      </div>

      {/* SCREEN 2 */}
      <div className="screen screen-focus">
        <Header onBack={() => setCurrentScreen('planning')} />
        <FocusScreen 
          activeTask={activeTask}
          onCompleteTask={() => {
            if (activeTask) toggleTaskDone(activeTask.id);
            setCurrentScreen('complete');
          }}
          timer={{
             remainingTime, totalTime, isActive, startTimer, pauseTimer, resetTimer, updateTime
          }}
        />
        <div style={{ marginTop: 'auto' }}>
          <StatsBar stats={stats} />
        </div>
      </div>

      {/* SCREEN 3 */}
      <div className="screen screen-complete">
        <Header onBack={() => setCurrentScreen('planning')} />
        <CompletionScreen 
          activeTask={activeTask}
          timeSpent={totalTime - remainingTime}
          onBack={() => setCurrentScreen('planning')}
        />
        <div style={{ marginTop: 'auto' }}>
          <StatsBar stats={stats} />
        </div>
      </div>

    </div>
  );
}

export default App;
