import { createRootRoute, Outlet } from '@tanstack/react-router'
import Header from '../components/Header'
import { NotesProvider } from '../Contexts/NotesContext'

const RootLayout = () => (
  <>
  <Header/>
  <NotesProvider>
    <Outlet />
  </NotesProvider>
  </>
)

export const Route = createRootRoute({ component: RootLayout })