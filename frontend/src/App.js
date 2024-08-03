import React from 'react'
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import Header from './components/header'
import NotesPage from './pages/NotesPage'
import Note from './pages/Note'

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" exact element = {<NotesPage />} />
      </Routes>
      <Routes>
        <Route path="/:id" element= {<Note />} />
      </Routes> 
    </div>
  )
}

export default App
