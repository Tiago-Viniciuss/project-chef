import './App.css'
import { Outlet } from 'react-router-dom'
import '/i18nify'

function App() {

  return (
    
      <div className='App'>
        <Outlet/>
      </div>
    
  )
}

export default App
