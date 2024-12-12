import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import arrowSvg from '../svg_files/arrow.svg';
import doneSvg from '../svg_files/done.svg';
import editSvg from '../svg_files/edit.svg';
import { useUser } from './global.js';
import NewNote from './NewNote.js';

const Note = () => {
  const { id } = useParams();
  const [notes, setNotes] = useUser();
  const [currentNote, setCurrentNote] = useState(null);

  // For edit option
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState('');
  const [editedContent, setEditedContent] = useState('');

  const findNoteById = (note_id) => {
    const note = notes.find(note => note.note_id === parseInt(note_id));
    if (note) {
      setCurrentNote(note);
    } else {
      console.error(`Note with ID ${note_id} not found`);
    }
  };

  useEffect(() => {
    if (notes) {
      findNoteById(id);
    }
  }, [id, notes]);

  useEffect(() => {
    if (currentNote) {
      setContent(currentNote.content);
      setEditedContent(currentNote.content);
    }
  }, [currentNote]);

  const handleEdit = () => {
    setEditedContent(content);
    setIsEditing(true);
  };

  const handleSubmit = async () => {
    setContent(editedContent);
    setIsEditing(false);

    const updatedNote = {
      ...currentNote,
      content: editedContent,
      updated_at: new Date().toISOString(),
    };

    try {
      const token = localStorage.getItem('accessToken'); // Retrieve token from localStorage
      if (!token) {
        alert('Authentication token not found. Please log in again.');
        return;
      }

      const response = await fetch('http://127.0.0.1:8000/api/notes/', {
        method: 'PUT', // Assuming update uses PUT
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(updatedNote),
      });

      if (response.ok) {
        console.log('Note updated successfully');
        // Optionally update the notes list in state
        const updatedNotes = notes.map(note =>
          note.note_id === currentNote.note_id ? updatedNote : note
        );
        setNotes(updatedNotes);
      } else {
        console.error('Failed to update note');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    (id === 'create') ? (
      <NewNote />
    ) : (
      <div className='note'>
        <div className='note-header'>
          <h3>
            <Link to="/notes">
              <img src={arrowSvg} alt="Back" width="20" height="20" style={{ borderRadius: "50%" }} />
            </Link>
            {currentNote && <div>{currentNote.title}</div>}
          </h3>
        </div>
        {currentNote && (
          <div>
            {isEditing ? (
              <div>
                <textarea
                  id="note-content"
                  value={editedContent}
                  onChange={(e) => setEditedContent(e.target.value)}
                />
              </div>
            ) : (
              <div>
                <div id="note-content">{content}</div>
              </div>
            )}
          </div>
        )}

        <div className='floating-button'>
          <h3>
            {!isEditing ? (
              <img
                onClick={handleEdit}
                src={editSvg}
                alt="Edit"
                width="100%"
                height="100%"
              />
            ) : (
              <img
                onClick={handleSubmit}
                src={doneSvg}
                alt="Done"
                width="100%"
                height="100%"
              />
            )}
          </h3>
        </div>
      </div>
    )
  );
};

export default Note;
