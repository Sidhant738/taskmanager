import { Routes,Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import LoginForm from './pages/Login'
import RegisterForm from './pages/Register'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Settings from './pages/Settings'
import './styles/App.css'
import ProtectedRoute from './security/ProtectedRoute'

function App() {
  

  return (
   <Routes>
       <Route path="/" element={<Home/>}/>
       <Route path="/login" element={<LoginForm/>}/>
       <Route path="/register" element={<RegisterForm/>}/>
       <Route path="/dashboard" 
              element={<ProtectedRoute>
                            <Dashboard/>
                        </ProtectedRoute>
                        }/>
       <Route path="/profile"
              element={<ProtectedRoute>
                            <Profile/>
                        </ProtectedRoute>
                        }/>
       <Route path="/settings"
              element={<ProtectedRoute>
                            <Settings/>
                        </ProtectedRoute>
                        }/>
   </Routes>
  );
}

export default App
