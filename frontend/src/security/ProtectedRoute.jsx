import { Navigate } from "react-router-dom";

export default function ProtectedRoute({children}){
   
   const user=localStorage.getItem("userToken");

   if(!user){
     return <Navigate to="/login" replace/>
   }
   return children;

}