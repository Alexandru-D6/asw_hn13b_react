import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

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
export default App;