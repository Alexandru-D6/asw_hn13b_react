import React from "react";
import logo from '../logo.svg';
import '../CSS/LogoBar.css';

const Navbar = () => {
  return (
    <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <img className="imagelogo" src={logo} alt="Logo" />
            <a className="navbar-brand" href="/news">
                Hacker News
            </a>

            <div className="collapse navbar-collapse" id="navbarNavDropdown">
                <ul className="navbar-nav">
                    <li className="nav-item active">
                        <a className="nav-link" href="/newest">New</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href={"/threads?id="+process.env.REACT_APP_API_KEY_NAME}>Threads</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/submit">Submit</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/ask">Ask</a>
                    </li>
                </ul>
            </div>

            <div>
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <a className="nav-link" href={"/user?id=" + process.env.REACT_APP_API_KEY_NAME}>{process.env.REACT_APP_API_KEY_NAME}</a>
                    </li>
                </ul>
            </div>
        </nav>
    </div>
  )
}

export default Navbar;