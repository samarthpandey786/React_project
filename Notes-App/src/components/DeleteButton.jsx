import React from 'react'
import Trash from '../icons/Trash'
import { db } from '../appwrite/databases'
import { useContext } from 'react'
import { Notecontext } from '../context/NoteContext'

const DeleteButton = ({noteId}) => {
  const {setNotes} = useContext(Notecontext)
    const handledelete = async(e) => {
        db.notes.delete(noteId)
        setNotes((prevstate) => prevstate.filter((note) => note.$id !== noteId))
    }

  return (
    <div onClick={handledelete}>
      <Trash/>
    </div>
  )
}

export default DeleteButton
