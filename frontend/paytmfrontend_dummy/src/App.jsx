import './App.css'
import './index.css';
import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
} from  "react-router-dom"
import Signin from './pages/Signin'
import Signup from './pages/Signup';
import Home from './pages/Home';
import Dashboard from './pages/dashboard';
function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>
          <Route path="/" element={<Navigate to="/Signup"/>}> </Route>
          <Route path="/Signin" element={<Signin/>}> </Route>
          <Route path="/Signup" element={<Signup/>}> </Route>
          <Route path="/Home" element={<Home/>}></Route>
          <Route path="/Dashboard" element={<Dashboard/>}></Route>
    </Routes>
    
    </BrowserRouter>
    </>
  )
}

export default App
