import React from 'react'
import {Link} from 'react-router-dom'
import {ReactComponent as AddIcon} from '../svg_files/create.svg'
const AddButton = () => {
  return (
    <Link to="/note/new" className='floating-button'>
      <AddIcon />
    </Link>
  )
}

export default AddButton
