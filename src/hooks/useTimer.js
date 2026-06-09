import { useState, useEffect, useRef } from 'react';

export function useTimer(initialSeconds = 0) {
  const [remainingTime, setRemainingTime] = useState(initialSeconds);
  const [isActive, setIsActive] = useState(false);
  const [totalTime, setTotalTime] = useState(initialSeconds);
  const intervalRef = useRef(null);

  const startTimer = (seconds) => {
    if (seconds > 0) {
      setTotalTime(seconds);
      setRemainingTime(seconds);
      setIsActive(true);
    } else if (remainingTime > 0) {
      setIsActive(true);
    }
  };

  const pauseTimer = () => {
    setIsActive(false);
  };

  const resetTimer = () => {
    setIsActive(false);
    setRemainingTime(totalTime);
  };

  const updateTime = (seconds) => {
    setIsActive(false);
    setTotalTime(seconds);
    setRemainingTime(seconds);
  };

  useEffect(() => {
    if (isActive && remainingTime > 0) {
      intervalRef.current = setInterval(() => {
        setRemainingTime((prev) => prev - 1);
      }, 1000);
    } else if (remainingTime === 0) {
      setIsActive(false);
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isActive, remainingTime]);

  return { remainingTime, totalTime, isActive, startTimer, pauseTimer, resetTimer, updateTime };
}
