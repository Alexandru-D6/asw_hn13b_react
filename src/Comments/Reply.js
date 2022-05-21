import React, {Component} from 'react';
import "../CSS/Item.css"
import ReplyForm from "../Comments/ReplyForm"
import Comment from "../Comments/Comment"

function DisplayErrorsNoTable(props) {
    var status = props.status
    var error = props.error
    var message = props.message

    console.log(status)
    if (status !== 200 && status !== 201 && status !== 202 && status !== 203 && status !== undefined) {
        return(
            <span style={{color: "red"}}>{error + ": " + message}</span>
        )
    }

    return (<span></span>)
}

class Reply extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoaded1: false,
            isLoaded2: false,
            title_submission: "",
            comment: {},
            status: 200,
            error: "",
            message: "",
            upvotedComments: [],

        }
    }

    componentDidMount() {
        var url = new URL(window.location.href)
        let id = url.searchParams.get("id")

        fetch('https://serene-ridge-36448.herokuapp.com/API/v1.0/comment/' + id)
            .then(res => res.json())
            .then(json => {
                this.setState({
                    isLoaded1: false,
                    comment: json.comment,
                    status: json.status,
                    error: json.error,
                    message: json.message,
                })
                return json
            }).then(json => {
                fetch('https://serene-ridge-36448.herokuapp.com/API/v1.0/submission/' + json.comment.id_submission)
                    .then(res => res.json())
                    .then(json => {
                        this.setState({
                            isLoaded1: true,
                            title_submission: json.submission.title,
                            status: json.status,
                            error: json.error,
                            message: json.message,
                        })
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
    }

    render() {
        var{ isLoaded1, isLoaded2} = this.state

        if (!isLoaded1 && !isLoaded2) {
        return <div>Loading....</div>
        }else {
            return ( //html
                <div className="Profile" align="center">
                    <br></br>
                    <DisplayErrorsNoTable status={this.state.status} error={this.state.error} message={this.state.message}/>

                    <Comment userUpvoted={this.state.upvotedComments.find(data => data === this.state.comment.id)} title_submission={this.state.title_submission} comment={this.state.comment}/>
                    
                    <ReplyForm originalSubmission={this.state.comment.id_submission}/>

                </div>
            );
        }
        
    }
}
export default Reply;