import React from "react";

function Loginform(){
 
   function handleChange(e){
    e.preventDefault();
    
   }

    return(
     <form onSubmit={handleChange}>
    
            UserName/Email:
            <input type="Email"
                   name="identifier"
                   />
            Password:
            <input type="password" 
                   name="passWord"
                   />
        <input type="submit" name="submit"/>
        
     </form>
    );
}   

export default Loginform;