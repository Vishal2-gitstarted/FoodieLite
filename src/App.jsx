
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
 import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
 import 'bootstrap/dist/css/bootstrap.min.css'; 
 import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Navbar from './component/Navbar'
import Register from './pages/Register'
import Home from './pages/Home'
import Login from './pages/Login'
import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import ContextUse from './component/ContextUse';
import MyOrder from './pages/MyOrder';


function App() {


  return (
    <>
     <ContextUse>
     <BrowserRouter>
     <Navbar/>
     
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/myorder' element={<MyOrder/>}/>
      </Routes>
      
     </BrowserRouter>
     <ToastContainer/>
     </ContextUse>
    </>
  )
}

export default App
