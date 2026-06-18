import React from "react";
import "../component.css"
function AddCard({onCancel,onSave}){
   return (
        <div className="editCard">
            <form className="editCardForm" onSubmit={onSave}>

                <label>Title:</label>
                <input 
                    type="text"
                    name="title"
                />

                <label>Description:</label>
                <textarea
                    name="description"
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
export default AddCard;