import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { setPersistence, browserLocalPersistence } from 'firebase/auth'
import { auth } from './firebase'

import Root from './routes/Root'
import Send from './routes/Send'
import Home from './routes/Home'
import AnswerQuestion from './routes/AnswerQuestion'
import NotFound from './routes/NotFound'

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
    path: "q/:username/:questionId",
    element: <AnswerQuestion />
  },
  {
    path: "notfound",
    element: <NotFound />
  },
]);

setPersistence(auth, browserLocalPersistence);

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
