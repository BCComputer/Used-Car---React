import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CarForm = () => {
  const [newCar, setNewCar] = useState({
    brand: "",
    model: "",
    color: "",
    registerNumber: "",
    year: "",
    price: "",
    owner: {
      id: '',
      firstName: '',
      lastName: ''
    }
  });
  const navigate = useNavigate();

  const handleOnchange = (updatedCar) => {
    setNewCar(updatedCar);
  };

  const createNewCar = async () => {
    let token = localStorage.getItem("token");
    await axios({
      method: "post", url: "http://localhost:5051/api/v1/car/createCar", data: { ...newCar }, headers: {
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
          <h2>Add Car Inventory</h2>
          <div className="form-group">
            <label>Brand:</label>
            <input type="text" id="brand" name="brand" value={newCar.brand} onChange={(e) => { handleOnchange({ ...newCar, brand: e.target.value }); }} required />
          </div>
          <div className="form-group">
            <label>Model:</label>
            <input type="text" id="model" name="model" value={newCar.model} onChange={(e) => { handleOnchange({ ...newCar, model: e.target.value }); }} required />
          </div>
          <div className="form-group">
            <label>Color:</label>
            <input type="text" id="color" name="color" value={newCar.color} onChange={(e) => { handleOnchange({ ...newCar, color: e.target.value }); }} required />
          </div>
          <div className="form-group">
            <label>Registration Number:</label>
            <input type="text" id="registration-number" name="registration-number" value={newCar.registerNumber} onChange={(e) => { handleOnchange({ ...newCar, registerNumber: e.target.value }); }} required />
          </div>
          <div className="form-group">
            <label>Year:</label>
            <input type="number" id="year" name="year" value={newCar.year} onChange={(e) => { handleOnchange({ ...newCar, year: e.target.value }); }} required />
          </div>
          <div className="form-group">
            <label>Price:</label>
            <input type="number" id="price" name="price" value={newCar.price} onChange={(e) => { handleOnchange({ ...newCar, price: e.target.value }); }} required />
          </div>
          <div className="form-group">
            <button type="submit" className="btn" onClick={() => { createNewCar() }}>Add Car</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CarForm;
