import React from 'react';
import ReactDOM from 'react-dom/client';
import './CSS/index.css';
import reportWebVitals from './reportWebVitals';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Newest from "./Submissions/Newest"
import News from "./Submissions/News"

import Submit from "./Submissions/Submit"
import Item from "./Submissions/Item"

import "bootstrap/dist/css/bootstrap.min.css"
import Navbar from './Navigation/Navbar';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Navbar />
    <Router>
      <Routes>
        <Route path="/news" element={<News/>}/>
        <Route path="/newest" element={<Newest/>}/>
        <Route path="/submit" element={<Submit/>}/>
        <Route path="/item" element={<Item/>}/>
        <Route path="" element={<News/>}/>
      </Routes>
  </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
