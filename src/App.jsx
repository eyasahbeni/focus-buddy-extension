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
import CalendarScreen from './components/CalendarScreen';
import { syncTaskToCalendar } from './utils/googleCalendar';

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
        const completedDate = new Date().toISOString();
        setTasks(prev => prev.map(t => t.id === activeTask.id ? { ...t, completed: true, completedAt: completedDate } : t));
        speak(`Awesome work. You have completed: ${activeTask.text}. Take a deep breath.`);
        
        // Sync to Google Calendar
        syncTaskToCalendar(activeTask.text, focusMinutes)
          .then(() => console.log('Successfully synced to Google Calendar'))
          .catch((err) => console.log('Skipped Google Calendar sync (Not authenticated or missing ID).', err));
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
    setTasks(prev => prev.map(t => {
      if (t.id === taskId) {
        const isNowCompleted = !t.completed;
        return { ...t, completed: isNowCompleted, completedAt: isNowCompleted ? new Date().toISOString() : null };
      }
      return t;
    }));
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
          onOpenCalendar={() => setCurrentScreen('calendar')}
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
          stats={stats}
        />
        <div style={{ marginTop: 'auto' }}>
          <StatsBar stats={stats} />
        </div>
      </div>

      {/* SCREEN 4 */}
      <div className="screen screen-calendar" style={{ display: currentScreen === 'calendar' ? 'flex' : 'none', flexDirection: 'column', height: '100%' }}>
        <Header onBack={() => setCurrentScreen('planning')} />
        <CalendarScreen tasks={tasks} stats={stats} />
        <div style={{ marginTop: 'auto' }}>
          <StatsBar stats={stats} />
        </div>
      </div>

    </div>
  );
}

export default App;
