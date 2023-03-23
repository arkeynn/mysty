import React, { useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, createHashRouter, RouterProvider } from 'react-router-dom'

import { setPersistence, browserLocalPersistence } from 'firebase/auth'
import { auth } from './firebase'

import Root from './routes/Root'
import Send from './routes/Send'
import Home from './routes/Home'
import NotFound from './routes/NotFound'
import './index.css'

const router = createHashRouter([
  {
    path: "/",
    element: <Root />,
  },
  {
    path: "home",
    element: <Home />
  },
  {
    path: "ask/:username",
    element: <Send />
  },
  {
    path: "notfound",
    element: <NotFound />
  },
]);

setPersistence(auth, browserLocalPersistence);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
