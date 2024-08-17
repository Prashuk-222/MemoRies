import React, {useState, useEffect} from 'react'
import ListItems from '../components/ListItems'
import { Link, useNavigate } from 'react-router-dom'
import {ReactComponent as AddIcon} from '../svg_files/create.svg'
import { useID } from './global.js'
const NotesPage = () => {

  const [notes, setNotes] = useState([])
  // const [id, setId] = useID()
  useEffect(() => {
    getNotes()
  }, [])

  let getNotes = async() => {
    try {
      let response = await fetch('http://127.0.0.1:8000/api/notes/', {
        method: 'GET',
      });
      if (!response.ok) {
        throw new Error('Failed to fetch notes');
      }
      let data = await response.json();
      setNotes(data);
      // Assuming `data` directly contains the array of notes
    } catch (error) {
      console.error('Error fetching notes:', error.message);
      // Handle error state or retry logic here
    }
  }
  let navigate = useNavigate();

  const handleClick = () => {
    navigate('/notes/new')
  };

  return (
    <div className='notes'>
      <div className='notes-header'>
        <h2 className='notes-title'>
          &#9782; Notes
        </h2>
        <p className='notes-count'>{notes?.length}</p>
      </div>
      <div className='notes-list'>
        {notes?.map((notes, index) => (
          <ListItems key={index} note={notes} id={notes?.id}/>
        ))}
      </div>
      <div>
        <h3>
          <Link onClick={handleClick} className='floating-button'>
            <AddIcon />
          </Link>
        </h3>
      </div>
    </div>
  )
}

export default NotesPage
