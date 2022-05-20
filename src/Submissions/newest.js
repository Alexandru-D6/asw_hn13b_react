import React, {Component} from 'react';
import '../CSS/App.css';
import '../CSS/ListSubmissions.css';

import { Routes, Route, useNavigate} from "react-router-dom";

class Newest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isLoaded: false,
    }
  }

  componentDidMount() {
    fetch('https://serene-ridge-36448.herokuapp.com/API/v1.0/submissions/newest')
      .then(res => res.json())
      .then(json => {
        this.setState({
          isLoaded: true,
          items: json.submissions,
        })
      })
  }

  render() {

    var{ isLoaded, items} = this.state
    var cont = 0
    if (!isLoaded) {
      return <div>Loading....</div>
    }else {
      return (
        <div className="App">
          
          <ul>
          
            {items.map(item => (
              <table>
                <tr class="athing" id>
                  <td align="right" valign="top" class="title">
                    <span class="rank">{cont = cont + 1}.</span>
                  </td>   
      
                  <td valign="top" class="votelinks">
                    <center>
                    <font color="#ff6600">*</font>
                    {"▲"}
                    </center>
                  </td>
      
                  <td class="title">
                    <a href={item.url} class="titlelink">{item.title}</a>
                    <span class="sitebit comhead">
                      {item.url}
                      <a href={item.url}>
                        <span class="sitestr">{item.url}</span>
                      </a>
                    </span>
                  </td>
                </tr>
                <tr>
                  <td colspan="2"></td>
                  <td class="subtext">
                    <span class="score">{item.UpVotes}</span> by 
                    {item.author_username}
                    <span class="age" title={item.created_at}>
                      <a href={item.url}>ffffff ago</a>
                    </span> 
                    <span id="unv_30782735"></span> | 
                    {"edit"}
                    {"delete"}
                    {"unvote"}
                    {"comments"}
                  </td>
                </tr>
                <span>&nbsp;</span>
              </table>
            ))}
          </ul>
        </div>
      );
    }
    
  }
}
export default Newest;