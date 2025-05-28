import { useThemeStore } from './common/storage/themeStore'
import { Button } from './common/ui/button'
import { Outlet } from 'react-router-dom'


function App() {
  const { darkMode, toggleDarkMode } = useThemeStore()
  return (

    <div className={`${darkMode ? 'dark' : ''}`}>
      <div className="bg-white  h-screen  w-screen dark:bg-gray-800 rounded-lg px-6 py-8 ring shadow-xl ring-gray-900/5">
        <Button
          onClick={toggleDarkMode}
          className="p-2 border rounded bg-gray-200 text-gray-600  dark:bg-gray-800"
        >
          {darkMode ? "🌙 Modo Oscuro" : "☀️ Modo Claro"}
        </Button>
        <div>
          <span className="inline-flex items-center justify-center rounded-md bg-indigo-500 p-2 shadow-lg">
            <svg className="h-6 w-6 stroke-white" >
              holaaaaa
            </svg>
          </span>
        </div>
        <h3 className="text-gray-900 dark:text-white mt-5 text-base font-medium tracking-tight ">Writes upside-down</h3>
        <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm ">
          The Zero Gravity Pen can be used to write in any orientation, including upside-down. It even works in outer space.
        </p>
        <Outlet />


      </div>
    </div>

  )
}

export default App
