import React, {Component} from 'react';
import '../CSS/App.css';
import '../CSS/ListSubmissions.css';
import SubmissionInList from '../Submissions/SubmissionInList';

function DisplayErrorsNoTable(props) {
  var status = props.status
  var error = props.error
  var message = props.message

  if (status !== 200 && status !== 201 && status !== 202 && status !== 203 && status !== undefined) {
      return(
          <span style={{color: "red"}}>{error + ": " + message}</span>
      )
  }
  return (<span></span>)
}

class SubmissionsUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      links: [],
      isLoaded: false,
      status: 200,
      error: "",
      message: "",
      status2: 200,
      error2: "",
      message2: "",
      upvoted: [],
    }
  }

  componentDidMount() {
    var url = new URL(window.location.href)
    let id = url.searchParams.get("id")
    fetch('https://serene-ridge-36448.herokuapp.com/API/v1.0/users/'+ id + '/submissions')
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
          links: json.short_url,
          status: json.status,
          error: json.error,
          message: json.message,
        })
      })
      .catch(function(error) {
        console.log(error)
      })


    const requestOpt = {
      method: 'GET',
      headers: {
          'X-API-KEY': process.env.REACT_APP_API_KEY,
          'accept': 'application/json',
          'Content-Type': 'application/json'
      },
    }
    fetch('https://serene-ridge-36448.herokuapp.com/API/v1.0/users/upvotedSubmissions/', requestOpt)
      .then(res => {
        if (!res.ok) {
          res.json().then(a => {
            this.setState({
              isLoaded2: true,
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
            isLoaded2: true,
            upvoted: temp,
            status: json.status,
            error: json.error,
            message: json.message,
        })
      })
      .catch(function(error) {
        console.log(error)
      })
  }

  render() {

    var{ isLoaded, items } = this.state
    var cont = 0
    if (!isLoaded) {
      return <div>Loading....</div>
    }else {
      return (
        <div className="App">
          {this.state.status !== 200 && this.state.status !== 201 && this.state.status !== 202 && this.state.status !== 203 && this.state.status !== undefined?
            <DisplayErrorsNoTable status={this.state.status} error={this.state.error} message={this.state.message}/>
            :
            <div>
                {(this.state.status2 !== 200 && this.state.status2 !== 201 && this.state.status2 !== 202 && this.state.status2 !== 203 && this.state.status2 !== undefined)?
                    <DisplayErrorsNoTable status={this.state.status} error={this.state.error} message={this.state.message}/>
                    :
                    <ul>
                        {items.map(item => (
                        <li key={item.id}>
                            <table>
                            <SubmissionInList 
                                submission =  {item}
                                shorturl= {this.state.links[cont]}
                                 cont = {cont=cont+1}
                                userUpvoted ={this.state.upvoted.find(data => data === item.id)}
                            />
                            </table>
                        </li>
                        ))}
                    </ul>
                }
            </div>
            }
            
        </div>
      );
    }
  }
}
export default SubmissionsUser;