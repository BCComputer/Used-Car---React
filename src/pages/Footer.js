import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {

  return (
    
    <div className="footer">
    <div className="container">
      <p>&copy; 2024 Used Car Management System. All rights reserved.</p>
      <div className="social-links">
        <Link className="social-link" to="https://facebook.com">Facebook | </Link>
        <Link className="social-link" to="https://twitter.com">Twitter | </Link>
        <Link className="social-link" to="https://linkedin.com">LinkedIn</Link>
      </div>
    </div>
  </div>

  )
}
export default Footer;
