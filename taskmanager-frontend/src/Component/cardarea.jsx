import React, { useState } from "react";
import "./component.css"
import TaskCard from "./Card/taskcard";
import EmptyCard from "./Card/emptyCard";
import EditCard from "./opreation/taskEdit";
import AddCard from "./opreation/addCard";
import ViewCard from "./Card/viewCard";


function CardArea(){

const [showAddForm,setShowAddForm]=useState(false);
const [showEditForm,setShowEditForm]=useState(false);
const [viewCard,setViewCard]=useState(false);
const [selectedtask,setSelectedtask]=useState(null);
const [subString,setsubString]=useState("");
const [tasktable, settasktable] = useState([
  {
    id: 1,
    title: "Learn React State",
    description: "Understand how useState updates components.",
    status: false
  },
  {
    id: 2,
    title: "Build Task Cards",
    description: "Create reusable TaskCard components.",
    status: true
  },
  {
    id: 3,
    title: "Connect Spring Boot",
    description: "Send API requests from React to backend.",
    status: false
  },
  {
    id: 4,
    title: "Implement Search",
    description: "Filter tasks by title.",
    status: false
  },
  {
    id: 5,
    title: "Learn PostgreSQL",
    description: "Practice CRUD operations using SQL.",
    status: true
  }
]);

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
function onStatus(id){

 settasktable(prev=>prev.map(
  
  task=>task.id===id?{
    ...task,status:!task.status
  }:task
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

function showViewCard(task){
  setSelectedtask(task);
  setViewCard(true);
}

const filtertable=tasktable.filter(task=>task.title
                                .toLowerCase()
                                .includes(subString.toLowerCase()))

  return(
  <div className="cardarea">

    <div className="cardAreaHeader">

      <h3>Tasks</h3>

      <div className="searchbar">
        <input type="text" 
               placeholder="Search by title"
               value={subString}
               onChange={(e)=>{
                setsubString(e.target.value);
               }}/>
      </div>

    </div>

    <div className="taskCardArea">
      <EmptyCard onClick={showAddCard}/>
      
      {viewCard&&
       <div className="modalOverlay" onClick={()=>{
          setViewCard(false);
          setSelectedtask(null);
       }}>
         <div onClick={(e)=>e.stopPropagation()}>
          <ViewCard 
                  task={selectedtask}
                  onClose={()=>{
                    setViewCard(false);
                    setSelectedtask(null);
                 }}
                  />
          </div>
        </div>
       }

      {showAddForm && 
      <div className="modalOverlay" onClick={showAddCard}>
        <div onClick={(e)=>e.stopPropagation()}>
        <AddCard onCancel={showAddCard} onSave={saveCard}/>
         </div>
      </div>}

      {showEditForm &&
       <div className="modalOverlay" onClick={showEditCard}>
        <div onClick={(e)=>e.stopPropagation()}>
          <EditCard 
                    task={selectedtask} 
                    onSave={onSave}onCancel={showEditCard}
         />
         </div>
      </div>
      }

      {filtertable.map(task=>(
        <TaskCard key={task.id} 
                  task={task}  
                  onDelete={onDelete} 
                  onEdit={findtaskid}
                  status={onStatus}
                  onClick={()=>showViewCard(task)}
                  />
       ))}

    
    </div>

  </div>
  );
}
export default CardArea;