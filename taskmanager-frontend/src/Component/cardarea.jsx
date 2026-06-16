import React, { useState } from "react";
import "./component.css"
import TaskCard from "./taskcard";
function CardArea(){
    const [task,settask]=useState([
        {
            id:0,
            title:"",
            description:"",
            status:true
        }
    ]);

  return(
   <div className="cardarea">

    <div className="cardAreaHeader">

      <h3>Tasks</h3>

      <div className="searchbar">
        <input type="text" 
               placeholder="Search by title"/>
        
        <button>Search</button>
      
      </div>

    </div>

    <div className="taskCardArea">
      
    </div>

   </div>
  );
}
export default CardArea;