import React, {Component} from 'react';
import "../CSS/Item.css"

function DisplayErrors(props) {
    var status = props.status
    var error = props.error
    var message = props.message

    if (status !== 200 && status !== 201 && status !== 202 && status !== 203) {
        return(
            <tr>
                <td style={{color: "red"}}>{error + ": " + message}</td>
            </tr>
        )
    }

    return (<tr><td></td></tr>)
}

function DisplayErrorsNoTable(props) {
    var status = props.status
    var error = props.error
    var message = props.message

    if (status !== 200 && status !== 201 && status !== 202 && status !== 203) {
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

class Comment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            comment: props.comment,
            userUpvoted: props.userUpvoted,
            title_submission: props.title_submission
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
        fetch("https://serene-ridge-36448.herokuapp.com/API/v1.0/comment/" + this.state.comment.id + "/upvote", requestOpt)
        .then(res => res.json())
        .then(json => {
            window.location.reload()
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
        fetch("https://serene-ridge-36448.herokuapp.com/API/v1.0/comment/" + this.state.comment.id + "/unvote", requestOpt)
        .then(res => res.json())
        .then(json => {
            window.location.reload()
        })
    }

    componentDidMount() {
        this.setState({isLoaded: true})
    }

    render() {
        if (!this.state.isLoaded) return
        return (
            <table ><tbody>
            <tr className="athing" id={this.state.comment.id}>
                <td valign="top" className="votelinks">
                    <center>
                        {process.env.REACT_APP_API_KEY_NAME === this.state.comment.author ?
                            <font color="#ff6600">*</font> :
                            !this.state.userUpvoted ? 
                            <a color="#000000" onClick={this.handleUpVote} href="">▲</a> : //link to handle up vote!!
                            <font color="#ff6600">{'\u00A0\u00A0\u00A0'}</font>
                        }
                    </center>
                </td>
                
                <td className="subtext">
                    <span><a href={"/user?id="+this.state.comment.author}>{this.state.comment.author}</a> </span>
                    <span className="age" >
                        <a href={"/reply?id="+this.state.comment.id}>{this.state.comment.created_at + " ago"}</a> {/*falta pasarle la url*/}
                    </span> 
                    <span> | </span>
                    
                    {this.state.comment.id_comment_father === 0 ?
                        <a href={"/item?id="+this.state.comment.id_submission}>parent</a> : /*falta pasarle la url*/
                        <a href={"/reply?id="+this.state.comment.id_comment_father}>parent</a> /*falta pasarle la url*/
                    }

                    <span> | </span>
                    
                    {this.state.comment.author === process.env.REACT_APP_API_KEY_NAME &&
                        <span>
                            <a href={"/comments/"+this.state.comment.id+"/edit"}>edit</a>
                            <span> | </span>
                            <a href={"/delete_comments/"+this.state.comment.id}>delete</a>
                            <span> | </span>
                        </span>
                        
                    }

                    {this.state.userUpvoted &&
                        <span>
                            <a onClick={this.handleUnVote} href="">unvote</a> {/*falta pasarle la url*/}
                            <span> | </span>
                        </span>
                    }

                    <a href={"/item?id="+this.state.comment.id_submission}>{this.state.title_submission}</a> {/*falta pasarle la url*/}
                    <span> | </span>
                </td>
            </tr>
            <tr>
                <td></td>
                <td>
                    <span>
                        {this.state.comment.comment}
                    </span>
                </td>
            </tr>
            <tr>
                <td></td>
                <td>
                    <span>
                        <a href={"/reply?id="+this.state.comment.id}>reply</a> {/*falta pasarle la url*/}
                    </span>
                </td>
            </tr>
            </tbody></table>
        )
    }
}

class CommentTree extends Component {
    constructor(props) {
        super(props);
        this.state = {
            key: props.paramKey,
            isLoaded: false,
            comment: props.comment,
            userUpvoted: props.userUpvoted,
            title_submission: props.title_submission
        };
    
    }



    componentDidMount() {
        this.setState({isLoaded: true})
    }

    render() {
        if (!this.state.isLoaded) return
        return (
            <table width="85%">
                <tbody>
                    <tr>
                        <td>
                            <Comment userUpvoted={this.state.userUpvoted.find(data => data === this.state.comment.id)} title_submission={this.state.title_submission} comment={this.state.comment}/> {/*falta url*/}
                        </td>
                    </tr>

                    <tr>
                        <td>
                            <table>
                                <tbody>
                                    <tr>
                                        <td>{'\u00A0\u00A0\u00A0'}</td>
                                        <td>{'\u00A0\u00A0\u00A0'}</td>
                                        <td>{'\u00A0\u00A0\u00A0'}</td>
                                        <td >
                                            {this.state.comment.comments.map(subComment => (
                                                <CommentTree key={this.state.paramKey} paramKey={this.state.paramKey+1} userUpvoted={this.state.userUpvoted} title_submission={this.state.title_submission} comment={subComment}/>
                                            ))}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                </tbody>
            </table>
        )
    }
}

class CommentForm extends Component {
    constructor(props) {
      super(props);
      this.state = {
            comment: "",
            status: 200,
            error: "",
            message: "",
        };
  
      this.handleChangeOnComment = this.handleChangeOnComment.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChangeOnComment(event) {
        this.setState({comment: event.target.value});
    }

  
    handleSubmit(event) {
        event.preventDefault();

        var url = new URL(window.location.href)
        let id = url.searchParams.get("id")

        const requestOpt = {
            method: 'POST',
            headers: {
                'X-API-KEY': process.env.REACT_APP_API_KEY,
                'accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id_submission: id, comment: this.state.comment})
        }
        fetch("https://serene-ridge-36448.herokuapp.com/API/v1.0/comments", requestOpt)
        .then(res => res.json())
        .then(json => {
            this.setState({
                isLoaded: true,
                status: json.status,
                error: json.error,
                message: json.message
            })
            if (json.status === 200 || json.status === 201 || json.status === 202 || json.status === 203) {
                window.location.reload()
            }
        })
    }
  
    render() {
        return (
            <form onSubmit={this.handleSubmit}>

                <table id="hnmain" width="85%" >
                    <tbody>
                        <DisplayErrors status={this.state.status} error={this.state.error} message={this.state.message}/>
                    </tbody>
                </table>

                <div>
                    <br></br>
                </div>
                
                <div>
                <table id="hnmain" width="85%" >
                    <tbody>
                        
                        <tr>
                            <td></td>
                            <td><textarea type="text" value={this.state.comment} onChange={this.handleChangeOnComment} cols={70} rows={5}/></td>
                        </tr>
                        
                        <tr>
                            <td></td>
                            <td className="actions">
                                <input type="submit" value="Add Comment"/>
                            </td>
                        </tr>
                        
                        <tr><td><br></br></td></tr>
                    
                    </tbody>
                </table>
                </div>
            </form>
        );
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
            console.log(this.state.status)
            return ( //html
                <div className="Profile" align="center">
                    
                    <DisplayErrorsNoTable status={this.state.status} error={this.state.error} message={this.state.message}/>

                    <Submission/>
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