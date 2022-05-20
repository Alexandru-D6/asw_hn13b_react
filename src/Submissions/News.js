import React, {Component} from 'react';
import '../CSS/App.css';

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
    }
  }

  componentDidMount() {
    fetch('https://serene-ridge-36448.herokuapp.com/API/v1.0/submissions/news')
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

    if (!isLoaded) {
      return <div>Loading....</div>
    }else {
      return (
        <div className="App">
          <table>
            <tbody>
              {items.map(item => (
                  <tr key={item.id}>
                    <td>{item.title}</td>
                    <td>{item.author_username}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      );
    }
    
  }
}
export default News;
