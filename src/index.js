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
import Ask from "./Submissions/Ask"
import SubmissionsEdit from "./Submissions/Edit"
import SubmissionsDelete from "./Submissions/Delete"
import Item from "./Submissions/Item"

import Reply from "./Comments/Reply"
import CommentsEdit from "./Comments/Edit"
import CommentsDelete from "./Comments/Delete"
import Threads from "./Comments/Threads"

import Profile from "./Users/Profile"
import SubmissionsUser from "./Users/SubmissionsUser"
import UpVotedSubmissionsUser from "./Users/UpVotedSubmissionsUser"
import UpVotedCommentsUser from "./Users/UpVotedCommentsUser"

import "bootstrap/dist/css/bootstrap.min.css"
import Navbar from './Navigation/Navbar';
import Downbar from './Navigation/Downbar';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Navbar />
    <div style={{backgroundColor:"#f6f6ef"}}>
    <Router>
      <Routes>
        {/* Submissions */}
        <Route path="/news" element={<News/>}/>
        <Route path="/newest" element={<Newest/>}/>
        <Route path="/submit" element={<Submit/>}/>
        <Route path="/ask" element={<Ask/>}/>
        <Route path="/submission/edit" element={<SubmissionsEdit/>}/>
        <Route path="/submission/delete" element={<SubmissionsDelete/>}/>
        <Route path="/item" element={<Item/>}/>

        {/* Comments */}
        <Route path="/reply" element={<Reply/>}/>
        <Route path="/comments/edit" element={<CommentsEdit/>}/>
        <Route path="/comments/delete" element={<CommentsDelete/>}/>
        
        {/* user */}
        <Route path="/threads" element={<Threads/>}/>
        <Route path="/submitted" element={<SubmissionsUser/>}/>
        <Route path="/user/upvotedsubmissions" element={<UpVotedSubmissionsUser/>}/>
        <Route path="/user/upvotedcomments" element={<UpVotedCommentsUser/>}/>
        <Route path="/user" element={<Profile/>}/>

        {/* default */}
        <Route path="" element={<News/>}/>
      </Routes>
  </Router>
  <Downbar/>
  </div>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
