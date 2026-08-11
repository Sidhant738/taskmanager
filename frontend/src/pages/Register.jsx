import { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom"
import { userName, userEmail } from "../services/UserService"
import { register } from "../services/AuthService"
import "../styles/page/register.css"
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
              const Token=await register({
               name,
               email,
               password
               });
            
               localStorage.setItem("userToken",Token);

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
<form className="register-form" onSubmit={handleSubmit}>

    <h1>Create Account</h1>

    <p className="error">{loadError}</p>

    <label>Name</label>

    <input
        type="text"
        name="userName"
        value={name}
        onChange={(e)=>{
            setname(e.target.value);
            setUserNameError("");
        }}
        required
    />

    <p className="field-error">{userNameError}</p>

    <label>Email</label>

    <input
        type="email"
        name="userEmail"
        value={email}
        onChange={(e)=>{
            setemail(e.target.value);
            setUserEmailError("");
        }}
        required
    />

    <p className="field-error">{userEmailError}</p>

    <label>Password</label>

    <input
        type="password"
        name="password"
        value={password}
        minLength={8}
        onChange={(e)=>setpassword(e.target.value)}
        required
    />

    <input
        className="register-submit"
        type="submit"
        value={loading ? "Creating Account..." : "Register"}
        disabled={loading}
    />

    <button
        className="login-link"
        type="button"
        onClick={()=>navigate("/login")}
    >
        Already have an account?
    </button>

</form>
    );
}   

export default RegisterForm;