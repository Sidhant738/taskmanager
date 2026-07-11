import { use } from "react";
import { useNavigate } from "react-router-dom";

function Header({profile,setting,logout}) {

  const navigate=useNavigate();
    return (
        <header className="header">
          <div className="logo">logo</div>

          <div className="insideheader">
            
            <h2><b>Task Management</b></h2>
           
            <nav className="navbar">
            
                <button><b>Profile</b></button>
                <button><b>Setting</b></button>
                <button onClick={()=>{ 
                  logout();
                  navigate("/login");
                  }}><b>Logout</b></button>
            </nav>

          </div>
        </header>
    );
}

export default Header;