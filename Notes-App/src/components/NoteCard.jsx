import {useRef , useEffect, useState} from 'react'
import DeleteButton from './DeleteButton';
import Spinner from '../icons/Spinner';
import { setNewoffset, bodyparser } from '../utils';
import { setZIndex } from '../utils';
import {db} from '../appwrite/databases'
import { useContext } from 'react';
import { Notecontext } from '../context/NoteContext';

const NoteCard = ({ note , setNotes }) => {
    const [saving, setSaving] = useState(false);
    const keyupTimer = useRef(null)
    const body = bodyparser(note.body);
    const [position, setposition] = useState( JSON.parse(note.position));
    const colors = JSON.parse(note.colors);
    const {setselectedNote} = useContext(Notecontext)

    let mouseStartPos = { x: 0, y: 0 };
    const cardRef = useRef(null);

    const textarearef = useRef(null)
    useEffect(()=>{
        cardgrow(textarearef)
        setZIndex(cardRef.current)
    },[])

   const cardgrow = () => {
    const textarea = textarearef.current;
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";
};


  const mouseDown = (e) => {
    if (e.target.classList.contains("card-header")) {
        mouseStartPos.x = e.clientX;
        mouseStartPos.y = e.clientY;

        document.addEventListener("mousemove", mouseMove);
        document.addEventListener("mouseup", mouseUp);

        setZIndex(cardRef.current);
        setselectedNote(note)
    }
};
    
    const mouseMove = (e) => {
        const mouseMoveDir = {
            x: mouseStartPos.x - e.clientX,
            y: mouseStartPos.y - e.clientY,
        }

        console.log("mouse move ",mouseMoveDir)
        mouseStartPos.x = e.clientX;
        mouseStartPos.y = e.clientY;

        const newPosition = setNewoffset(cardRef.current, mouseMoveDir);

        setposition(newPosition)

        
};

        const mouseUp = () => {
            document.removeEventListener("mousemove", mouseMove);
            document.removeEventListener("mouseup", mouseUp);

        const newposition = setNewoffset(cardRef.current)
        savedata("position", newposition)
       
        

    }

    const savedata = async (key, value) =>{
        const payload = { [key] : JSON.stringify(value) }

        try {
            await db.notes.update(note.$id, payload)
        } catch (error) {
            console.error(error)
        }
        setSaving(false)
    }

    const handkeyUP = () => {
        setSaving(true)

        if (keyupTimer.current) {
        clearTimeout(keyupTimer.current);
        }

        keyupTimer.current = setTimeout(() => {
            savedata("body" , textarearef.current.value);
        }, 2000);
    }
    return(
    
    <div
    
    ref={cardRef}
     className=" card absolute w-[400px] rounded cursor-pointer shadow-[0_1px_1px_hsl(0_0%_0%_/_0.075),0_2px_2px_hsl(0_0%_0%_/_0.075),0_4px_4px_hsl(0_0%_0%_/_0.075),0_8px_8px_hsl(0_0%_0%_/_0.075),0_16px_16px_hsl(0_0%_0%_/_0.075)]  "
    style={{backgroundColor: colors.colorBody, 
        left: `${position.x}px`,
        top: `${position.y}px`,
     }}>

        <div 
            onMouseDown={mouseDown}
            className="card-header rounded-t flex justify-between items-center p-[6px]" style={{backgroundColor:colors.colorHeader}}>
            <DeleteButton noteId={note.$id}/>
            
            {saving && (
                <div className="card-saving">
                    <Spinner color={colors.colorText}/>
                    <span style={{ color: colors.colorText }}>Saving...</span>
                </div> 
            )}

        </div>

        <div className='text-area'>
            <textarea 
            onKeyUp={handkeyUP}
            ref={textarearef}
            className="bg-inherit border-none w-full h-full resize-none text-base focus:bg-inherit focus:outline-none p-3"
            style={{color:colors.colorText}}
            defaultValue={body}
            onInput={() =>{cardgrow(textarearef)}}
            onFocus={() => {
                        setZIndex(cardRef.current)
                        setselectedNote(note)

            }}>
            
            </textarea>
        </div>
  
</div>
    )
};

export default NoteCard
