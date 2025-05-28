import { ThemeProvider } from './common/storage/themeStore'
import { Outlet } from 'react-router-dom'

function App() {
  return (
    <ThemeProvider defaultTheme="dark">
      <div translate='no' className="h-screen flex flex-col items-center xl:px-6 xl:py-4  ring shadow-xl ring-gray-900/5 overflow-hidden ">
        <div className='relative h-full w-full  rounded-sm overflow-y-auto'>
          <div className='w-full overflow-y-auto  overflow-x-hidden h-full'>
            <Outlet />
          </div>
        </div>
      </div>
    </ThemeProvider>
  )
}

export default App
