import CardContainer from "./CardContainer";
export default function TaskCard({task,onDelete,status,onEdit,onState}){
    
    return(
        <CardContainer className="Task">
           <h2>{task.title}</h2>

            <p>{task.description}</p>
            
            <nav>
                <button onClick={(e)=>onDelete(task.id)}>Delete</button>
                <button onClick={(e)=>onEdit(task.id)}>Edit</button>
                <button onClick={(e)=>onState(task.id)}>{status?"Complete":"Uncomplete"}</button>
            </nav>
        </CardContainer>
    );

}