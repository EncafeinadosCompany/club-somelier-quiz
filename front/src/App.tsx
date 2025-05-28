import { useThemeStore } from './common/storage/themeStore'
import { Button } from './common/ui/button'
import { Outlet } from 'react-router-dom'


function App() {
  const { darkMode, toggleDarkMode } = useThemeStore()
  return (

    <div className={`${darkMode ? 'dark' : ''} `}>
      <div className="h-screen flex flex-col items-center  dark:bg-gray-800  px-6 py-4  ring shadow-xl ring-gray-900/5 overflow-hidden ">
        <div className='relative h-full w-full bg-amber-100  rounded-sm overflow-y-auto'>
       <div className='absolute right-0 z-50'>
       <Button
          onClick={toggleDarkMode}
          className="p-2 border rounded self-end  bg-gray-200 text-gray-600  dark:bg-gray-800"
        >
          {darkMode ? "🌙 Modo Oscuro" : "☀️ Modo Claro"}
        </Button>
       </div>
        <Outlet />
        </div>
      
      </div>
    </div>

  )
}

export default App
