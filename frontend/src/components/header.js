import React from 'react';
import { Link, useParams } from 'react-router-dom';
import addSvg from '../svg_files/create.svg';
import { useVerify } from '../pages/global'; // Custom hook to check if the user is authenticated

const Header = () => {
  const { id } = useParams();
  const {isVerified} = useVerify();  // Get the authentication status

  return (
    <div className='app-header'>
      <h1>
        Note List
      </h1>
      {
        (id === 'new') ? (<></>) : (
          // Show the create button only if the user is authenticated
          isVerified ? (
            <h3 style={{ display: "flex" }}>
              <Link 
                to="/notes/create" 
                className='floating-button' 
                style={{ position: "relative", bottom: "0", right: "12px" }}
              >
                <img src={addSvg} width="80%" height="80%" />
              </Link>
            </h3>
          ) : (
            <div style={{ color: 'gray', fontStyle: 'italic' }}>Please log in to create a note</div>
          )
        )
      }
    </div>
  );
};

export default Header;
