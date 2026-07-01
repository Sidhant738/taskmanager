
async function TaskCreate(taskInfo){
 
  const response= await fetch("http://localhost:8080/task/create",{
    method:"POST",
    headers:{
        "Content-Type":"application/json"
    },
     body:JSON.stringify(taskInfo)
     });

     return await response.json();
     
}

async function TaskGet(taskId){
 
  const response= await fetch(`http://localhost:8080/task/${taskId}`);

     return await response.json();
     
}
async function TaskGetAll(userId){
 
  const response= await fetch(`http://localhost:8080/task/user/${userId}`);

     return await response.json();
     
}
async function TaskDelete(taskId){
 
  const response= await fetch(`http://localhost:8080/task/delete/${taskId}`,{
    method:"DELETE"
     });

     return await response.text();
     
}

async function TaskUpdate(taskInfo){
 
  const response= await fetch("http://localhost:8080/task/update",{
    method:"PUT",
    headers:{
        "Content-Type":"application/json"
    },
     body:JSON.stringify(taskInfo)
     });

     return await response.json();
     
}


export {
    TaskCreate,
    TaskGet,
    TaskGetAll,
    TaskDelete,
    TaskUpdate
};
