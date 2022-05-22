import React, {Component} from 'react';
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

class Delete extends Component {

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
            status2: 200,
            error2: "",
            message2: "",

        }
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleDelete(event) {
        event.preventDefault();
        const requestOpt = {
            method: 'DELETE',
            headers: {
                'X-API-KEY': process.env.REACT_APP_API_KEY,
                'accept': 'application/json',
                'Content-Type': 'application/json'
            },
        }
        fetch("https://serene-ridge-36448.herokuapp.com/API/v1.0/submission/" + this.state.submission.id+"/delete", requestOpt)
        .then(res => res.json())
        .then(json => {
            window.location.replace(window.location.origin + "/news")
        })
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
                    status2: json.status,
                    error2: json.error,
                    message2: json.message,
                })
            })
    }

    render() {
        var{ isLoaded1, isLoaded2} = this.state
        if (!isLoaded1 && !isLoaded2) {
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
                                        <table width={"85%"}>
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <font className="title">Do you want this to be deleted?</font>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <button className="title" onClick={this.handleDelete} href={""}>Yes</button>
                                                        <span>{'\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0'}</span>
                                                        <button className="title" href={"/news"}>No</button>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </ul> 
                                    :
                                    <span>You can't delete this</span>
                                }
                            </div>
                    }
                        </div>
                        
                    }
                </div>
            );
        }
        
    }
}
export default Delete;