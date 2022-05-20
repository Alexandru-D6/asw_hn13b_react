import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

import { Routes, Route, useNavigate} from "react-router-dom";

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
          items: [],
          isLoaded: false,
        }
    }
    componentDidMount() {
        const requestOptions = {
            method: 'GET',
            headers: {'name': 'ElectrickeOfficial'}
        }
        fetch('https://serene-ridge-36448.herokuapp.com/API/v1.0/user/'+'ElectrikeOfficial', requestOptions)
          .then(res => res.json())
          .then(json => {
            this.setState({
              isLoaded: true,
              items: json.user,
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
export default Profile;