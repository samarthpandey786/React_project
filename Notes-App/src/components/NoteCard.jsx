import {useRef , useEffect, useState} from 'react'
import Trash from '../icons/Trash';

const NoteCard = ({ note }) => {
    const body = JSON.parse(note.body);
    const [position, setposition] = useState( JSON.parse(note.position));
    const colors = JSON.parse(note.colors);

    let mouseStartPos = { x: 0, y: 0 };
    const cardRef = useRef(null);

    const textarearef = useRef(null)
    useEffect(()=>{
        cardgrow(textarearef)
    },[])

   const cardgrow = () => {
    const textarea = textarearef.current;
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";
};


    const mouseDown = (e) =>{
        mouseStartPos.x = e.clientX
        mouseStartPos.y = e.clienty

        document.addEventListener('mousemove', mouseMove)
        document.addEventListener('mouseup', mouseUp)
        
    }
    
    const mouseMove = (e) => {
        const mouseMoveDir = {
            x: mouseStartPos.x - e.clientX,
            y: mouseStartPos.y - e.clientY,
        }

        console.log("mouse move ",mouseMoveDir)
        mouseStartPos.x = e.clientX;
        mouseStartPos.y = e.clientY;

        setposition({
            x:cardRef.current.offsetLeft - mouseMoveDir.x,
            y:cardRef.current.offsetTop - mouseMoveDir.y,
        })

        
};

const mouseUp = () => {
            document.removeEventListener("mousemove", mouseMove);
            document.removeEventListener("mouseup", mouseUp);
        

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
            <Trash/>
        </div>

        <div className='text-area'>
            <textarea 
            ref={textarearef}
            className="bg-inherit border-none w-full h-full resize-none text-base focus:bg-inherit focus:outline-none p-3"
            style={{color:colors.colorText}}
            defaultValue={body}
            onInput={() =>{cardgrow(textarearef)}}>
            </textarea>
        </div>
  
</div>
    )
};

export default NoteCard
