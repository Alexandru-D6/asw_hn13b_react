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
      userUpvoted: [],
    }
  }
  componentDidMount() {
    fetch('https://serene-ridge-36448.herokuapp.com/API/v1.0/user/'+'ElectrikeOfficial'+'/comments')
      .then(res => res.json())
      .then(json => {
        this.setState({
          isLoaded: true,
          items: json.thread,
        })
      })
  }

  render() {
    var{ isLoaded} = this.state

    if (!isLoaded) {
    return <div>Loading....</div>
    }else {
        return ( //html
            <div className="Threads" align="center">
                
                <DisplayErrorsNoTable status={this.state.status} error={this.state.error} message={this.state.message}/>

                <table width={"85%"}>                        
                    <Comment 
                    comment={this.state.comment} 
                    userUpvoted={this.state.userUpvoted.find(data => data === this.state.comment.id)} 
                    />
                </table>

            </div>
        );
    }
    
}
}
export default Threads;