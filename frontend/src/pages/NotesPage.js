import React, { useState, useEffect } from 'react';
import ListItems from '../components/ListItems';
import { useUser } from './global';

const NotesPage = () => {
  const [notes, setNotes] = useUser();
  const [loading, setLoading] = useState(true); // To manage loading state
  const [error, setError] = useState(null); // To manage errors

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const token = localStorage.getItem('accessToken'); // Retrieve token from localStorage
        if (!token) {
          throw new Error('Authentication token not found. Please log in again.');
        }

        const response = await fetch('http://127.0.0.1:8000/api/notes/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // Include token in Authorization header
          },
        });

        if (!response.ok) {
          throw new Error(`Error ${response.status}: Failed to fetch notes.`);
        }

        const data = await response.json();
        setNotes(data); // Update notes in global state
      } catch (err) {
        console.error('Error fetching notes:', err);
        setError(err.message);
      } finally {
        setLoading(false); // Stop loading indicator
      }
    };

    fetchNotes();
  }, [setNotes]); // Run only once when the component mounts

  if (loading) {
    return <div className='notes'>Loading notes...</div>;
  }

  if (error) {
    return <div className='notes'>Error: {error}</div>;
  }

  return (
    <div className='notes'>
      <div className='notes-header'>
        <h2 className='notes-title'>&#9782; Notes</h2>
        <p className='notes-count'>{notes?.length}</p>
      </div>
      <div className='notes-list'>
        {notes?.map((note, index) => (
          <ListItems key={index} note={note} />
        ))}
      </div>
    </div>
  );
};

export default NotesPage;
