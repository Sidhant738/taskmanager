import React from "react";
import "./component.css"
function Header() {
    return (
        <header className="header">
          <div className="logo">logo</div>

          <div className="insideheader">
            
            <h2><b>Task Management</b></h2>
           
            <nav className="navbar">
            
                <button><b>Home</b></button>
                <button><b>Profile</b></button>
                <button><b>Setting</b></button>
            </nav>

          </div>
        </header>
    );
}

export default Header;