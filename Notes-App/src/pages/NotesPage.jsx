import { useState, useEffect } from 'react';
// import { databases } from '../appwrite/config';

import NoteCard from "../components/NoteCard.jsx";
import { db } from '../appwrite/databases.js';
const NotesPage = () => {
  const dbId = import.meta.env.VITE_DB_ID;
  const colId = import.meta.env.VITE_COLLECTION_ID;

  if (!dbId || !colId) {
    throw new Error(`Missing env variables: DB=${dbId}, COL=${colId}`);
  }

  const [notes, setNotes] = useState([]);

  const init = async () => {
    try {
      const response = await db.notes.list()
      console.log(response.documents); // log only the docs array
      setNotes(response.documents);
    } catch (error) {
      console.error("Error fetching documents:", error);
    }
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <div>
      {notes.map(note => (
        <NoteCard key={note.$id} note={note} />
      ))}
    </div>
  );
};

export default NotesPage;
