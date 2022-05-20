import React from "react";
import logo from '../logo.svg';

const Navbar = () => {
  return (
    <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            {'\u00A0'+'\u00A0'+'\u00A0'+'\u00A0'+'\u00A0'+'\u00A0'+'\u00A0'+'\u00A0'}
            <a className="navbar-brand" href="/news">
                Hacker News
            </a>

            <div className="collapse navbar-collapse" id="navbarNavDropdown">
                <ul className="navbar-nav">
                    <li className="nav-item active">
                        <a className="nav-link" href="/newest">New</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/threads">Comments</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/submit">Submit</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/ask">Ask</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/item?id=2">Item 2</a>
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