import { useEffect, useState } from "react";
import { taskCreate,taskDelete,taskGet,taskGetAll,taskUpdate } from "../services/TaskService"


export default function useTask(){
   
    const [taskTable,setTaskTable] =useState([]);

    useEffect(()=>{
       loadTask();
    },[]);

    async function loadTask(){
        try{
          const userRaw = localStorage.getItem("user");
          if (userRaw) {
              const user = JSON.parse(userRaw);
              const response = await taskGetAll(user.userId);
              setTaskTable(response);
          }
        }catch(error){
           console.log(error.message);
        }
        
    }
   

    async function addTask(task){
  
        try{
            const userRaw = localStorage.getItem("user");
              if (userRaw) {
                 const user=JSON.parse(userRaw);
                 const response=await taskCreate({
                     ...task,
                     userId: user.userId
                 });
                 setTaskTable(pre=>[
                     ...pre,response
                 ]);
                }
        }catch(error){
            console.log(error.message)
        }
  
     }

    async function editTask(task){
  
        try{

        const response=await taskUpdate(task);

       setTaskTable(pre=>pre.map(
            task=>
                task.id===response.id ? response : task
            ));
        }catch(error){
            console.log(error.message)
        }
  
    }

    async function getTask(taskId){

        try{
            return await taskGet(taskId);
        
        }catch(error){
            console.log(error.message)
        }
    }

    async function deleteTask(taskId){
  
        try{

            await taskDelete(taskId);
            setTaskTable(pre=>pre.filter(
                    task=>
                        task.id!==taskId
            ));
        }catch(error){
            console.log(error.message)
        }
  
    }
    function logout(){
        localStorage.removeItem("user");
    }
    return {
       taskTable,
       setTaskTable,
       addTask,
       editTask,
       getTask,
       logout,
       deleteTask
    };
}