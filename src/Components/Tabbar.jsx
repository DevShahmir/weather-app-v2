import { Link, useLocation } from 'react-router-dom'

const Tabbar = () => {
  const location = useLocation()

  const tabs = [
    { path: '/', label: 'Home', icon: '🏠' },
    { path: '/forecast', label: 'Forecast', icon: '📅' },
    { path: '/clock', label: 'Clock', icon: '⏰' },
    { path: '/settings', label: 'Settings', icon: '⚙️' },
  ]

  return (
    <nav className='tabbar'>
      {tabs.map(tab => (
        <Link 
          key={tab.path}
          to={tab.path} 
          className={location.pathname === tab.path ? 'tab active' : 'tab'}
        >
          <span style={{ fontSize: '1.3rem' }}>{tab.icon}</span>
          <span>{tab.label}</span>
        </Link>
      ))}
    </nav>
  )
}

export default Tabbar