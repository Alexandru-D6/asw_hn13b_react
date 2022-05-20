import React, {Component} from 'react';
import '../CSS/App.css';
import DisplaySubmissionInList from './Newest.js'

import { Routes, Route, useNavigate} from "react-router-dom";

function oneSubmissioninList(){
  return{

  }
}

class News extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isLoaded: false,
      links: []
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
  }

  render() {
    var{ isLoaded, items, links} = this.state
    var cont = 0
    var nomauth = "ElectrikeOfficial"
    if (!isLoaded) {
      return <div>Loading....</div>
    }else {
      return (
        <div className="App">
          <ul>
            {items.map(item => (
              <DisplaySubmissionInList item={item} author={nomauth} link = {links[cont]} cont={cont = cont + 1} />
            ))}
          </ul>
        </div>
      );
    }
  }
}
export default News;
