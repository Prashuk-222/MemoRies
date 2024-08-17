import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Navigate} from 'react-router-dom';
import { Link } from 'react-router-dom';
import {ReactComponent as Arrow} from '../svg_files/arrow.svg'
import {ReactComponent as Done_Arrow} from '../svg_files/done.svg'
import { useID } from './global.js'


const Note = () => {
  const {id} = useParams()
  const [note, setNote] = useState(null);
  // const [id, setId] = useID()
  let navigate = useNavigate();
  useEffect(() => {
    getNote();
  }, [id]);

  let getNote = async () => {
    try{
      if(id === 'new') {
        return
      }
      else{
        let response = await fetch(`/api/notes/${id}/`);
        if (!response.ok) {
          throw new Error('Failed to fetch notes');
        }
        let data = await response.json();
        setNote(data);
      }
    } catch (error) {
      console.error('Error fetching notes:', error.message);
      // Handle error state or retry logic here
    }
  };

  let createNote = async () => {
    try{
      let response = await fetch(`/api/notes/create/`,{
      method: "POST",
      headers: {
        'Content-Type' : 'application/json'
      },
      body : JSON.stringify(note)
    })
    if (!response.ok) {
      throw new Error('Failed to fetch notes');
    }
    }
    catch (error) {
      console.error('Error fetching notes:', error.message);
      // Handle error state or retry logic here
    }
  };

  let updateNote = async () =>{
    try{
      let response = await fetch(`/api/notes/${id}/update/`,{
      method: "PUT",
      headers: {
        'Content-Type' : 'application/json'
      },
      body : JSON.stringify(note)
    })
    if (!response.ok) {
      throw new Error('Failed to fetch notes');
    }
    }
    catch (error) {
      console.error('Error fetching notes:', error.message);
      // Handle error state or retry logic here
    }
  }

  let deleteNote = async () =>{
    try{
      let response = await fetch(`/api/notes/${id}/delete/`,{
      method:"DELETE",
      headers: {
        'Content-Type' : 'application/json'
      },
    })
    navigate('/notes')
    if (!response.ok) {
      throw new Error('Failed to fetch notes');
    }
    }
    catch (error) {
      console.error('Error fetching notes:', error.message);
      // Handle error state or retry logic here
    }
  }


  let handleChange = (value) => {
    setNote(note => ({...note, 'body' : value}))
  }

  const handleClick = () => {
    if(id !== 'new'){
      if(note.body===''){
        deleteNote();
      }
      else{
        updateNote();
      }
    }
    else if(id==='new'&& note.body !== null){
      createNote();
    }
    navigate('/notes');
  };

  return (
    <div className='note'>
      <div className='note-header'>
        <h3>
          <Link to="/auth">
            <Arrow />
          </Link>
        </h3>
        {id !== 'new' ? (
          <button onClick={deleteNote}> Delete </button>
        ): (
          <button onClick={handleClick}> Done </button>
        )}
      </div>
      <h1>
        <textarea onChange={(e) => {handleChange(e.target.value)}} value={note?.body}></textarea>
      </h1>
      <div className='floating-button'>
        <h3>
          <Link onClick={handleClick}>
            <Done_Arrow />
          </Link>
        </h3>
      </div>
    </div>
  );
};

export default Note;