import { useState, useEffect, useContext } from 'react'
import { WeatherContext } from '../context/WeatherContext'

const weatherIcons = {
  'clear sky': '☀️',
  'few clouds': '🌤️',
  'scattered clouds': '⛅',
  'broken clouds': '☁️',
  'overcast clouds': '☁️',
  'shower rain': '🌧️',
  'rain': '🌧️',
  'light rain': '🌦️',
  'moderate rain': '🌧️',
  'thunderstorm': '⛈️',
  'snow': '❄️',
  'mist': '🌫️',
}

const Forecast = () => {
  const { tempUnit } = useContext(WeatherContext)
  const [forecastData, setForecastData] = useState(null)

  useEffect(() => {
    const fetchForecast = async () => {
      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=London&appid=${import.meta.env.VITE_WEATHER_KEY}&units=metric`
        )
        const data = await res.json()
        
        // If API returns error, use mock data
        if (data.cod === 401 || data.cod === '401') {
          console.warn('API key not yet active, using mock forecast')
          const mockForecast = {
            list: [
              { dt: 1, dt_txt: '2026-04-02 12:00:00', main: { temp: 19 }, weather: [{ description: 'clear sky' }] },
              { dt: 2, dt_txt: '2026-04-03 12:00:00', main: { temp: 17 }, weather: [{ description: 'few clouds' }] },
              { dt: 3, dt_txt: '2026-04-04 12:00:00', main: { temp: 15 }, weather: [{ description: 'light rain' }] },
              { dt: 4, dt_txt: '2026-04-05 12:00:00', main: { temp: 16 }, weather: [{ description: 'scattered clouds' }] },
              { dt: 5, dt_txt: '2026-04-06 12:00:00', main: { temp: 20 }, weather: [{ description: 'clear sky' }] },
            ]
          }
          setForecastData(mockForecast)
        } else {
          setForecastData(data)
        }
      } catch (err) {
        console.error('Forecast fetch error:', err)
      }
    }
    fetchForecast()
  }, [])

  const getTemp = (temp) => {
    if (tempUnit === 'F') return ((temp * 9/5) + 32).toFixed(0)
    return temp.toFixed(0)
  }

  const getWeatherIcon = (description) => {
    return weatherIcons[description?.toLowerCase()] || '🌡️'
  }

  const formatDay = (dateStr) => {
    const date = new Date(dateStr)
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)
    
    if (date.toDateString() === today.toDateString()) return 'Today'
    if (date.toDateString() === tomorrow.toDateString()) return 'Tomorrow'
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
  }

  const dailyForecasts = forecastData?.list?.filter(item =>
    item.dt_txt.includes('12:00:00')
  )

  if (!dailyForecasts || !forecastData?.list) {
    return (
      <div className='forecast-page'>
        <h1>5-Day Forecast</h1>
        <div className='loading'>
          <div className='loading-spinner'></div>
          <p className='loading-text'>Loading forecast...</p>
        </div>
      </div>
    )
  }

  return (
    <div className='forecast-page'>
      <h1>5-Day Forecast</h1>
      <div className='forecast-list'>
        {dailyForecasts.map(day => (
          <div key={day.dt} className='forecast-item'>
            <div>
              <p className='day'>{formatDay(day.dt_txt)}</p>
              <p className='condition'>{day.weather[0].description}</p>
            </div>
            <span className='icon'>{getWeatherIcon(day.weather[0].description)}</span>
            <p className='temp'>{getTemp(day.main.temp)}°{tempUnit}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Forecast