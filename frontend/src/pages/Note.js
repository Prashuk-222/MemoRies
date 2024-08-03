import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Note = () => {
  const { id } = useParams(); // id is a string
  const [note, setNote] = useState(null);

  useEffect(() => {
    getNote();
  }, [id]);

  const getNote = async () => {
    console.log(id);
    let response = await fetch(`/api/notes/${id}/`);
    let data = await response.json();
    setNote(data);
  };

  return (
    <div>
      <h1>
        <p>{note?.body}</p>
      </h1>
    </div>
  );
};

export default Note;