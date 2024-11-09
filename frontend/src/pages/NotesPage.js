import React, { useState, useEffect } from 'react';
import ListItems from '../components/ListItems';
import { users_data } from '../constants';
import { useUser } from './global';

const NotesPage = () => {

  const [notes, setNotes] = useUser();


  return (
    <div className='notes'>
      <div className='notes-header'>
        <h2 className='notes-title'>
          &#9782; Notes
        </h2>
        <p className='notes-count'>{notes?.length}</p>
      </div>
      <div className='notes-list'>
        {notes?.map((note, index) => (
          <ListItems key={index} note={note} />
        ))}
      </div>
      <div>

      </div>
    </div>
  )
}

export default NotesPage;
