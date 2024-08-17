import React from 'react'
import Header from './components/header'
import NotesPage from './pages/NotesPage'
import Authentication from './pages/Authentication'
import Note from './pages/Note'
import './App.css'
import { createBrowserRouter, Outlet } from 'react-router-dom';
import { Authorization, GetID } from "./pages/global.js";
function App() {
  return (
    <Authorization>
      <GetID>
        <div className="container dark">
          <div className='app' >
              <Header />
              <Outlet />
          </div>
        </div>
      </GetID>
    </Authorization>
  )
}


const appRouter = createBrowserRouter([
  {
      path: '/',
      element: <App />,
      children: [
          {
              path: 'auth',
              element: <Authentication />
          },
          {
              path: 'notes',
              element: <NotesPage/>,
              children : [
                  {
                      path: 'new',
                      element: <Note />
                  }
              ]
          }
                ],
  }
])


export default appRouter
