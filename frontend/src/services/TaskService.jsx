
async function taskCreate(taskInfo){
 
  const response= await fetch("http://localhost:8080/task/create",{
      method:"POST",
      headers:{
         "Content-Type":"application/json"
     },
     body:JSON.stringify(taskInfo)
     });
     
  await checkResponse(response,"Failed to create task");

  return await response.json();
     
}

async function taskGet(taskId){
 
  const response= await fetch(`http://localhost:8080/task/${taskId}`);
  
  await checkResponse(response,"Failed to get task");

  return await response.json();
     
}
async function taskGetAll(userId){
 
  const response= await fetch(`http://localhost:8080/task/user/${userId}`);

  await checkResponse(response,"Failed to get task list");


  return await response.json();
     
}
async function taskDelete(taskId){
 
  const response= await fetch(`http://localhost:8080/task/delete/${taskId}`,{
    method:"DELETE"
     });

  await checkResponse(response,"Failed to delete task");

  return await response.text();
     
}

async function taskUpdate(taskInfo){
 
  const response= await fetch("http://localhost:8080/task/update",{
    method:"PUT",
    headers:{
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
