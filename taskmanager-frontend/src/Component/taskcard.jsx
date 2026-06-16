import React from "react";

function TaskCard(props) {
    return (
        <div className="taskcard">
            <h2><b>{props.title}</b></h2>

            <p>{props.description}</p>

            <nav className="cardButtons">
                <button>Delete</button>
                <button>Edit</button>
                <button>
                    {props.finished ? "Unfinish" : "Finish"}
                </button>
            </nav>
        </div>
    );
}

export default TaskCard;