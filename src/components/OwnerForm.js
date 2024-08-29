import React from 'react'
import { useState } from "react"
import axios from 'axios';
import { useNavigate} from "react-router-dom";



export const OwnerForm = () => {

    const [owner, setOwner] = useState({
        firstName: "",
        lastName: ""
      });
      const navigate = useNavigate();
    
      const handleOnchange = (updateOwner) => {
        setOwner(updateOwner);
      };
    
      const createOwner = async () => {
        let token = localStorage.getItem("token");
        console.log(token);
        //http://localhost:5051/api/v1/owner/updateOwner/2
        await axios({
          method: "put", url: "http://localhost:5051/api/v1/owner/update/", data: { ...owner }, headers: {
            'Content-Type': 'application/json',
            'Authorization': JSON.parse(token),
            'Access-Control-Allow-Origin': "http://localhost:3000",
          },
        });
    
        navigate("/cars");
    }
  return (
    <div className="main">
      <div className="form-container">
        <form className="signup-form">
          <h2>Add Owner</h2>
          <div className="form-group">
            <label>First Name:</label>
            <input type="text" id="firstName" name="firstName" value={owner.firstName} onChange={(e) => { handleOnchange({ ...owner, firstName: e.target.value }); }} required />
          </div>
          <div className="form-group">
            <label>LastName:</label>
            <input type="text" id="lastName" name="lastName" value={owner.lastName} onChange={(e) => { handleOnchange({ ...owner, lastName: e.target.value }); }} required />
          </div>
          <div className="form-group">
            <button type="submit" className="btn" onClick={() => { createOwner() }}>Add Owner</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OwnerForm;