import React, {Component} from 'react';
import '../CSS/App.css';
import '../CSS/ListSubmissions.css';
import SubmissionInList from '../Submissions/SubmissionInList';


import { Routes, Route, useNavigate} from "react-router-dom";


class Ask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isLoaded: false,
      isLoadedC: false,
      voted: []
    }
  }

  componentDidMount() {
    fetch('https://serene-ridge-36448.herokuapp.com/API/v1.0/submissions/ask')
      .then(res => res.json())
      .then(json => {
        this.setState({
          isLoaded: true,
          items: json.submissions,
        })
      })
      const requestOptions = {
        method: 'GET',
        headers: { 'x-api-key': process.env.REACT_APP_API_KEY },
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
    var{ isLoaded, items, isLoadedC} = this.state
    var cont = 0
    if (!isLoaded && !isLoadedC) {
      return <div>Loading....</div>
    }else {
      return (
        <div className="App">
          <ul>
            {items.map(item => (
              <li key={item.id}>
                <table>
                <SubmissionInList 
                    submission=  {item}
                    shorturl= ""
                    cont = {cont=cont+1}
                    userUpvoted ={this.state.voted.find(data => data.id === item.id)}
                  />
                </table>
              </li>
            ))}
          </ul>
        </div>
      );
    }
  }
}
export default Ask;