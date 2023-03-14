import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Root from './routes/Root'
import LogIn from './routes/LogIn'
import SignUp from './routes/SignUp'
import Ask from './routes/Ask'
import Home from './routes/Home'
import NotFound from './routes/NotFound'
import './index.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
  },
  {
    path: "login",
    element: <LogIn />
  },
  {
    path: "signup",
    element: <SignUp />
  },
  {
    path: "home",
    element: <Home />
  },
  {
    path: "ask/:username",
    element: <Ask />
  },
  {
    path: "notfound",
    element: <NotFound />
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
