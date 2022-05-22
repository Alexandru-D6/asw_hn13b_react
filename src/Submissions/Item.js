import React, {Component} from 'react';
import "../CSS/Item.css"
import CommentForm from "../Comments/CommentForm"
import CommentTree from "../Comments/CommentTree"
import Submission from "./Submission"

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

class Item extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoaded1: false,
            isLoaded2: false,
            isLoaded3: false,
            submission: {},
            comments: [],
            status: 200,
            error: "",
            message: "",
            upvotedComments: [],
            upvotedSubmissions: [],
        }
    }

    componentDidMount() {
        var url = new URL(window.location.href)
        let id = url.searchParams.get("id")

        fetch('https://serene-ridge-36448.herokuapp.com/API/v1.0/submission/' + id)
            .then(res => res.json())
            .then(json => {
                this.setState({
                    isLoaded1: true,
                    submission: json.submission,
                    comments: json.comments,
                    status: json.status,
                    error: json.error,
                    message: json.message,
                })
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
                    upvotedComments: temp,
                    status: json.status,
                    error: json.error,
                    message: json.message,
                })
            })
        
        fetch('https://serene-ridge-36448.herokuapp.com/API/v1.0/users/upvotedSubmissions/', requestOpt)
            .then(res => res.json())
            .then(json => {
                var temp = []
            
                json.submissions.map((submission) => (
                    temp.push(submission.id)
                ))
                this.setState({
                    isLoaded3: true,
                    upvotedSubmissions: temp,
                    status: json.status,
                    error: json.error,
                    message: json.message,
                })
            })
    }

    render() {
        var{ isLoaded1, isLoaded2, isLoaded3} = this.state

        if (!isLoaded1 || !isLoaded2 || !isLoaded3) {
        return <div>Loading....</div>
        }else {
            return ( //html
                <div className="Profile" align="center">
                    
                    <DisplayErrorsNoTable status={this.state.status} error={this.state.error} message={this.state.message}/>

                    <table width={"85%"}>
                        <Submission submission={this.state.submission} shorturl={""} cont={0} userUpvoted={this.state.upvotedSubmissions.find(data => data === this.state.submission.id)}/>
                    </table>
                    <CommentForm/>

                    {this.state.comments.map((comment) => (
                        <CommentTree key={comment.created_at} paramKey={comment.created_at+1} userUpvoted={this.state.upvotedComments} title_submission={this.state.submission.title} comment={comment}/>
                    ))}

                </div>
            );
        }
        
    }
}
export default Item;