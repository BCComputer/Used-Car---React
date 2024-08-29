import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import car from '../images/car.png';


export function Login({ onLogin }) {
  const [login, setLogin] = useState({
    userName: "",
    password: "",
  });


  const navigate = useNavigate();
  const handleOnChange = (updateLoginDetails) => {
    setLogin({ ...updateLoginDetails });
  };

  const loginEvent = async () => {
    console.log(login);
    try{
    let res = await axios({
      method: "post", url: "http://localhost:5051/api/v1/member/login",
      data: {
        "userName": login.userName,

        "password": login.password
      }
    });



    let { data } = await res;
    console.log(res);
    localStorage.setItem("token", JSON.stringify("Bearer " + data.token));
    onLogin();
  }catch(e){
    console.log( "Something went wrong" + e.message);
  }
    navigate("/cars")
  };

  return (

    <div className="main">
      <div className="image-container">{<img src={car} alt="Logo" className="carimage" />}</div>
      <div className="form-container">
        <div className="signup-form">

          <h3>Welcome to Used Car Application</h3>
          <div className="form-group">
            <label htmlFor="brand">User Name:</label>
            <input type="text" value={login.userName} onChange={(e) => { handleOnChange({ ...login, userName: e.target.value }); console.log(e.target.value) }} required />
          </div>
          <div className="form-group">
            <label htmlFor="model">Password:</label>
            <input type="text" value={login.email} onChange={(e) => { handleOnChange({ ...login, password: e.target.value }); console.log(e.target.value) }} required />
          </div>

          <div className="form-group">
            <button type="submit" className="btn" onClick={() => { loginEvent(); }}>Login</button>
          </div>
        </div>
      </div>
    </div>

  );
}
