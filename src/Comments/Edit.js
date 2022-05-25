import React, {Component} from 'react';
import "../CSS/Item.css"
import EditForm from "./EditForm"
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

class Edit extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoaded1: false,
            isLoaded2: false,
            title_submission: "",
            id_submission: "",
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
        let id_submission_t = url.searchParams.get("id_submission")

        this.setState({id_submission: id_submission_t})

        fetch('https://serene-ridge-36448.herokuapp.com/API/v1.0/submissions/' + id_submission_t + '/comments/' + id)
            .then(res => {
                if (!res.ok) {
                res.json().then(a => {
                    this.setState({
                    isLoaded1: true,
                    status: a.status,
                    error: a.error,
                    message: a.message,
                    })
                    console.log(a)
                }).catch(error => {console.log(error)})
                throw Error(res.status + " --> " + res.statusText)
                }else return res.json()
            })
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
                fetch('https://serene-ridge-36448.herokuapp.com/API/v1.0/submissions/' + json.comment.id_submission)
                    .then(res => {
                        if (!res.ok) {
                        res.json().then(a => {
                            this.setState({
                            isLoaded1: true,
                            status: a.status,
                            error: a.error,
                            message: a.message,
                            })
                            console.log(a)
                        }).catch(error => {console.log(error)})
                        throw Error(res.status + " --> " + res.statusText)
                        }else return res.json()
                    })
                    .then(json => {
                        this.setState({
                            isLoaded1: true,
                            title_submission: json.submission.title,
                            status: json.status,
                            error: json.error,
                            message: json.message,
                        })
                    })
                    .catch(function(error) {
                        console.log(error)
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
                    console.log(a)
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
                    upvotedComments: temp,
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
        var{ isLoaded1, isLoaded2} = this.state

        if (!isLoaded1 || !isLoaded2) {
        return <div>Loading....</div>
        }else {
            return ( //html
                <div className="Profile" align="center">
                    <br></br>
                    <DisplayErrorsNoTable status={this.state.status} error={this.state.error} message={this.state.message}/>

                    <Comment userUpvoted={this.state.upvotedComments.find(data => data === this.state.comment.id)} title_submission={this.state.title_submission} comment={this.state.comment}/>
                    
                    <EditForm id_submission={this.state.comment.id_submission}/>

                </div>
            );
        }
        
    }
}
export default Edit;