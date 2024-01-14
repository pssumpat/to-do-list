import React from 'react'
import {Link, useLocation, useNavigate} from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();
  const locPath = location.pathname;
  const navigate = useNavigate();

  const handleLogout = () =>{
    localStorage.removeItem("token");
    navigate("/login");
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <div className="container-fluid">
      <Link className="navbar-brand" to="/">TO DO APP</Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link className={`nav-link ${locPath==='/'?"Active":""}`} aria-current="page" to="/">Home</Link>
          </li>
          
        </ul>
        {!localStorage.getItem("token")?<form><Link className="btn btn-primary mx-1" to="/login" role="button">Login</Link>
        <Link className="btn btn-primary mx-1" to="/signup" role="button">Signup</Link></form>
        :<button className="btn btn-primary mx-1" onClick={handleLogout} role="button">Logout</button>}
      </div>
    </div>
  </nav>
  )
}
