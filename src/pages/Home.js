import React from 'react'
import car from '../images/car.png';

 const Home = () => {
  return (

    <div className="main">
    <div class="image-container">{<img src= {car} alt="Logo" className="carimage"/>}
    </div>
    <div class="form-container">
        <h2>Welcome to Our Used Car Inventory!</h2>
        <p>Discover a diverse selection of high-quality used cars that cater to every taste and budget. Our inventory is meticulously curated to ensure that each vehicle meets our stringent standards for performance, safety, and reliability. Whether you're looking for a compact car for city driving, a spacious SUV for family adventures, or a sleek sedan for your daily commute, we have the perfect car for you. Each vehicle comes with a detailed history report, ensuring transparency and peace of mind in your purchase. Explore our collection and find your next car with confidence today.
        </p>
        </div>
    </div>
  )
}
export default Home;
