import React, {Component} from 'react';
import "../CSS/Item.css"
import CommentForm from "../Comments/CommentForm"
import CommentTree from "../Comments/CommentTree"

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

class Submission extends Component {
    render() {
        return (<h2> Aqui viene una submission </h2>)
    }
}

class Item extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoaded1: false,
            isLoaded2: false,
            submission: {},
            comments: [],
            status: 200,
            error: "",
            message: "",
            upvotedComments: [],
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
    }

    render() {
        var{ isLoaded1, isLoaded2} = this.state

        if (!isLoaded1 && !isLoaded2) {
        return <div>Loading....</div>
        }else {
            console.log(window.location)
            return ( //html
                <div className="Profile" align="center">
                    
                    <DisplayErrorsNoTable status={this.state.status} error={this.state.error} message={this.state.message}/>

                    <Submission/>
                    <CommentForm/>

                    {this.state.comments.map((comment) => (
                        <CommentTree key={comment.created_at} paramKey={comment.created_at+1} userUpvoted={this.state.upvotedComments} comment={comment}/>
                    ))}

                </div>
            );
        }
        
    }
}
export default Item;