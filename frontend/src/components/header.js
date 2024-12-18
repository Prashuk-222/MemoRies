import React from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import addSvg from '../svg_files/create.svg';
import logoutSvg from '../svg_files/logout.svg';
import { useVerification } from '../pages/global';

const Header = () => {
  const { id } = useParams();
  const { isVerified, setIsVerified } = useVerification();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setIsVerified(false);
    navigate('/');
  };

  return (<>
      {
        (id === 'new') ? (<></>) : (
          // Show the create button only if the user is authenticated
          isVerified ? (
            <>
            <div className='app-header'>
      <h1>
        Note List
      </h1>
            <h3 style={{ display: "flex" }}>
              <Link 
                to="/notes/create" 
                className='floating-button' 
                style={{ position: "relative", bottom: "0", right: "12px" }}
              >
                <img src={addSvg} width="80%" height="80%" />
              </Link>
            </h3>
            <button className='logout-button' onClick={handleLogout}><img src={logoutSvg} style={{ width: "25px", height: "25px" }}/></button>
            </div>
            </>
          ) : (
            <div className='app-header'>
      <h1>
        Note List
      </h1>
            <div style={{ color: 'gray', fontStyle: 'italic' }}>
              Please log in to create a note
            </div>
          </div>
          )
        )
      }
    </>
  );
};

export default Header;
