import React from 'react'
import Header from './components/header'
import NotesPage from './pages/NotesPage'
import Authentication from './pages/Authentication'
import Note from './pages/Note'
import NewNote from './pages/NewNote.js'
import './App.css'
import { createBrowserRouter, Outlet } from 'react-router-dom';
import { Authorization, GetID, GetUserData } from "./pages/global.js";

function App() {
  return (
    <Authorization>
      <GetUserData>
        <GetID>
          <div className="container dark">
            <div className='app' >
              <Header />
              <Outlet />
            </div>
          </div>
        </GetID>
      </GetUserData>
    </Authorization>
  )
}


const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Authentication />
      },
      {
        path: 'notes',
        element: <NotesPage />
      },
      {
        path: '/notes/:id',
        element: <Note />
      },
      // {
      //   path: '/notes/create',
      //   element: <NewNote />
      // },

    ],
  }
])


export default appRouter
