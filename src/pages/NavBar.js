import React from 'react';
import {Link, Route, Routes} from  "react-router-dom"
import Home from './Home';
import { Logout } from './Logout';
import { Register } from './Register';
import { AddCar } from './AddCar';
import { Login } from './Login';
import logo from '../images/logo.png';
import { CarList } from './CarList';
import { useEffect, useState } from "react";
import OwnerForm from '../components/OwnerForm';


const NavBar = () => {

  const [loginstate, setLoginState ] = useState(false);
  
  useEffect(()=>{
    let token = localStorage.getItem("token");
    const someArrayLength = token ? token.length : 0;
    if(someArrayLength> 0){
      setLoginState(true)
    }else{
      setLoginState(false)
    }
  },[])

  
  return (
    <div>
    <nav className="navbar">
      <div className="navbar-left">
        <Link className="navbar-logo" to="/">{<img src= {logo} alt="Logo" className="logo"/>}</Link>
        <Link className="navbar-item" to="/" >HOME</Link>
        {loginstate && <Link className="navbar-item" to="/cars" >CAR LIST</Link>}
        {loginstate && <Link className="navbar-item" to="/add" >ADD CAR</Link>}
      </div>
      <div className="navbar-right">
      { loginstate  ? <Link to="/login" className="navbar-item" onClick={()=>{
            localStorage.setItem("token", "");
            setLoginState(false);
          }} >LOGOUT</Link> : <Link to="/login" className="navbar-item">LOGIN</Link>}

        {<Link className="navbar-item" to="/register" >REGISTER</Link>}
        {/* {<Link className="navbar-item" to="/create" >Add Owner</Link>} */}
      </div>
    </nav>
  
    <Routes>
        <Route path = "/" element = {<Home/>}/>
        <Route path = "/cars" element = {<CarList/>}></Route>
        <Route path = "/add" element = {<AddCar/>}></Route>
        <Route path = ":id/owner/create" element = {<OwnerForm/>}></Route>
        <Route path="/login" element={<Login onLogin={()=>{setLoginState(true)}}/>} />
        <Route path = "/logout" element = {<Logout/>}></Route>
        <Route path = "/register" element = {<Register/>}></Route>
    </Routes>

</div>
  );
};

export default NavBar;
