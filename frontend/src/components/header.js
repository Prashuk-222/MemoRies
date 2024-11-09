import React from 'react';
import { Link, useParams } from 'react-router-dom';
import addSvg from '../svg_files/create.svg';
import NewNote from '../pages/NewNote';

const Header = () => {
  const { id } = useParams();

  return (
    <div className='app-header'>
      <h1>
        Note List
      </h1>
      {
        (id === 'create') ? (<></>) : (
          <h3 style={{ display: "flex" }}>
            <Link to="/notes/create" className='floating-button' style={{ position: "relative", bottom: "0", right: "12px" }}>
              <img src={addSvg} width="80%" height="80%" />
            </Link>
          </h3>
        )

      }

    </div>
  )
}

export default Header