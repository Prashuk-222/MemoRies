import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Navigate} from 'react-router-dom';
import { Link } from 'react-router-dom';
import {ReactComponent as Arrow} from '../svg_files/arraow.svg'
import {ReactComponent as Done_Arrow} from '../svg_files/done.svg'
const Note = () => {
  const { id } = useParams(); // id is a string
  const [note, setNote] = useState(null);
  let navigate = useNavigate();
  useEffect(() => {
    getNote();
  }, [id]);

  let getNote = async () => {
    if(id === 'new') return
    let response = await fetch(`/api/notes/${id}/`);
    let data = await response.json();
    setNote(data);
  };

  let createNote = async () => {
    fetch(`/api/notes/create/`,{
      method: "POST",
      headers: {
        'Content-Type' : 'application/json'
      },
      body : JSON.stringify(note)
    })
  };

  let updateNote = async () =>{
    fetch(`/api/notes/${id}/update/`,{
      method: "PUT",
      headers: {
        'Content-Type' : 'application/json'
      },
      body : JSON.stringify(note)
    })
  }

  let deleteNote = async () =>{
    fetch(`/api/notes/${id}/delete/`,{
      method:"DELETE",
      headers: {
        'Content-Type' : 'application/json'
      },
    })
    navigate('/')
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
      navigate('/');
    }
    else{
      navigate('/');
    }
  };

  return (
    <div className='note'>
      <div className='note-header'>
        <h3>
          <Link to="/">
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
          <Link to="/">
            <Done_Arrow onClick={handleClick}/>
          </Link>
        </h3>
      </div>
    </div>
  );
};

export default Note;