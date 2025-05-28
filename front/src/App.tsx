import { useThemeStore } from './common/storage/themeStore'
import { Button } from './common/ui/button'
import { Outlet } from 'react-router-dom'


function App() {
  const { darkMode, toggleDarkMode } = useThemeStore()
  return (

    <div className={`${darkMode ? 'dark' : ''}`}>
      <div className="bg-white  h-screen space-y-3  w-screen flex flex-col items-center dark:bg-gray-800 rounded-lg px-6 py-8 ring shadow-xl ring-gray-900/5">
        <Button
          onClick={toggleDarkMode}
          className="p-2 border rounded self-end bg-gray-200 text-gray-600  dark:bg-gray-800"
        >
          {darkMode ? "🌙 Modo Oscuro" : "☀️ Modo Claro"}
        </Button>
        <div className='w-full h-full'>
        <Outlet />
        </div>
      
      </div>
    </div>

  )
}

export default App
