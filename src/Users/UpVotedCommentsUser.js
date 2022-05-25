import React, {Component} from 'react'
import '../CSS/App.css'
import Comment from "../Comments/Comment"

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

class UpVotedComments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isLoaded: false,
      comment: [],
      userUpvoted: [],
      status: 200,
      error: "",
      message: "",
    }
  }
  componentDidMount() {
    const requestOpt = {
      method: 'GET',
      headers: {
          'X-API-KEY': process.env.REACT_APP_API_KEY,
          'accept': 'application/json',
          'Content-Type': 'application/json'
      },
    }
    fetch('https://serene-ridge-36448.herokuapp.com/API/v1.0/users/upvotedComments/', requestOpt)
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
          var temp = []
      
          json.comments.map((comment) => (
              temp.push(comment.id)
          ))
          this.setState({
              isLoaded: true,
              items: json.comments,
              userUpvoted: true,
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
    var{ isLoaded} = this.state

    if (!isLoaded) {
    return <div>Loading....</div>
    }else {
        return ( //html
        <div>
          {(this.state.status !== 200 && this.state.status !== 201 && this.state.status !== 202 && this.state.status !== 203 && this.state.status !== undefined)?
              <DisplayErrorsNoTable status={this.state.status} error={this.state.error} message={this.state.message}/>
              :
              <div>
                  {(this.state.status2 !== 200 && this.state.status2 !== 201 && this.state.status2 !== 202 && this.state.status2 !== 203 && this.state.status2 !== undefined)?
                  <DisplayErrorsNoTable status={this.state.status} error={this.state.error} message={this.state.message}/>
                  :
                  <div className="Threads" align="center">      
                    <table width={"85%"}> 
                    {this.state.items.map(item => (                       
                        <Comment 
                        comment={item} 
                        userUpvoted={this.state.userUpvoted} 
                        />
                      ))}
                    </table>
                  </div>
                }
              </div>
            }
        </div>
            
        );
    }    
  }
}
export default UpVotedComments;