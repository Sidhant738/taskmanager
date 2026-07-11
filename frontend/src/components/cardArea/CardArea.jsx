import { useState } from "react";
import TaskCard from "../card/TaskCard";
import EmptyCard from "../card/EmptyCard";
export default function CardArea({tasktable,settasktable,add,ondelete,get,edit,onState}){
    
    const [search,setsearch]=useState("");
    
    const filtertask=tasktable.filter(task=>
        task.title.toLowerCase().includes(search.toLowerCase())
    );
    return(
     <>
        Task:

      <input type="text" 
             placeholder="Search task using title"
             value={search}
             onChange={(e)=>setsearch(e.target.value)}
             />

      <div className="Modal">
       
         <EmptyCard onClick={add}/>

         {filtertask.map(task=>
 
         <TaskCard
          key={task.id}
          task={task}
          onDelete={ondelete}
          onEdit={edit}
          status={task.status}
          onState={onState}
           />
         )}
          </div>
       </>
    );
    
}