import React, {Component} from 'react'
import '../CSS/App.css'
import Comment from "./Comment"

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

class Threads extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isLoaded: false,
      comment: [],
      titles_submissions:[],
      userUpvoted: [],
      status: 200,
      error: "",
      message: "",
      isLoaded2: false,
      status2: 200,
      error2: "",
      message2: "",
    }
  }
  componentDidMount() {
    var url = new URL(window.location.href)
    let id = url.searchParams.get("id")
    fetch('https://serene-ridge-36448.herokuapp.com/API/v1.0/users/'+id+'/comments')
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
          items: json.comments,
          titles_submissions: json.titles_submissions,
          status: json.status,
          error: json.error,
          message: json.message,
        })
        return json
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
    fetch('https://serene-ridge-36448.herokuapp.com/API/v1.0/users/upvotedComments/', requestOpt)
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
      
          json.comments.map((comment) => (
              temp.push(comment.id)
          ))
          this.setState({
              isLoaded2: true,
              userUpvoted: temp,
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
    var{ isLoaded, isLoaded2} = this.state

    if (!isLoaded || !isLoaded2) {
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
                      <tbody>
                        {this.state.items.map(item => (    
                          <tr key={item.id}>
                            <td key={item.id}>
                              <Comment key={item.id} 
                              comment={item} 
                              userUpvoted={this.state.userUpvoted.find(data => data === item.id)} />
                            </td>
                          </tr>                   
                          ))}
                      </tbody>
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
export default Threads;