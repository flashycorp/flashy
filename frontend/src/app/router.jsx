import { createBrowserRouter } from 'react-router-dom'
import Layout from '../components/layout/Layout'
import ProtectedRoute from '../components/layout/ProtectedRoute'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Catalog from '../pages/Catalog'
import Decks from '../pages/Decks'
import Deck from '../pages/Deck'
import Study from '../pages/Study'
import Stats from '../pages/Stats'
import Profile from '../pages/Profile'
import Admin from '../pages/Admin'
import NotFound from '../pages/NotFound'

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      // Guest
      { path: '/', element: <Home /> },
      { path: '/login', element: <Login /> },
      { path: '/register', element: <Register /> },
      { path: '/catalog', element: <Catalog /> },
      // User
      {
        element: <ProtectedRoute />,
        children: [
          { path: '/decks', element: <Decks /> },
          { path: '/decks/:deckId', element: <Deck /> },
          { path: '/study/:deckId', element: <Study /> },
          { path: '/stats', element: <Stats /> },
          { path: '/profile', element: <Profile /> },
        ],
      },
      // Admin
      {
        element: <ProtectedRoute role="admin" />,
        children: [{ path: '/admin/*', element: <Admin /> }],
      },
      { path: '*', element: <NotFound /> },
    ],
  },
])
