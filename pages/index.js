
'use client'
import { useState, useEffect } from 'react';

export default function Home() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState([]);
  const [intervalId, setIntervalId] = useState(null);

  // Start or stop the stopwatch
  const toggleRunning = () => {
    if (isRunning) {
      clearInterval(intervalId);
      setIntervalId(null);
    } else {
      const id = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
      setIntervalId(id);
    }
    setIsRunning(!isRunning);
  };

  // Reset the stopwatch
  const resetStopwatch = () => {
    clearInterval(intervalId);
    setTime(0);
    setLaps([]);
    setIntervalId(null);
    setIsRunning(false);
  };

  // Add lap time
  const addLap = () => {
    setLaps([...laps, time]);
  };

  // Format the time in mm:ss format
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  useEffect(() => {
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [intervalId]);

  return (
    <div className="container">
      <div className="stopwatchContainer">
        <h1 className="title">Stopwatch</h1>
        <div className="timeDisplay">
          <p>{formatTime(time)}</p>
        </div>
        <div className="controls">
          <button className="button" onClick={toggleRunning}>
            {isRunning ? 'Stop' : 'Start'}
          </button>
          <button className="button" onClick={resetStopwatch}>Reset</button>
          <button className="button" onClick={addLap} disabled={isRunning}>Lap</button>
        </div>
        {laps.length > 0 && (
          <div className="lapContainer">
            <h3>Laps</h3>
            <ul>
              {laps.map((lap, index) => (
                <li key={index}>Lap {index + 1}: {formatTime(lap)}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <footer className="footer">
        <p>&copy; 2024 Stopwatch by Yemna Mehmood</p>
      </footer>
    </div>
  );
}
