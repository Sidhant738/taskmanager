import React, { useState } from "react";
import "../component.css"

function EditCard({ task, onSave, onCancel }) {
 const [title,settitle]=useState(task.title);
 const [description,setdescription]=useState(task.description);
    return (
        <div className="editCard">
            <form className="editCardForm" onSubmit={()=>onSave(title,description)}>

                <label>Title:</label>
                <input 
                    type="text"
                    name="title"
                    value={title}
                    onChange={(e) => settitle(e.target.value)}
                />

                <label>Description:</label>
                <textarea
                    name="description"
                    value={description}
                    onChange={(e) => setdescription(e.target.value)}
                />
               <nav>
                <button  className="navbutton1"
                    type="button"
                    onClick={onCancel}
                >
                    Cancel
                </button>

                <button  className="navbutton2" type="submit">
                    Done
                </button>
               </nav>
            </form>
        </div>
    );
}

export default EditCard;