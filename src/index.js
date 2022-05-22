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
import Ask from "./Submissions/Ask"
import SubmissionsEdit from "./Submissions/Edit"
import SubmissionsDelete from "./Submissions/Delete"

import SubmissionsUser from "./Users/SubmissionsUser"
import UpVotedSubmissionsUser from "./Users/UpVotedSubmissionsUser"


import Testing from "./Submissions/Testing"

import "bootstrap/dist/css/bootstrap.min.css"
import Navbar from './Navigation/Navbar';
import TimeAgo from 'javascript-time-ago'

import en from 'javascript-time-ago/locale/en.json'
import ru from 'javascript-time-ago/locale/ru.json'

TimeAgo.addDefaultLocale(en)
TimeAgo.addLocale(ru)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Navbar />
    <Router>
      <Routes>
        <Route path="/news" element={<News/>}/>
        <Route path="/newest" element={<Newest/>}/>
        <Route path="/ask" element={<Ask/>}/>
        <Route path="/user" element={<Testing/>}/>
        <Route path="/submission/edit" element={<SubmissionsEdit/>}/>
        <Route path="/submission/delete" element={<SubmissionsDelete/>}/>
        <Route path="/user/submissions" element={<SubmissionsUser/>}/>
        <Route path="/user/upvotedsubmissions" element={<UpVotedSubmissionsUser/>}/>
        <Route path="" element={<News/>}/>
      </Routes>
  </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
