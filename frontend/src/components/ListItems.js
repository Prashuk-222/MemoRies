import React from 'react';
import { Link } from 'react-router-dom';

const getTime = (time) => {
  return new Date(time).toLocaleDateString();
};

async function deleteItem(noteId) {
  // Get the token from localStorage
  const token = localStorage.getItem('accessToken');

  if (!token) {
    console.error('Authentication token not found. Please log in again.');
    return;
  }

  try {
    // Send the delete request to the backend server
    const response = await fetch(`http://127.0.0.1:8000/api/notes/${noteId}/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // Include token in Authorization header
      },
    });

    const data = await response.json();

    if (data.success) {
      console.log('Note deleted successfully');
      // Optionally, remove the item from the DOM
      document.getElementById(noteId).remove();
    } else {
      console.error('Failed to delete note');
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

const ListItems = ({ note }) => {
  return (
    <div className='notes-list-item'>
      <Link to={`/notes/${note.note_id}`}>
        <h3>{note.title}</h3>
        <div>
          <div>
            <div align='left'>{note.content}</div>
            <div key={13145} align='right'>
              <span>{getTime(note.created_at)}</span>
            </div>
            <div key={6548} align='right'>
              <span>{getTime(note.updated_at)}</span>
            </div>
          </div>
        </div>
      </Link>
      <div
        id={`${note.note_id}`}
        onClick={() => deleteItem(note.note_id)}
        className="delete-button"
      >
        Delete
      </div>
    </div>
  );
};

export default ListItems;
