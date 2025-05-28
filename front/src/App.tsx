import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'


function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='h-screen w-screen flex flex-col justify-center items-center bg-indigo-400 '>
      <div className="flex space-x-2">
        <a href="@/" target="_blank">
          <img src={viteLogo} className="logo" width={50} alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" width={50} alt="React logo" />
        </a>
      </div>
      <h1>Hackathon 2025</h1>
      <div className="card text-white text-3xl">
        <p>
          React + Vite
        </p>
      </div>
    </div>
  )
}

export default App
