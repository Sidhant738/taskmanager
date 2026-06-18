import React, { useState } from "react";
import "./component.css"
import TaskCard from "./Card/taskcard";
import EmptyCard from "./Card/emptyCard";
import EditCard from "./opreation/taskEdit";
import AddCard from "./opreation/addCard";


function CardArea(){


const [showAddForm,setShowAddForm]=useState(false);
const [showEditForm,setShowEditForm]=useState(false);
const [tasktable, settasktable] = useState([]);
const [selectedtask,setSelectedtask]=useState(null);

function saveCard(e){
e.preventDefault();

  const newtask={
  id:tasktable.length+1,
  title:e.target.title.value,
  description:e.target.description.value,
  status:false
  
}
  settasktable(pre=>[
    ...pre,
    newtask
  ]);
  setShowAddForm(false);
   setSelectedtask(null);
}

function onDelete(id){
 settasktable(prev=>prev.filter(
  task=>task.id!==id
   )
  );
}

function onSave(title,description){
 settasktable(prev=>(prev.map(task=>
   task.id===selectedtask.id
  ?{
    ...task,title,description
  }:task

 )));

 setSelectedtask(null);
 setShowEditForm(false);
}

function findtaskid(id){
 const task=tasktable.find(task=>task.id===id);
 setSelectedtask(task);
 setShowEditForm(true);
}

function showAddCard(){
  setShowAddForm(prev=>!prev);
}

function showEditCard(){
  setShowEditForm(prev=>!prev);
}


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
      <EmptyCard onClick={()=>showAddCard()}/>

      {showAddForm && <div className="modalOverlay">
        <AddCard onCancel={showAddCard} onSave={saveCard}/>
        </div>}
      {showEditForm && <div className="modalOverlay">
        <EditCard 
        task={selectedtask} onSave={onSave}onCancel={showEditCard}
        />
      </div>}

      
      {tasktable.map(task=>(
        <TaskCard key={task.id} 
                  task={task}  
                  onDelete={onDelete} 
                  onEdit={findtaskid}
                  />
       ))}
    </div>

  </div>
  );
}
export default CardArea;