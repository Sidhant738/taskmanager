import {useNavigate} from "react-router-dom"

function Home(){
 
   const navigate=useNavigate();
    
   
    return(
      <div  className="home-page">
      <button onClick={()=>navigate("/register")}>register</button>
      <button onClick={()=>navigate("/login")}>login</button>
      </div>
    );
}   

export default Home;