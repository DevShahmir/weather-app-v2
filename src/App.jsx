import { useEffect, useState } from 'react'
import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Forecast from './Pages/Forecast'
import Settings from './Pages/Settings'
import Clock from './Pages/Clock'
import { WeatherContext } from './context/WeatherContext'
import Tabbar from './Components/Tabbar'

// Mock data while API key activates (can take up to 2 hours)
const MOCK_WEATHER = {
  name: 'London',
  sys: { country: 'GB' },
  main: { temp: 18, feels_like: 16, humidity: 65 },
  weather: [{ description: 'few clouds', main: 'Clouds' }],
  wind: { speed: 4.5 },
  visibility: 10000
}

function App() {
  const [weatherData, setWeatherData] = useState(null)
  const [tempUnit, setTempUnit] = useState('C')
  const [theme, setTheme] = useState('dark')

  // Apply theme to document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    document.body.classList.remove('light-theme', 'dark-theme')
    document.body.classList.add(`${theme}-theme`)
  }, [theme])

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=London&appid=${import.meta.env.VITE_WEATHER_KEY}&units=metric`
        )
        const data = await response.json()
        
        // If API returns error, use mock data
        if (data.cod === 401 || data.cod === '401') {
          console.warn('API key not yet active, using mock data')
          setWeatherData(MOCK_WEATHER)
        } else {
          setWeatherData(data)
        }
      } catch (error) {
        console.error('Error fetching weather data:', error)
        setWeatherData(MOCK_WEATHER)
      }
    }

    fetchWeatherData()
  }, [])

  return (
    <div className="main">
      <WeatherContext.Provider value={{ weatherData, setWeatherData, tempUnit, setTempUnit, theme, setTheme }}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/forecast' element={<Forecast />} />
          <Route path='/settings' element={<Settings />} />
          <Route path='/clock' element={<Clock />} />
          <Route path='*' element={<Navigate to='/' />} />
        </Routes>
        <Tabbar />
      </WeatherContext.Provider>
    </div>
  )
}

export default App