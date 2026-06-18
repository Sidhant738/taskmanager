import React from "react";
import "../component.css"

function TaskCard({task, onEdit,onDelete,status, onClick}) {
    return (
        <div className="taskcard" onClick={onClick}>
            <h2><b>{task.title}</b></h2>

            <p>{task.description}</p>

            <nav className="cardButtons">
                <button className="b1" onClick={(e)=>{
                                      e.stopPropagation();
                                      onDelete(task.id);
                                      }}>Delete</button>
                <button className="b2"  onClick={(e)=>{
                                      e.stopPropagation();
                                      onEdit(task.id);
                                      }}>Edit</button>
                <button
                   className={task.status ? "completeBtn" : "incompleteBtn"}
                   onClick={(e) => {
                                    e.stopPropagation();
                                    status(task.id);
                                   }}>
                        {task.status ? "Mark Incomplete" : "Mark Complete"}
                    </button>
            </nav>
        </div>
    );
}

export default TaskCard;