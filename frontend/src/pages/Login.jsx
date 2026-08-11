import {useNavigate} from "react-router-dom"
import "../styles/page/login.css";
import {login} from "../services/AuthService"
import { useState } from "react";
function LoginForm(){

   const navigate=useNavigate();

   const [loading, setLoading] = useState(false);
   const [loadError,setLoadError]=useState("");
   const [loginMode, setLoginMode] = useState("username");

   const [identifier,setIdentifier]=useState("");
   const [password,setPassword]=useState("");

   async function handleSubmit(e){

         e.preventDefault();
        setLoading(true);
        try{

              const token=await login({
               username: identifier,
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
 <form className="login-form" onSubmit={handleSubmit}>

    <h1>Login</h1>

    <p className="error">{loadError}</p>

    <div className="login-mode">
        <label>
            <input
                type="radio"
                name="loginMode"
                value="username"
                checked={loginMode === "username"}
                onChange={() => setLoginMode("username")}
            />
            Username
        </label>
        <label>
            <input
                type="radio"
                name="loginMode"
                value="email"
                checked={loginMode === "email"}
                onChange={() => setLoginMode("email")}
            />
            Email
        </label>
    </div>

    <label>{loginMode === "username" ? "Username" : "Email"}</label>
    <input
        type="text"
        name="identifier"
        placeholder={loginMode === "username" ? "Enter your username" : "Enter your email"}
        value={identifier}
        required
        disabled={loading}
        onChange={(e)=>{
            setIdentifier(e.target.value);
            setLoadError("");
        }}
    />

    <label>Password</label>
    <input
        type="password"
        name="password"
        value={password}
        required
        disabled={loading}
        onChange={(e)=>{
            setPassword(e.target.value);
            setLoadError("");
        }}
    />

    <input
        className="login-btn"
        type="submit"
        value={loading ? "Logging in..." : "Login"}
        disabled={loading}
    />

    <button
        className="register-btn"
        type="button"
        onClick={()=>navigate("/register")}
    >
        Don't have an account?
    </button>

</form>
    );
}   

export default LoginForm;