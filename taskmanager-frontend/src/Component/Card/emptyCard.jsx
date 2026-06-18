import React from "react";
import "../component.css"


function EmptyCard({onClick}){
    return(
        <div className="emptyCard" onClick={onClick}>
        <h1>+</h1>
        </div>
    );
}
export default EmptyCard;