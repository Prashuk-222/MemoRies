import React from 'react'
import { Link } from 'react-router-dom'

const getTime = (time) => {
  return new Date(time).toLocaleDateString();
}

async function deleteItem(elementId) {
  // Create the request payload
  const payload = { id: elementId };

  try {
    // Send the delete request to the backend server
    const response = await fetch('/delete-item', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();

    if (data.success) {
      console.log('Item deleted successfully');
      // Optionally, remove the item from the DOM
      document.getElementById(elementId).remove();
    } else {
      console.error('Failed to delete item');
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

const ListItems = ({ note }) => {
  return (

    <div className='notes-list-item' >
      <Link to={`/notes/${note.note_id}`}>
        <h3>{note.title}</h3>
        <div>
          <div>
            <div align='left'>{note.content}</div>
            <div key={13145} align='right'><span>{getTime(note.created_at)}</span></div>
            <div key={6548} align='right'><span>{getTime(note.updated_at)}</span></div>
          </div>
        </div>
      </Link>
      <div id={`${note.note_id}`} onClick={() => deleteItem(note.note_id)} className="">Delete</div>
    </div>

  )
}

export default ListItems
