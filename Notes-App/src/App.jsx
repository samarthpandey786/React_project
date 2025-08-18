import React from 'react'
import NotesPage from './pages/NotesPage'
import NoteProvider from './context/NoteContext'

function App() {
  return (
    <div >
      <NoteProvider>
      <NotesPage />
      </NoteProvider>
    </div>
  )
}

export default App
