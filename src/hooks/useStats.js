import { useState, useEffect } from 'react';

export function useStats() {
  const [stats, setStats] = useState({
    sessions: 0,
    focusMinutes: 0,
    streak: 0,
    lastActiveDate: null
  });

  useEffect(() => {
    const saved = localStorage.getItem('focusBuddyStats');
    const today = new Date().toDateString();
    
    if (saved) {
      const parsed = JSON.parse(saved);
      // Basic streak logic
      if (parsed.lastActiveDate) {
        const lastDate = new Date(parsed.lastActiveDate);
        const currentDate = new Date(today);
        const diffTime = Math.abs(currentDate - lastDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays === 1) {
          // Increment streak
          parsed.streak += 1;
        } else if (diffDays > 1) {
          // Reset streak
          parsed.streak = 1;
        }
      } else {
        parsed.streak = 1;
      }
      parsed.lastActiveDate = today;
      setStats(parsed);
      localStorage.setItem('focusBuddyStats', JSON.stringify(parsed));
    } else {
      const initial = { sessions: 0, focusMinutes: 0, streak: 1, lastActiveDate: today };
      setStats(initial);
      localStorage.setItem('focusBuddyStats', JSON.stringify(initial));
    }
  }, []);

  const addSession = (minutes) => {
    setStats(prev => {
      const newStats = {
        ...prev,
        sessions: prev.sessions + 1,
        focusMinutes: prev.focusMinutes + Math.round(minutes)
      };
      localStorage.setItem('focusBuddyStats', JSON.stringify(newStats));
      return newStats;
    });
  };

  return { stats, addSession };
}
