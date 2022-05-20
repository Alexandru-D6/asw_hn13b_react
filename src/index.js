import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Newest from "./Submissions/newest"
import News from "./Submissions/News"

import Testing from "./Users/Testing"

import "bootstrap/dist/css/bootstrap.min.css"
import Navbar from './Navigation/Navbar';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Navbar />
    <Router>
      <Routes>
        <Route path="/news" element={<News/>}/>
        <Route path="/newest/:id" element={<Newest/>}/>
        <Route path="/user" element={<Testing/>}/>
        <Route path="" element={<News/>}/>
      </Routes>
  </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
