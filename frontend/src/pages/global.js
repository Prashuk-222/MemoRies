import React, { createContext, useContext, useState, useEffect } from 'react';

// Existing contexts
const AuthContext = createContext();
const IDContext = createContext();
const UserContext = createContext();
const VerifyContext = createContext();

// Add Verification Context
const VerificationContext = createContext();

// Combine all providers into one
export const GlobalProvider = ({ children }) => {
  const [isVerified, setIsVerified] = useState(() => {
    // Initialize isVerified based on the presence of token in localStorage
    return !!localStorage.getItem('accessToken');
  });

  // Add an effect to update verification status when token changes
  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem('accessToken');
      setIsVerified(!!token);
    };

    // Check initially
    checkToken();

    // Add event listener for storage changes
    window.addEventListener('storage', checkToken);

    return () => {
      window.removeEventListener('storage', checkToken);
    };
  }, []);

  const [auth, setAuth] = useState(false);
  const [id, setId] = useState(null);
  const [user, setUser] = useState(null);
  const [verify, setVerify] = useState(false);

  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      <IDContext.Provider value={[id, setId]}>
        <UserContext.Provider value={[user, setUser]}>
          <VerifyContext.Provider value={[verify, setVerify]}>
            <VerificationContext.Provider value={{ isVerified, setIsVerified }}>
              {children}
            </VerificationContext.Provider>
          </VerifyContext.Provider>
        </UserContext.Provider>
      </IDContext.Provider>
    </AuthContext.Provider>
  );
};

// Custom hooks
export const useAuth = () => useContext(AuthContext);
export const useID = () => useContext(IDContext);
export const useUser = () => useContext(UserContext);
export const useVerify = () => useContext(VerifyContext);
export const useVerification = () => {
  const context = useContext(VerificationContext);
  if (!context) {
    throw new Error('useVerification must be used within a GlobalProvider');
  }
  return context;
};

