
async function userCreate(userInfo){
 
  const response= await fetch("http://localhost:8080/user",{
    method:"POST",
    headers:{
        "Content-Type":"application/json"
    },
     body:JSON.stringify(userInfo)
     });
  
  await checkResponse(response,"Failed to register");

  return await response.json();
     
}

async function userGet(userId){
 
  const response= await fetch(`http://localhost:8080/user/${userId}`);
  
  await checkResponse(response,"Failed to get User");

  return await response.json();
     
}
async function userName(userName){
 
  const response= await fetch(`http://localhost:8080/user/username/${userName}`);
     
  await checkResponse(response,"User name not found");

  return await response.json();
     
}
async function userEmail(userEmail){
 
  const response= await fetch(`http://localhost:8080/user/useremail/${userEmail}`);

  await checkResponse(response,"User email not found");

  return await response.json();
     
}


async function login(loginData) {

    const response = await fetch("http://localhost:8080/user/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(loginData)
    });

    
  await checkResponse(response,"Login failed");

  return await response.json();
}

async function userGetAll(){
 
  const response= await fetch(`http://localhost:8080/user/getall`);
  
  await checkResponse(response,"User list not found");
  
  return await response.json();
     
}
async function userDelete(userId){
 
  const response= await fetch(`http://localhost:8080/user/delete/${userId}`,{
    method:"DELETE"
     });

  await checkResponse(response,"Failed to delete user");

  return await response.text();
     
}

async function userUpdate(userInfo){
 
  const response= await fetch("http://localhost:8080/user/update",{
    method:"PUT",
    headers:{
        "Content-Type":"application/json"
    },
     body:JSON.stringify(userInfo)
     });
  
  await checkResponse(response,"Failed to update user info");

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
  userCreate,
  userDelete,
  userGet,
  userName,
  userEmail,
  userUpdate,
  userGetAll,
  login
};
