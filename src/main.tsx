import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Root from './routes/Root'
import Send from './routes/Send'
import Home from './routes/Home'
import NotFound from './routes/NotFound'
import './index.css'

const router = createBrowserRouter([
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

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
