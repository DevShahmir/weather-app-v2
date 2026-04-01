import { useContext } from 'react'
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
  'fog': '🌫️',
  'haze': '🌫️',
}

const Home = () => {
  const { weatherData, tempUnit } = useContext(WeatherContext)

  const getTemp = (temp) => {
    if (tempUnit === 'F') return ((temp * 9/5) + 32).toFixed(0)
    return temp.toFixed(0)
  }

  const getWeatherIcon = (description) => {
    return weatherIcons[description?.toLowerCase()] || '🌡️'
  }

  if (!weatherData || !weatherData.weather) {
    return (
      <div className='weather-Home'>
        <div className='loading'>
          <div className='loading-spinner'></div>
          <p className='loading-text'>Fetching weather data...</p>
          {weatherData?.message && (
            <p style={{ color: '#f56565', marginTop: '10px' }}>
              ⚠️ {weatherData.message}
            </p>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className='weather-Home'>
      <p className='location'>📍 {weatherData.name}, {weatherData.sys?.country}</p>
      
      <div className='weather-icon'>
        {getWeatherIcon(weatherData.weather[0].description)}
      </div>
      
      <div className='temperature'>
        {getTemp(weatherData.main.temp)}
        <span>°{tempUnit}</span>
      </div>
      
      <p className='condition'>{weatherData.weather[0].description}</p>
      
      <div className='stats-grid'>
        <div className='stat-card'>
          <span className='stat-icon'>💧</span>
          <span className='stat-label'>Humidity</span>
          <span className='stat-value'>{weatherData.main.humidity}%</span>
        </div>
        <div className='stat-card'>
          <span className='stat-icon'>💨</span>
          <span className='stat-label'>Wind</span>
          <span className='stat-value'>{weatherData.wind?.speed} m/s</span>
        </div>
        <div className='stat-card'>
          <span className='stat-icon'>🌡️</span>
          <span className='stat-label'>Feels Like</span>
          <span className='stat-value'>{getTemp(weatherData.main.feels_like)}°{tempUnit}</span>
        </div>
        <div className='stat-card'>
          <span className='stat-icon'>👁️</span>
          <span className='stat-label'>Visibility</span>
          <span className='stat-value'>{(weatherData.visibility / 1000).toFixed(1)} km</span>
        </div>
      </div>
    </div>
  )
}

export default Home