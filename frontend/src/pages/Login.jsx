import {useNavigate} from "react-router-dom"
import {login} from "../services/AuthService"
import { useState } from "react";
function LoginForm(){

   const navigate=useNavigate();

   const [loading, setLoading] = useState(false);
   const [loadError,setLoadError]=useState("");

   const [username,setIdentifier]=useState("");
   const [password,setPassword]=useState("");

   async function handleSubmit(e){

         e.preventDefault();
        setLoading(true);
        try{

              const token=await login({
               username,
               password
               });
              
               localStorage.setItem("userToken",token);
              navigate("/dashboard",{replace:true});

        }catch (error){
         
         setLoadError(error.message);

         }finally{
         setLoading(false);
         }
   }


    return(
     <form onSubmit={handleSubmit}>
            <p>{loadError}</p>
            UserName:
            <input type="text"
                   name="username"
                   value={username}
                   required
                   disabled={loading}
                   onChange={(e)=>{setIdentifier(e.target.value);
                                    setLoadError("");
                              }}
                   />

            Password:
            <input type="password" 
                   name="password"
                   value={password}
                   required
                   disabled={loading}
                   onChange={(e)=>{setPassword(e.target.value);
                                    setLoadError("");
                              }}
                   />

        <input type="submit" name="submit" value={loading?"Logging in ...":"Login"} disabled={loading}/>

        <button type="button" onClick={()=>navigate("/register") }>Don't have account?</button>
        
     </form>
    );
}   

export default LoginForm;