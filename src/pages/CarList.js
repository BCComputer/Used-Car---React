import React from 'react'
import { useEffect, useState } from "react"
import axios from 'axios';
import OwnerForm from '../components/OwnerForm';
import {Link} from 'react-router-dom'

export const CarList = () => {

  const [cars, setCars] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'asc' });
  const [scrollPercentage, setScrollPercentage] = useState([0]);
  const [isOwnerAvailable, setIsOwnerAvailable] = useState(false);


    const getCarsData = async () => {
    let token = localStorage.getItem("token");
    try {
      let res = await axios({
        method: "get", url: "http://localhost:5051/api/v1/car/list",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': JSON.parse(token),
          'Access-Control-Allow-Origin': "http://localhost:3000"
        },
      });

      let { data } = await res;
      if (data) {
        setCars(data);
      }
    } catch (error) {
      console.log("Error Message from " + error.errorMessage);
    }


  };


  useEffect(() => {
    getCarsData();
  }, []);

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedCars = [...cars].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  const deleteCar = async (carId) => {
    let token = localStorage.getItem("token");
    let url = "http://localhost:5051/api/v1/car/delete/" + carId;
    console.log(url)
    console.log(token)

    await axios.delete(url, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': JSON.parse(token),
        'Access-Control-Allow-Origin': "http://localhost:3000"
      },
    });
    console.log(cars)
    setCars(cars.filter(car => car.id !== carId));
  }
  function handleScrollPercentage() {
    console.log(document.body.scrollTop,
      document.documentElement.scrollTop,
      document.documentElement.scrollHeight,
      document.documentElement.clientHeight);

    const howMuchScrolld = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;

    setScrollPercentage((howMuchScrolld / height) * 100);

  }
  useEffect(() => {
    window.addEventListener('scroll', handleScrollPercentage);
    return () => {
      window.removeEventListener('scroll', () => { });
    }
  })

  const checkOwnerAvailability = (cars) => {
    return cars.owner != null;
  }
  useEffect(() => {
    setIsOwnerAvailable(checkOwnerAvailability(cars));
  }, [cars]);


  const myStyle = {
    width: `${scrollPercentage}%`
  };


  return (

    <div className="mainFromCarList">
      <div className="top-container">
        <div className="scroll-progress-tracking-container">
          <div className="current-progress-bar" style={myStyle}></div>
        </div>
      </div>

      <div className="car-table-container">
        <table className="car-table">
          <thead>
            <tr>
              <th onClick={() => handleSort('id')} className='sortId'>ID</th>
              <th >Brand</th>
              <th>Model</th>
              <th>Color</th>
              <th>Year</th>
              <th>Price</th>
              <th>Owner</th>
            </tr>
          </thead>
          <tbody>
            {sortedCars.map((car) => (
              <tr key={car?.id}>
                <td>{car?.id}</td>
                <td>{car?.brand}</td>
                <td>{car?.model}</td>
                <td>{car?.color}</td>
                <td>{car?.year}</td>
                <td>${car?.price}</td>
                <td>{car.owner? car.owner?.firstName + " "+ car.owner?.lastName: <Link to = {"/"+car.id+ "/owner/create"}>Add Owner</Link>}</td>
                <td className="bi-trash" onClick={() => deleteCar(car.id)}></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};


