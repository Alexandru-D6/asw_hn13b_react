import React, {Component} from 'react';
import '../CSS/App.css';
import '../CSS/ListSubmissions.css';
import SubmissionInList from '../Submissions/SubmissionInList';

class News extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isLoaded: false,
      links: [],
      isLoadedC: false,
      voted: [],
      status: 200,
      error: "",
      message: "",
    }

  }


  componentDidMount() {
    fetch('https://serene-ridge-36448.herokuapp.com/API/v1.0/submissions/news')
      .then(res => {
        if (!res.ok) {
          res.json().then(a => {
            this.setState({
              isLoaded: true,
              status: a.status,
              error: a.error,
              message: a.message,
            })
             
          }).catch(error => {console.log(error)})
          throw Error(res.status + " --> " + res.statusText)
        }else return res.json()
      })
      .then(json => {
        this.setState({
          isLoaded: true,
          items: json.submissions,
          links: json.short_url
        })
      })
      .catch(function(error) {
        console.log(error)
      })


    const requestOptions = {
      method: 'GET',
      headers: { 'x-api-key': process.env.REACT_APP_API_KEY },
    };
    fetch('https://serene-ridge-36448.herokuapp.com/API/v1.0/users/upvotedSubmissions',requestOptions)
      .then(res => {
        if (!res.ok) {
          res.json().then(a => {
            this.setState({
              isLoadedC: true,
              status: a.status,
              error: a.error,
              message: a.message,
            })
             
          }).catch(error => {console.log(error)})
          throw Error(res.status + " --> " + res.statusText)
        }else return res.json()
      })
      .then(json => {
        var temp = []
    
        json.submissions.map((submission) => (
            temp.push(submission.id)
        ))
        this.setState({
          voted: temp,
          status: json.status,
          error: json.error,
          message: json.message,
          isLoadedC: true,
        })
      })
      .catch(function(error) {
        console.log(error)
      })
  }

  render() {
    var{ isLoaded, items, links, voted, isLoadedC} = this.state
    var cont = 0
    var nomauth = "ElectrikeOfficial"
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
                    shorturl= {links[cont]}
                    cont = {cont=cont+1}
                    userUpvoted ={this.state.voted.find(data => data === item.id)}
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
export default News;
