import React from "react";
import "../component.css"

function TaskCard({task, onEdit,onDelete,status}) {
    return (
        <div className="taskcard">
            <h2><b>{task.title}</b></h2>

            <p>{task.description}</p>

            <nav className="cardButtons">
                <button onClick={()=>{onDelete(task.id)}}>Delete</button>
                <button onClick={()=>{onEdit(task.id)}}>Edit</button>
                <button onClick={status}>
                    {task.status ? "Unfinish" : "Finish"}
                </button>
            </nav>
        </div>
    );
}

export default TaskCard;