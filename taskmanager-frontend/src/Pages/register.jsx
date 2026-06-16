import React from "react";

function RegisterForm(){
 
   function handleChange(e){
    e.preventDefault();
    
   }

    return(
     <form onSubmit={handleChange}>
    
            Name:
            <input type="Email"
                   name="userName"
                   />
            Email:
            <input type="Email"
                   name="userEmail"
                   />
            Password:
            <input type="password" 
                   name="passWord"
                   />
        <input type="submit" name="submit"/>
     </form>
    );
}   

export default RegisterForm;