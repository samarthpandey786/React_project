import {useRef , useEffect} from 'react'
import Trash from '../icons/Trash';

const NoteCard = ({ note }) => {
    const body = JSON.parse(note.body);
    const position = JSON.parse(note.position);
    const colors = JSON.parse(note.colors);

    const textarearef = useRef(null)
    useEffect(()=>{
        cardgrow(textarearef)
    },[])

    const cardgrow = (textarea) => {
        const {current} = textarearef
        current.style.height = "auto"
        current.style.height = current.scrollHeight + "px"
    }
    
    return(
    
    <div className=" card absolute w-[400px] rounded cursor-pointer shadow-[0_1px_1px_hsl(0_0%_0%_/_0.075),0_2px_2px_hsl(0_0%_0%_/_0.075),0_4px_4px_hsl(0_0%_0%_/_0.075),0_8px_8px_hsl(0_0%_0%_/_0.075),0_16px_16px_hsl(0_0%_0%_/_0.075)]  "
    style={{backgroundColor: colors.colorBody, 
        left:`${position.x}px`,
        top:`${position.y}px`
     }}>

        <div className="card-header rounded-t flex justify-between items-center p-[6px]" style={{backgroundColor:colors.colorHeader}}>
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
