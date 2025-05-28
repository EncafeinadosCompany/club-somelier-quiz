import { ThemeProvider } from './common/storage/themeStore'
import { Outlet } from 'react-router-dom'

function App() {
  return (
    <ThemeProvider defaultTheme="dark">
      <Outlet />
    </ThemeProvider>
  )
}

export default App

