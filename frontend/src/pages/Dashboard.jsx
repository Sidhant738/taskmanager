import { useState } from "react";
import CardArea from "../components/cardArea/CardArea";
import Header from "../components/header/Header";
import useTask from "../hook/useTask";
import Modal from "../components/modal/Modal";
import EditCard from "../components/card/EditCard";
export default function Dashboard(){


  const { taskTable,
          setTaskTable,
          editTask,
          deleteTask,
          logout,
          addTask }=useTask();

  const [isOpen,setIsOpen]=useState(false);
  const [selectedTask,setSelectedTask]=useState(null);
    
    function handleClick(task){ 
       setIsOpen(true);
       const filtertask=taskTable.find(pre=>pre.id===task);
       setSelectedTask(filtertask);
    }
    function handleStatechange(taskId){
  
      const statusUpdate=taskTable.find(task=>task.id===taskId);

      if(statusUpdate)
      editTask({...statusUpdate, completed: !statusUpdate.completed});
    }
    return(
    <>

    <Header
    logout={logout}
    />
    <CardArea
      tasktable={taskTable}
      settasktable={setTaskTable}
      add={()=>handleClick(null)}
      edit={handleClick}
      ondelete={deleteTask}
      onState={handleStatechange}
      />
      {isOpen&&<Modal isOpen={isOpen} onClose={()=>setIsOpen(false)}>
         <EditCard
                task={selectedTask}
                onCancel={() => {
                  setIsOpen(false);               
                }}
                onSave={(taskdata)=>{selectedTask ? editTask(taskdata) : addTask(taskdata);
                             setIsOpen(false);}}
            />
        </Modal>}
    </>
    );
}
