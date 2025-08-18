
import NoteCard from "../components/NoteCard.jsx";
import { useContext } from "react";
import { Notecontext } from "../context/NoteContext.jsx";
import Controls from "../components/Controls.jsx";
const NotesPage = () => {
  const{notes}= useContext(Notecontext)
  return (
    <div>
      {notes.map(note => (
        <NoteCard key={note.$id} note={note} />
      ))}
      <Controls/>
    </div>
  );
};

export default NotesPage;
