
import { checkResponse } from "./apiHelper";

async function userGet(userId){
 
  const response= await fetch(`http://localhost:8080/user/${userId}`,{

     method:"GET",
      headers:{
         "Authorization":`Bearer ${localStorage.getItem("userToken")}`,
         "Content-Type":"application/json"
     }});
  
  await checkResponse(response,"Failed to get User");

  return await response.json();
     
}

async function currentUser(){
  const response = await fetch("http://localhost:8080/user/me", {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${localStorage.getItem("userToken")}`,
      "Content-Type": "application/json"
    }
  });

  await checkResponse(response, "Failed to load current user");
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


async function userGetAll(){
 
  const response= await fetch(`http://localhost:8080/user/getall`,{

     method:"GET",
      headers:{
         "Authorization":`Bearer ${localStorage.getItem("userToken")}`,
         "Content-Type":"application/json"
     }});
  
  await checkResponse(response,"User list not found");
  
  return await response.json();
     
}
async function userDelete(userId){
 
  const response= await fetch(`http://localhost:8080/user/delete/${userId}`,{
    method:"DELETE",
    headers:{
         "Authorization":`Bearer ${localStorage.getItem("userToken")}`,
         "Content-Type":"application/json"
     }});

  await checkResponse(response,"Failed to delete user");

  return await response.text();
     
}

async function userUpdate(userInfo){
 
  const response= await fetch("http://localhost:8080/user/update",{
    method:"PUT",
    headers:{
        "Authorization":`Bearer ${localStorage.getItem("userToken")}`,
        "Content-Type":"application/json"
    },
     body:JSON.stringify(userInfo)
     });
  
  await checkResponse(response,"Failed to update user info");

  return await response.json();
     
}

async function userChangePassword(userId, newPassword) {
  const response = await fetch("http://localhost:8080/user/change-password", {
    method: "PUT",
    headers: {
      "Authorization": `Bearer ${localStorage.getItem("userToken")}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ userId, newPassword })
  });

  await checkResponse(response, "Failed to change password");
  return await response.json();
}

export {
  userDelete,
  userGet,
  currentUser,
  userName,
  userEmail,
  userUpdate,
  userChangePassword,
  userGetAll
};
