import React, {Component} from 'react';
import EditForm from "../Submissions/EditForm"
import Submission from "../Submissions/Submission"

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

class Edit extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoaded1: false,
            isLoaded2: false,
            submission: {},
            status: 200,
            error: "",
            message: "",
            upvoted: [],

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
        fetch('https://serene-ridge-36448.herokuapp.com/API/v1.0/users/upvotedSubmissions/', requestOpt)
            .then(res => res.json())
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
    }

    render() {
        var{ isLoaded1, isLoaded2} = this.state

        if (!isLoaded1 && !isLoaded2) {
        return <div><DisplayErrorsNoTable status={this.state.status} error={this.state.error} message={this.state.message}/>Loading....</div>
        }else {
            return ( //html
                <div>
                    {this.state.submission.author_username===process.env.REACT_APP_API_KEY_NAME?
                    <ul>
                        <table>
                        <Submission 
                        submission=  {this.state.submission}
                        shorturl= ""
                        cont = {0}
                        userUpvoted ={this.state.upvoted.find(data => data === this.state.submission.id)}
                        />
                        </table>
                    
                    <EditForm originalSubmission={this.state.submission}/>
                    </ul> 
                    :
                    <span>You can't edit this</span>
                    }
                    
                </div>
            );
        }
        
    }
}
export default Edit;