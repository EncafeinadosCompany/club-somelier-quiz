import { ThemeProvider } from './common/storage/themeStore'
import { Outlet } from 'react-router-dom'

function App() {
  return (
    <ThemeProvider defaultTheme="dark">
      <div className='w-full overflow-y-auto overflow-x-hidden h-full'>
        <Outlet />
      </div>
    </ThemeProvider>
  )
}

export default App

