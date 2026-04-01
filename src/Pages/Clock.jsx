import { useState, useEffect, useRef } from 'react'

const Clock = () => {
  const [time, setTime] = useState(new Date())
  const [seconds, setSeconds] = useState(0)
  const [timerRunning, setTimerRunning] = useState(false)
  const intervalRef = useRef(null)
  const timerRef = useRef(null)

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setTime(new Date())
    }, 1000)
    return () => clearInterval(intervalRef.current)
  }, [])

  const startTimer = () => {
    if (timerRunning) return
    setTimerRunning(true)
    timerRef.current = setInterval(() => {
      setSeconds(prev => prev + 1)
    }, 1000)
  }

  const stopTimer = () => {
    setTimerRunning(false)
    clearInterval(timerRef.current)
  }

  const resetTimer = () => {
    stopTimer()
    setSeconds(0)
  }

  const formatTime = (date) =>
    date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' })

  const formatDate = (date) =>
    date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })

  const formatSeconds = (s) => {
    const h = Math.floor(s / 3600).toString().padStart(2, '0')
    const m = Math.floor((s % 3600) / 60).toString().padStart(2, '0')
    const sec = (s % 60).toString().padStart(2, '0')
    return `${h}:${m}:${sec}`
  }

  return (
    <div className='clock-page'>
      <h1>⏰ Clock</h1>
      
      <div className='clock-display'>
        <p className='time'>{formatTime(time)}</p>
        <p className='date'>{formatDate(time)}</p>
      </div>
      
      <h2 style={{ color: 'rgba(255,255,255,0.7)', marginTop: '16px' }}>Stopwatch</h2>
      
      <div className='timer-display'>
        <p className='timer-value'>{formatSeconds(seconds)}</p>
        <div className='timer-buttons'>
          <button className='timer-btn start' onClick={startTimer}>▶ Start</button>
          <button className='timer-btn stop' onClick={stopTimer}>⏸ Stop</button>
          <button className='timer-btn reset' onClick={resetTimer}>↺ Reset</button>
        </div>
      </div>
    </div>
  )
}

export default Clock