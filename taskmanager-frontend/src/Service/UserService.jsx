
async function userCreate(userInfo){
 
  const response= await fetch("http://localhost:8080/user",{
    method:"POST",
    headers:{
        "Content-Type":"application/json"
    },
     body:JSON.stringify(userInfo)
     });

     return await response.json();
     
}

async function userGet(userId){
 
  const response= await fetch(`http://localhost:8080/user/${userId}`);

     return await response.json();
     
}
async function userName(userName){
 
  const response= await fetch(`http://localhost:8080/user/username/${userName}`);

     return await response.json();
     
}
async function userEmail(userEmail){
 
  const response= await fetch(`http://localhost:8080/user/useremail/${userEmail}`);

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

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
    }

    return await response.json();
}

async function userGetAll(){
 
  const response= await fetch(`http://localhost:8080/user/getall`);

     return await response.json();
     
}
async function userDelete(userId){
 
  const response= await fetch(`http://localhost:8080/user/delete/${userId}`,{
    method:"DELETE"
     });

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

     return await response.json();
     
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
