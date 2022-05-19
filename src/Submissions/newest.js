import React, {Component} from 'react';

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
    console.log(window.location);
    var{ isLoaded, items} = this.state

    if (!isLoaded) {
      return <div>Loading....</div>
    }else {
      return (
        <div className="newest">
          
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

export default Newest;