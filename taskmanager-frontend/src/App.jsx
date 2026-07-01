import { Routes,Route } from 'react-router-dom'
import Dashboard from './Pages/dashboard'
import Loginform from './Pages/login'
import RegisterForm from './Pages/register'
import Home from './Pages/home'
import './App.css'
import ProtectedRoute from './security/protectedRoute'

function App() {
  

  return (
   <Routes>
       <Route path="/" element={<Home/>}/>
       <Route path="/login" element={<Loginform/>}/>
       <Route path="/register" element={<RegisterForm/>}/>
       <Route path="/dashboard" 
              element={
                        <ProtectedRoute>
                         <Dashboard/>
                        </ProtectedRoute>
                        }/>
   </Routes>
  );
}

export default App
