import "../component.css"
function ViewCard({ task, onClose}){
    if (!task) return null;
    return(
       <div className="viewCard">
            <h2>{task.title}</h2>
            <div>{task.description}</div>
            <button onClick={onClose}>Close</button>
        </div>
    );

}
export default ViewCard;