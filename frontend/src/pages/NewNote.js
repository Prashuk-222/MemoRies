import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import arrowSvg from '../svg_files/arrow.svg';
import doneSvg from '../svg_files/done.svg';
import '../form.css';

const NewNote = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [error, setError] = useState(null); // To handle errors
    const [success, setSuccess] = useState(false); // To indicate successful submission

    const handleSubmit = async (e) => {
        e.preventDefault();

        const noteData = {
            title,
            content,
        };

        try {
            const token = localStorage.getItem('accessToken'); // Retrieve token from localStorage
            if (!token) {
                setError('Authentication token not found. Please log in again.');
                return;
            }

            const response = await fetch('http://127.0.0.1:8000/api/notes/new/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`, // Include token in Authorization header
                },
                body: JSON.stringify(noteData),
            });

            if (response.ok) {
                setSuccess(true);
                setError(null);
                console.log('Note created successfully');
                // Optionally, reset the form fields
                setTitle('');
                setContent('');
            } else {
                const errorData = await response.json();
                setError(errorData.detail || 'Failed to create note');
            }
        } catch (error) {
            console.error('Error:', error);
            setError('An unexpected error occurred. Please try again.');
        }
    };

    return (
        <>
            <form className="note-form">
                <Link to="/notes">
                    <img src={arrowSvg} width="20" height="20" style={{ borderRadius: '50%' }} alt="Back" />
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
                {error && <p className="error-message">{error}</p>}
                {success && <p className="success-message">Note created successfully!</p>}
                <div className="floating-button">
                    <img
                        onClick={handleSubmit}
                        src={doneSvg}
                        width="100%"
                        height="100%"
                        alt="Submit"
                        style={{ cursor: 'pointer' }}
                    />
                </div>
            </form>
        </>
    );
};

export default NewNote;
