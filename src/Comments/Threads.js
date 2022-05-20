import React, {Component} from 'react';
import '../CSS/App.css';

import { Routes, Route, useNavigate} from "react-router-dom";

class Threads extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isLoaded: false,
    }
  }
  componentDidMount() {
    fetch('https://serene-ridge-36448.herokuapp.com/API/v1.0/user/'+'ElectrikeOfficial'+'/comments')
      .then(res => res.json())
      .then(json => {
        this.setState({
          isLoaded: true,
          items: json.thread,
        })
      })
  }

  render() {

    var{ isLoaded, items} = this.state

    if (!isLoaded) {
      return <div>Loading....</div>
    }else {
      return (
        <div className="App">
          
          <ul>
            {items.map(item => (
              <li key={item.id}>
                {item.title}
              </li>
            ))}
          </ul>
        </div>
      );
    }
    
  }
}
export default Threads;