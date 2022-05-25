import React, {Component} from 'react';
import '../CSS/App.css';
import '../CSS/ListSubmissions.css';
import moment from 'moment';

class SubmissionInList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            submission: props.submission,
            cont: props.cont,
            shorturl: props.shorturl,
            userUpvoted: props.userUpvoted, 
        };

        this.handleUpVote = this.handleUpVote.bind(this);
        this.handleUnVote = this.handleUnVote.bind(this);
    
    }

    handleUpVote(event) {
        event.preventDefault();
        const requestOpt = {
            method: 'PUT',
            headers: {
                'X-API-KEY': process.env.REACT_APP_API_KEY,
                'accept': 'application/json',
                'Content-Type': 'application/json'
            },
        }
        fetch("https://serene-ridge-36448.herokuapp.com/API/v1.0/submissions/" + this.state.submission.id + "/upvote", requestOpt)
          .then(res => {
            if (!res.ok) {
              res.json().then(a => {
                this.setState({
                  status: a.status,
                  error: a.error,
                  message: a.message,
                })
                 
              }).catch(error => {console.log(error)})
              throw Error(res.status + " --> " + res.statusText)
            }else return res.json()
          })
          .then(json => {
            this.setState({userUpvoted: true})
            this.render()
          })
          .catch(function(error) {
            console.log(error)
          })
    }

    handleUnVote(event) {
        event.preventDefault();
        const requestOpt = {
            method: 'PUT',
            headers: {
                'X-API-KEY': process.env.REACT_APP_API_KEY,
                'accept': 'application/json',
                'Content-Type': 'application/json'
            },
        }
        fetch("https://serene-ridge-36448.herokuapp.com/API/v1.0/submissions/" + this.state.submission.id + "/unvote", requestOpt)
          .then(res => {
            if (!res.ok) {
              res.json().then(a => {
                this.setState({
                  status: a.status,
                  error: a.error,
                  message: a.message,
                })
                 
              }).catch(error => {console.log(error)})
              throw Error(res.status + " --> " + res.statusText)
            }else return res.json()
          })
          .then(json => {
            this.setState({userUpvoted: false})
          })
          .catch(function(error) {
            console.log(error)
          })
    }

    componentDidMount() {
        this.setState({isLoaded: true})
    }

    render() {
        if (!this.state.isLoaded) return
        return (
          <tbody>
          <tr>
            <td>
              <span>&nbsp;</span>
            </td>
          </tr>
          <tr className="athing" id ={this.state.submission.id}>
    
            <td align="right"  className="title">
              <span className="rank">{this.state.cont}.</span>
            </td>   
    
            <td valign="bottom" className="votelinks"> 
              {process.env.REACT_APP_API_KEY_NAME === this.state.submission.author_username  ? 
                <font color="#ff6600"> {"*"} </font>
                :
                this.state.userUpvoted?
                <a>{'\u00A0'} </a>
                :
                <a className="votebutton" onClick={this.handleUpVote}>▲ </a>
              }
                  
            </td>
    
            <td className="title">
              <a href={(this.state.submission.url=== ""? "/item?id="+this.state.submission.id:this.state.submission.url)} className="title">{this.state.submission.title}</a>
              <span className="sitebit comhead">
                {" "}
                <a className="sublink" href={this.state.shorturl}>
                  {(this.state.shorturl !== "")?"("+this.state.shorturl+")":"" }
                </a>
              </span>
            </td>
    
          </tr>
          <tr>
            <td colSpan="2"></td>
            <td className="subtext">
              <span>{this.state.submission.UpVotes}</span>{" by "}
              <a className="subtext" href={"/item?id="+this.state.submission.id}>{this.state.submission.author_username}</a>
              <span title={this.state.submission.created_at}>
                {" "}
                <a className="subtext" href={"/item?id="+this.state.submission.id}>{moment.utc(this.state.submission.created_at).local().startOf('seconds').fromNow()}</a>
              </span> 
              <span id=""></span>{" | "}  
              {process.env.REACT_APP_API_KEY_NAME === this.state.submission.author_username? 
              <span>
                <a className="subtext" href={"/submission/edit?id="+this.state.submission.id}>edit</a>{" | "}
                <a className="subtext" href={"/submission/delete?id="+this.state.submission.id}>delete</a>{" | "}
              </span>
              :
              this.state.userUpvoted?
                <span><a className="subtext" onClick={this.handleUnVote}>unvote</a>{" | "}</span>
              :
              <a className="subtext">{""}</a>
              }
              <a className="subtext" href={"/item?id="+this.state.submission.id}>comments</a>
            </td>
    
          </tr>
          
        </tbody>
        )
    }
}
export default SubmissionInList;