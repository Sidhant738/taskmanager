import { useEffect, useState } from "react";
import CardContainer from "./CardContainer";
import "../../styles/cards/editcard.css"


export default function EditCard({task,onCancel,onSave}){
    const [title,settitle]=useState("");
    const [description,setdescription]=useState("");

    useEffect(()=>{
         if(task){
        settitle(task.title);
        setdescription(task.description);
     }},[task]);

   function handleSubmit(e) {
     e.preventDefault();

     const taskPayload = task
      ? { ...task, title, description }
      : {
          title,
          description,
          status: false
        };

     onSave(taskPayload);
    }

    return(
        <CardContainer className="Edit">
         <form onSubmit={handleSubmit}>
            Title:
            <input
             value={title}
             onChange={(e)=>settitle(e.target.value)}
            />

            Description:
            <textarea
             rows="5"
             value={description}
             onChange={(e)=>setdescription(e.target.value)}
            />

            <nav>
                <button type="button"onClick={onCancel}>Close</button>
                <button type="submit">Save</button>
            </nav>

         </form>
        </CardContainer>
    );
}