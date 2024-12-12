import { createContext, useContext, useState, useEffect } from "react";

// Create a context for user verification
const VerifyContext = createContext();

const Authorization = ({ children }) => {
    const [isVerified, setIsVerified] = useState(false);

    // Handle login to set verification state
    const handleLogin = (data) => {
        setIsVerified(true);  // Set isVerified to true on successful login
    };

    return (
        <VerifyContext.Provider value={{ isVerified, setIsVerified, handleLogin }}>
            {children}
        </VerifyContext.Provider>
    );
};

// Custom hook to use VerifyContext
const useVerify = () => useContext(VerifyContext);

// Create a context for note ID
const IdContext = createContext();

const GetID = ({ children }) => {
    const [id, setId] = useState('create'); // Default value is 'create'

    return (
        <IdContext.Provider value={{ id, setId }}>
            {children}
        </IdContext.Provider>
    );
};

// Custom hook to use IdContext
const useID = () => useContext(IdContext);

// Create a context for user data
const UserDataContext = createContext();

const GetUserData = ({ children }) => {
    const [user, setUser] = useState([]);
    const [loading, setLoading] = useState(true); // To handle loading state
    const [error, setError] = useState(null); // To handle errors

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const token = localStorage.getItem('accessToken'); // Retrieve token from localStorage
                if (!token) {
                    setError('Authentication token not found. Please log in again.');
                    setLoading(false);
                    return;
                }

                const response = await fetch('http://127.0.0.1:8000/api/notes/', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`, // Include token in Authorization header
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setUser(data); // Set the fetched notes
                    setError(null);
                } else {
                    const errorData = await response.json();
                    setError(errorData.detail || 'Failed to fetch notes');
                }
            } catch (error) {
                console.error('Error:', error);
                setError('An unexpected error occurred. Please try again.');
            } finally {
                setLoading(false); // Ensure loading state is updated
            }
        };

        fetchNotes();
    }, []); // Fetch notes once when the component mounts

    return (
        <UserDataContext.Provider value={{ user, setUser, loading, error }}>
            {children}
        </UserDataContext.Provider>
    );
};

// Custom hook to use UserDataContext
const useUser = () => useContext(UserDataContext);

export { Authorization, useVerify, GetID, useID, GetUserData, useUser };
