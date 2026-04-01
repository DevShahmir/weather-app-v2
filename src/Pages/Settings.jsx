import { useContext } from 'react'
import { WeatherContext } from '../context/WeatherContext'

const Settings = () => {
  const { tempUnit, setTempUnit, theme, setTheme } = useContext(WeatherContext)

  return (
    <div className='settings-page'>
      <h1>⚙️ Settings</h1>
      
      <div className='settings-list'>
        <div className='setting-item'>
          <div className='setting-info'>
            <span className='setting-label'>🌡️ Temperature Unit</span>
            <span className='setting-value'>
              {tempUnit === 'C' ? 'Celsius (°C)' : 'Fahrenheit (°F)'}
            </span>
          </div>
          <button 
            className='toggle-btn'
            onClick={() => setTempUnit(tempUnit === 'C' ? 'F' : 'C')}
          >
            Switch to °{tempUnit === 'C' ? 'F' : 'C'}
          </button>
        </div>
        
        <div className='setting-item'>
          <div className='setting-info'>
            <span className='setting-label'>🎨 Theme</span>
            <span className='setting-value'>
              {theme === 'light' ? 'Light Mode' : 'Dark Mode'}
            </span>
          </div>
          <button 
            className='toggle-btn'
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          >
            {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
          </button>
        </div>

        <div className='setting-item'>
          <div className='setting-info'>
            <span className='setting-label'>📍 Location</span>
            <span className='setting-value'>London, UK (Default)</span>
          </div>
          <button className='toggle-btn' style={{ opacity: 0.5, cursor: 'not-allowed' }}>
            Coming Soon
          </button>
        </div>

        <div className='setting-item'>
          <div className='setting-info'>
            <span className='setting-label'>ℹ️ App Version</span>
            <span className='setting-value'>Weather App v1.0.0</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings