import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Root from './routes/Root'
import LogIn from './routes/LogIn'
import SignUp from './routes/SignUp'
import Home from './routes/Home'
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
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
