import {useNavigate} from "react-router-dom"
import {login} from "../Service/UserService"
import { useState } from "react";
function Loginform(){

   const navigate=useNavigate();

   const [loading, setLoading] = useState(false);
   const [loadError,setloadError]=useState("");

   const [identifier,setidentifier]=useState("");
   const [password,setpassword]=useState("");

   async function handleSubmit(e){

         e.preventDefault();
        setLoading(true);
        try{

              const user=await login({
               identifier,
               password
               });
              
               localStorage.setItem("user",JSON.stringify(user));
              navigate("/dashboard",{replace:true});

        }catch (error){
         
         setloadError(error.message);

         }finally{
         setLoading(false);
         }
   }


    return(
     <form onSubmit={handleSubmit}>
            <p>{loadError}</p>
            UserNameOrEmail:
            <input type="text"
                   name="identifier"
                   value={identifier}
                   required
                   onChange={(e)=>{setidentifier(e.target.value);setLoginError("");}}
                   />

            Password:
            <input type="password" 
                   name="password"
                   value={password}
                   required
                   onChange={(e)=>{setpassword(e.target.value)}}
                   />

        <input type="submit" name="submit" value={loading?"loading":"login"} disabled={loading}/>

        <button type="button" onClick={()=>navigate("/register") }>Don't have account?</button>
        
     </form>
    );
}   

export default Loginform;