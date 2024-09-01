import { useState, useEffect, useRef } from 'react'
import Tabs from '../tabs'

export default function PomodoroTimer() {
  const [time, setTime] = useState(5)
  const [isRunning, setIsRunning] = useState(false)
  const [mode, setMode] = useState('pomodoro')
  const audioRef = useRef(null)

  useEffect(() => {
    // Create a new Audio object when the component mounts
    audioRef.current = new Audio('./audio/alarm.mp3')

    // Optional: set initial properties, like volume
    audioRef.current.volume = 0.5

    // Cleanup: pause the audio when the component unmounts
    return () => {
      audioRef.current.pause()
    }
  }, [])

  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(() => {
        setTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0))
      }, 1000)

      if (time === 0) {
        audioRef.current.play()
        setIsRunning(false)
        switch (mode) {
          case 'pomodoro':
            setMode('shortBreak')
            setTime(5 * 60)
            break
          case 'shortBreak':
            setMode('longBreak')
            setTime(15 * 60)
            break
          case 'longBreak':
            setMode('pomodoro')
            setTime(25 * 60)
            break
          default:
            break
        }
      }

      return () => clearInterval(interval)
    }
  }, [isRunning, time, mode])

  const toggleTimer = () => setIsRunning(!isRunning)

  const resetTimer = (m = mode) => {
    setIsRunning(false)
    switch (m) {
      case 'pomodoro':
        setTime(25 * 60)
        break
      case 'shortBreak':
        setTime(5 * 60)
        break
      case 'longBreak':
        setTime(15 * 60)
        break
      default:
        break
    }
  }

  const changeMode = (newMode) => {
    setMode(newMode)
    resetTimer(newMode)
  }

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60)
    const seconds = timeInSeconds % 60
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(
      2,
      '0',
    )}`
  }

  return (
    <div className="flex flex-col items-center p-4">
      <Tabs currentMode={mode} onChangeMode={changeMode} />
      <div className="w-full text-center py-12 bg-gray-100 text-6xl font-mono mb-4">
        {formatTime(time)}
      </div>
      <div className="flex space-x-4 w-full">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded flex-1 w-full"
          onClick={toggleTimer}
        >
          {isRunning ? 'Pause' : 'Start'}
        </button>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded flex-1 w-full"
          onClick={() => resetTimer()}
        >
          Reset
        </button>
      </div>
    </div>
  )
}
