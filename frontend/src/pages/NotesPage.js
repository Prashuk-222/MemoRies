import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ListItems from '../components/ListItems';
import { useVerification } from './global';

const NotesPage = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { isVerified } = useVerification();

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        if (!token) {
          setError('No authentication token found');
          navigate('/'); // Redirect to login
          return;
        }

        const response = await fetch('http://127.0.0.1:8000/api/notes/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          if (response.status === 401) {
            // Token expired or invalid
            localStorage.removeItem('accessToken');
            navigate('/'); // Redirect to login
            throw new Error('Session expired. Please login again.');
          }
          throw new Error(`Error ${response.status}: ${await response.text()}`);
        }

        const data = await response.json();
        setNotes(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching notes:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (isVerified) {
      fetchNotes();
    } else {
      navigate('/');
    }
  }, [navigate, isVerified]);

  const handleDelete = (deletedNoteId) => {
    setNotes(prevNotes => prevNotes.filter(note => note.id !== deletedNoteId));
  };

  if (!isVerified) {
    return null; // or a loading spinner
  }

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
        {notes?.map((note) => (
          <ListItems 
            key={note.id} 
            note={note} 
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default NotesPage;
