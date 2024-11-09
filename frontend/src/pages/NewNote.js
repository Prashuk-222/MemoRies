import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import arrowSvg from '../svg_files/arrow.svg';
import doneSvg from '../svg_files/done.svg';
import '../form.css';

const NewNote = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const currentTime = new Date().toISOString();
        const noteData = {
            title,
            content,
            created_at: currentTime,
            updated_at: currentTime,
        };

        try {
            const response = await fetch('http://your-backend-server.com/notes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(noteData),
            });

            if (response.ok) {
                console.log('Note created successfully');
                // Optionally, reset the form fields
                setTitle('');
                setContent('');
            } else {
                console.error('Failed to create note');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <>

            <form className="note-form" >
                <Link to="/notes">
                    <img src={arrowSvg} width="20" height="20" style={{ borderRadius: "50%" }} />
                </Link>
                <div className="form-group">
                    <label htmlFor="title">Title of Note:</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="content">Content of Note:</label>
                    <textarea
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    />
                </div>
                <div className='floating-button'>
                    <img onClick={handleSubmit} src={doneSvg} width="100%" height="100%" />
                </div>
            </form>
        </>

    );
};

export default NewNote;
