import React from 'react'
import { useContext } from 'react';
import { Notecontext } from '../context/NoteContext';
import { db } from '../appwrite/databases';

function Color({color}) {
  const {selectedNote, notes, setNotes} = useContext(Notecontext)
    const changecolor = () =>{
        try {
          const currentNoteindx = notes.findIndex(
            (note) => note.$id === selectedNote.$id
          )
          const updatedNote = {
            ... notes[currentNoteindx],
            colors:JSON.stringify(color)
          }
          const newNotes = [...notes]
          newNotes[currentNoteindx] = updatedNote
          setNotes(newNotes)
          db.notes.update(selectedNote.$id, {colors: JSON.stringify(color)})

        } catch (error) {
          alert("You must select a note before chaning colors")
        };
    }
  return (
    <div className='color' onClick={changecolor}
    style={{backgroundColor:color.colorHeader}}>
      
    </div>
  )
}

export default Color
