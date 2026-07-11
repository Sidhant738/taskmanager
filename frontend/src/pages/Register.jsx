import { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom"
import {userName,userEmail,userCreate} from "../services/UserService"
function RegisterForm(){
 
   const navigate=useNavigate();

   const[name,setname]=useState("");
   const[email,setemail]=useState("");
   const[password,setpassword]=useState("");
   
   const [loadError,setloadError]=useState("");

   const [userNameError, setUserNameError] = useState("");
   const [userEmailError, setUserEmailError] = useState("");
   
   const [loading,setloading]=useState(false);

   useEffect(()=>{
       if(name.trim()===""){
            setUserNameError("");
            return;
       }
      if (name.length < 3) {
        setUserNameError("Username must be at least 3 characters");
        return;
       }
       const timer=setTimeout(()=>{
            checkUserName(name);
       },1000);

       return ()=>{
            clearTimeout(timer);
       }
   },[name]);

   useEffect(()=>{
       if(email.trim()===""){
            setUserEmailError("");
            return;
       }

       const timer=setTimeout(()=>{
            checkUserEmail(email);
       },1000);

       return ()=>{
            clearTimeout(timer);
       }
   },[email]);


   async function handleSubmit(e){
    e.preventDefault();
          
       if(userNameError||userEmailError){
            return;
            }

       setloading(true);

        try{
              const user=await userCreate({
               name,
               email,
               password
               });
            
               localStorage.setItem("user",JSON.stringify(user));

               navigate("/dashboard",{replace:true});
        }catch (error){
       
         setloadError(error.message);

         }finally{
         setloading(false);
         }
   }

   async function checkUserName(name){
  
        try{
              const response=await userName(name);
              
              if(!response){
               setUserNameError("");      
              }else{
                setUserNameError("username already taken");
              }

        }catch (error){
          console.log(error.message);

         }
   }
  async function checkUserEmail(email){
  
        try{
              const response=await userEmail(email);

              if(!response){
               setUserEmailError("");      
              }else{
                setUserEmailError("email already taken");
              }

        }catch (error){
           console.log(error.message);
         }
   }

    return(
     <form onSubmit={handleSubmit}>
            <p>{loadError}</p>
            Name:
            <input type="text"
                   name="userName"
                   value={name}
                   onChange={(e)=>{
                     setname(e.target.value);
                    setUserNameError("");
                     }}
                     required
                   />
                   <p>{userNameError}</p>
            Email:
            <input type="email"
                   name="userEmail"
                   value={email}
                   onChange={(e)=>{
                     setemail(e.target.value);
                     setUserEmailError("");
                    }}
                    required
                   />
                   <p>{userEmailError}</p>
            Password:
            <input type="password" 
                   name="password"
                   value={password}
                   minLength={8}
                   onChange={(e)=>setpassword(e.target.value)}
                   required
                   />
        <input type="submit" name="submit" value={loading?"loading":"register"} disabled={loading}/>
        <button type="button" onClick={()=>navigate("/login")}>Already have a account?</button>
     </form>
    );
}   

export default RegisterForm;