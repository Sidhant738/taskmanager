import CardContainer from "./CardContainer";

export default function ViewCard({task,onClose}){

    if(!task)return null;

    return(
        <CardContainer>

         <h2>{task.title}</h2>

         <p>{task.description}</p>

         <button onClick={onClose}>Close</button>

        </CardContainer>
    );
}