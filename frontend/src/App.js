import React from 'react'
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import Header from './components/header'
import NotesPage from './pages/NotesPage'
import Note from './pages/Note'
import './App.css'
function App() {
  return (
    <div className="container dark">
      <div className='app' >
        <Header />
        <Routes>
          <Route path="/" exact element = {<NotesPage />} />
        </Routes>
        <Routes>
          <Route path="/note/:id" element= {<Note />} />
        </Routes> 
      </div>
    </div>
  )
}

export default App
