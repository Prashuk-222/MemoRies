import React from 'react'
import { Link } from 'react-router-dom'

let getTime = (note) => {
  return new Date(note.updated).toLocaleDateString()
}

let getTitle = (note) => {
  let title = note.body.split('\n')[0]
  if(title.length>30){
    return title.slice(0,30)
  }
  return title
}

let getContent = (note) =>
{
  let title = getTitle(note)
  let content = note.body.replaceAll('\n',' ')
  content = content.replaceAll(title,'')

  if(content.length>30){
    return content.slice(0,45) + '...'
  }
  else{
    return content
  }
}
const ListItems = ({ note }) => {
  return (
    <Link to = {`/note/${note.id}`}>
      <div className='notes-list-item'>
        <h3>{getTitle(note)}</h3>
        <p> 
          <div>
            <div align = 'left'>{getContent(note)}</div>
            <div align = 'right'><span>{getTime(note)}</span></div>
          </div>
        </p>
      </div>
    </Link>
  )
}

export default ListItems
