import { useState } from 'react'
import Dashboard from './Pages/dashboard'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Dashboard/>
    </>
  )
}

export default App
