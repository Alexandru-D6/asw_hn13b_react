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
    fetch('https://serene-ridge-36448.herokuapp.com/API/v1.0/user/'+'ElectrikeOfficial'+'/comments')
      .then(res => res.json())
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
    const requestOpt = {
      method: 'GET',
      headers: {
          'X-API-KEY': process.env.REACT_APP_API_KEY,
          'accept': 'application/json',
          'Content-Type': 'application/json'
      },
    }
    fetch('https://serene-ridge-36448.herokuapp.com/API/v1.0/users/upvotedComments/', requestOpt)
        .then(res => res.json())
        .then(json => {
            var temp = []
        
            json.comments.map((comment) => (
                temp.push(comment.id)
            ))
            this.setState({
                isLoaded2: true,
                userUpvoted: temp,
                status2: json.status,
                error2: json.error,
                message2: json.message,
            })
        })
  }

  render() {
    var{ isLoaded} = this.state

    if (!isLoaded || !this.state.isLoaded2) {
    return <div>Loading....</div>
    }else {
        return ( //html
            <div className="Threads" align="center">
                
                <DisplayErrorsNoTable status={this.state.status} error={this.state.error} message={this.state.message}/>
                
                <table width={"85%"}> 
                {this.state.items.map(item => (                       
                    <Comment 
                    comment={item} 
                    userUpvoted={this.state.userUpvoted.find(data => data === item.id)} 
                    />
                  ))}
                </table>

            </div>
        );
    }    
  }
}
export default Threads;