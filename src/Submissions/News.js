import React, {Component} from 'react';
import '../CSS/App.css';
import '../CSS/ListSubmissions.css';
import moment from 'moment';

import { Routes, Route, useNavigate} from "react-router-dom";

function DisplaySubmissionInList(props){
  var cont = props.cont
  var nomauth = props.author
  var item = props.item
  var shorturl = props.link
  var voted = props.voted
  return(  
         
    <table>
      <span>&nbsp;</span>
      <tr class="athing" id>

        <td align="right"  class="title">
          <span class="rank">{cont}.</span>
        </td>   

        <td valign="bottom" class="votelinks"> 
          {(nomauth) === item.author_username  ? 
            <font color="#ff6600"> {"*"} </font>
            :
            isVoted(item.id, voted, item)?
            <a>{'\u00A0'} </a>
            :
            <a class="votebutton" href={"/edit"}>▲ </a>
          }
              
        </td>

        <td class="title">
          <a href={(item.url=== ""? "/item":item.url)} class="title">{item.title}</a>
          <span class="sitebit comhead">
            {" "}
            <a class="sublink" href={item.url}>
              {(shorturl !== "")?"("+shorturl+")":"" }
            </a>
          </span>
        </td>

      </tr>
      <tr>
        <td colspan="2"></td>
        <td class="subtext">
          <span>{item.UpVotes}</span>{" by "}
          <a class="subtext" href={"/item"}>{item.author_username}</a>
          <span title={item.created_at}>
            {" "}
            <a class="subtext" href={"/item"}>{moment.utc(item.created_at).local().startOf('seconds').fromNow()}</a>
          </span> 
          <span id=""></span>{" | "}  
          {(nomauth) === item.author_username? 
          <a>
            <a class="subtext" href={"/edit"}>edit</a>{" | "}
            <a class="subtext" href={"/delete"}>delete</a>{" | "}
          </a>
          :
          <a>
            <a class="subtext" href={"/unvote"}>unvote</a>{" | "}
          </a>
          }
          <a class="subtext" href={"/item"}>comments</a>
        </td>

      </tr>
      
    </table>
  )
}
function isVoted(id, voted, item){
  var bool = false
  console.log(id)
  console.log(voted.length)
  for(var i = 0; i < voted.length; i++){
    if(id === voted[i].id){
      bool = true
    }
  }
  return bool
  
}

class News extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isLoaded: false,
      links: [],
      isLoadedC: false,
      voted: []
    }
  }

  componentDidMount() {
    fetch('https://serene-ridge-36448.herokuapp.com/API/v1.0/submissions/news')
      .then(res => res.json())
      .then(json => {
        this.setState({
          isLoaded: true,
          items: json.submissions,
          links: json.short_url
        })
      })
      const requestOptions = {
        method: 'GET',
        headers: { 'x-api-key': '7075f288b27f27ba6bcfc755b9cc64fb20ad0bd4' },
    };
      fetch('https://serene-ridge-36448.herokuapp.com/API/v1.0/users/upvotedSubmissions',requestOptions)
      .then(res => res.json())
      .then(json => {
        this.setState({
          isLoadedC: true,
          voted: json.submissions
        })
      })
  }

  render() {
    var{ isLoaded, items, links, voted, isLoadedC } = this.state
    var cont = 0
    var nomauth = "Alvarorodri"
    if (!isLoaded && !isLoadedC) {
      return <div>Loading....</div>
    }else {
      return (
        <div className="App">
          <ul>
            {items.map(item => (
              <DisplaySubmissionInList item={item} author={nomauth} link = {links[cont]} cont={cont = cont + 1} voted={voted}/>
            ))}
          </ul>
        </div>
      );
    }
  }
}
export default News;
