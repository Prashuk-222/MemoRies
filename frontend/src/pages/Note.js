import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import arrowSvg from '../svg_files/arrow.svg';
import doneSvg from '../svg_files/done.svg';
import editSvg from '../svg_files/edit.svg';
import { Link } from 'react-router-dom';
import { useUser } from './global.js';
import NewNote from './NewNote.js';

const Note = () => {
  const { id } = useParams();
  console.log(id);
  const [notes, setNotes] = useUser();
  const [currentNote, setCurrentNote] = useState(null);

  //for edit option
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState('');
  const [editedContent, setEditedContent] = useState(content);
  // console.log(notes);

  const findNoteById = (note_id) => {
    const note = notes.find(note => note.note_id === parseInt(note_id));
    if (note) {
      setCurrentNote(note);
      // console.log(note);
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
      const response = await fetch('http://your-backend-server.com/notes/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedNote),
      });

      if (response.ok) {
        console.log('Note updated successfully');
      } else {
        console.error('Failed to update note');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };



  return (
    (id === 'create') ? (<NewNote />) :
      <div className='note'>
        <div className='note-header'>
          <h3>
            <Link to="/notes">
              <img src={arrowSvg} width="20" height="20" style={{ borderRadius: "50%" }} />
            </Link>
            {currentNote && <div>{currentNote.title}</div>}
          </h3>
          {/* <button onClick={handleClick}> Done </button> */}
        </div>
        {currentNote &&
          <div>
            {isEditing ? (
              <div>
                <textarea
                  id="note-content"
                  value={editedContent}
                  onChange={(e) => setEditedContent(e.target.value)}
                />
                {/* <button onClick={handleSubmit}>Save</button> */}
              </div>
            ) : (
              <div>
                <div id="note-content">{content}</div>
                {/* <button onClick={handleEdit}>Edit</button> */}
              </div>
            )}
          </div>}

        <div className='floating-button'>
          <h3>

            {(!isEditing) ? (<img onClick={handleEdit} src={editSvg} width="100%" height="100%" />) : (<img onClick={handleSubmit} src={doneSvg} width="100%" height="100%" />)}

          </h3>
        </div>
      </div>
  );
};

export default Note;
