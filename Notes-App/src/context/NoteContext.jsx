import{createContext, useEffect, useState} from "react"
import Spinner from "../icons/Spinner"
import { db } from "../appwrite/databases"
export const Notecontext = createContext()

const NoteProvider = ({children}) => {
    const [notes, setNotes] = useState([]);
    const [loading, setloading] = useState(true);
    const [selectedNote, setselectedNote] = useState(null);

      useEffect(() => {
        init();
  }, []);

    const init = async () => {
    try {
      const response = await db.notes.list()
      console.log(response.documents); // log only the docs array
      setNotes(response.documents);
      setloading(false)
    } catch (error) {
      console.error("Error fetching documents:", error);
    }
  };
    const contextData = {notes , setNotes , selectedNote, setselectedNote}
    return(<Notecontext.Provider value={contextData}>
        {loading ? <Spinner size={100}/> : children}
    </Notecontext.Provider>)
}


export default NoteProvider ;