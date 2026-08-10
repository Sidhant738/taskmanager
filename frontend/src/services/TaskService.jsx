
async function taskCreate(taskInfo){
 
  const response= await fetch("http://localhost:8080/task/create",{
      method:"POST",
      headers:{
         "Authorization":`Bearer ${localStorage.getItem("userToken")}`,
         "Content-Type":"application/json"
     },
     body:JSON.stringify(taskInfo)
     });
     
  await checkResponse(response,"Failed to create task");

  return await response.json();
     
}

async function taskGet(taskId){
 
  const response= await fetch(`http://localhost:8080/task/${taskId}`,{

     method:"GET",
      headers:{
         "Authorization":`Bearer ${localStorage.getItem("userToken")}`,
         "Content-Type":"application/json"
     }});
  
  await checkResponse(response,"Failed to get task");

  return await response.json();
     
}
async function taskGetAll(){
 
  const response= await fetch(`http://localhost:8080/task/userAllTask`,{

     method:"GET",
      headers:{
         "Authorization":`Bearer ${localStorage.getItem("userToken")}`,
         "Content-Type":"application/json"
     }});

  await checkResponse(response,"Failed to get task list");


  return await response.json();
     
}
async function taskDelete(taskId){
 
  const response= await fetch(`http://localhost:8080/task/delete/${taskId}`,{
    method:"DELETE",
      headers:{
         "Authorization":`Bearer ${localStorage.getItem("userToken")}`,
         "Content-Type":"application/json"
     }});

  await checkResponse(response,"Failed to delete task");

  return await response.text();
     
}

async function taskUpdate(taskInfo){
 
  const response= await fetch("http://localhost:8080/task/update",{
    method:"PUT",
    headers:{
        "Authorization":`Bearer ${localStorage.getItem("userToken")}`,
        "Content-Type":"application/json"
    },
     body:JSON.stringify(taskInfo)
     });
  
  await checkResponse(response,"Failed to update task");

  return await response.json();
     
}

async function checkResponse(response, defaultMessage) {
    if (!response.ok) {
        let message = defaultMessage;

        try {
            const error = await response.json();
            message = error.message || defaultMessage;
        } catch {
            message = await response.text() || defaultMessage;
        }

        throw new Error(message);
    }
}
export {
    taskCreate,
    taskGet,
    taskGetAll,
    taskDelete,
    taskUpdate
};
