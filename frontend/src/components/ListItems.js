import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import '../style/ListItems.css';
const getTime = (time) => {
  return new Date(time).toLocaleDateString();
};

const ListItems = ({ note, onDelete }) => {
  const navigate = useNavigate();

  const handleDelete = async (noteId) => {
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
          'Authorization': `Bearer ${token}`,
        },
      });
      
      if (response.status === 204) {
        console.log('Note deleted successfully');
        onDelete(noteId);
      } else if (response.status === 404) {
        console.error('Note not found');
      } else {
        console.error('Failed to delete note');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  return (
    <div className='notes-list-item'>
      <Link to={`/notes/${note.id}/${encodeURIComponent(note.title)}/${encodeURIComponent(note.content)}`}>
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
      <button 
        id={`${note.id}`}
        onClick={() => handleDelete(note.id)}
        className="delete-button"
      >
        Delete
      </button>
    </div>
  );
};

export default ListItems;
