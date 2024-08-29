import axios from "axios";
import { useState } from "react";


import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const [register, setRegister] = useState({
    name: "",
    email: "",
    password: "",
    role: ""
  });
  const navigate = useNavigate();


  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setRegister((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const createMember = async (event) => {
    event.preventDefault();
try{
    let res = await axios.post("http://localhost:5051/api/v1/member/register", {
      name: register.name,
      email: register.email,
      password: register.password,
      role: register.role,
    });
    console.log(res);
  }catch(e){
    console.log("Something went wrong")
  }
    navigate("/login");

  };
  return (

    <div className="main" >
      <div className="form-container">
        <form className="signup-form" onSubmit={createMember}>
          <h2>Register Member</h2>


          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              name="name"
              value={register.name}
              onChange={handleOnChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="text"
              name="email"
              value={register.email}
              onChange={handleOnChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="text"
              name="password"
              value={register.password}
              onChange={handleOnChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="role">Role:</label>
            <input
              type="text"
              name="role"
              value={register.role}
              onChange={handleOnChange}
              required
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn">Register</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
