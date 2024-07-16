// src/Stopwatch.js
import React, { useState, useEffect, useRef } from 'react';
import './App.css'

const Stopwatch = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [lapTimes, setLapTimes] = useState([]);
  const timerRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setElapsedTime(prevTime => prevTime + 10); // Increment time by 10ms
      }, 10);
    } else {
      clearInterval(timerRef.current);
    }

    return () => clearInterval(timerRef.current); // Cleanup interval on component unmount
  }, [isRunning]);

  const formatTime = (time) => {
    const minutes = Math.floor((time / 1000 / 60) % 60);
    const seconds = Math.floor((time / 1000) % 60);
    const milliseconds = Math.floor((time % 1000) / 10);
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(milliseconds).padStart(2, '0')}`;
  };

  const handleStartPause = () => {
    setIsRunning(prevState => !prevState);
  };

  const handleReset = () => {
    setIsRunning(false);
    setElapsedTime(0);
    setLapTimes([]);
  };

  const handleLap = () => {
    if (isRunning) {
      setLapTimes(prevLaps => [...prevLaps, formatTime(elapsedTime)]);
    }
  };

  return (
    <div className="stopwatch">
      <h1>Stopwatch</h1>
      <div className="display">
        {formatTime(elapsedTime)}
      </div>
      <div className="controls">
        <button onClick={handleStartPause}>
          {isRunning ? 'Pause' : 'Start'}
        </button>
        <button onClick={handleLap} disabled={!isRunning}>
          Lap
        </button>
        <button onClick={handleReset} disabled={isRunning}>
          Reset
        </button>
      </div>
      {lapTimes.length > 0 && (
        <div className="laps">
          <h2>Lap Times</h2>
          <ul>
            {lapTimes.map((lap, index) => (
              <li key={index}>{lap}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Stopwatch;
