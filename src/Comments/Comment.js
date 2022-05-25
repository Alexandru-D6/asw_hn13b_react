import React, {Component} from 'react';
import moment from 'moment';

import { Link } from 'react-router-dom';

class Comment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            comment: props.comment,
            userUpvoted: props.userUpvoted,
            title_submission: "",
            id_submission: props.comment.id_submission,
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
        fetch("https://serene-ridge-36448.herokuapp.com/API/v1.0/submissions/" + this.state.id_submission + "/comments/" + this.state.comment.id + "/upvote", requestOpt)
            .then(res => {
                if (!res.ok) {
                res.json().then(a => {
                    this.setState({
                    isLoaded: true,
                    status: a.status,
                    error: a.error,
                    message: a.message,
                    })
                     
                }).catch(error => {console.log(error)})
                throw Error(res.status + " --> " + res.statusText)
                }else return res.json()
            })
            .then(json => {
                if (json.status === 200)
                    this.setState({userUpvoted: true})
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
        fetch("https://serene-ridge-36448.herokuapp.com/API/v1.0/submissions/" + this.state.id_submission + "/comments/" + this.state.comment.id + "/unvote", requestOpt)
            .then(res => {
                if (!res.ok) {
                res.json().then(a => {
                    this.setState({
                    isLoaded: true,
                    status: a.status,
                    error: a.error,
                    message: a.message,
                    })
                     
                }).catch(error => {console.log(error)})
                throw Error(res.status + " --> " + res.statusText)
                }else return res.json()
            })
            .then(json => {
                if (json.status === 200)
                    this.setState({userUpvoted: false})
            })
            .catch(function(error) {
                console.log(error)
            })
    }

    componentDidMount() {

        fetch('https://serene-ridge-36448.herokuapp.com/API/v1.0/submissions/' + this.state.comment.id_submission)
            .then(res => {
                if (!res.ok) {
                res.json().then(a => {
                    this.setState({
                    isLoaded: true,
                    status: a.status,
                    error: a.error,
                    message: a.message,
                    })
                     
                }).catch(error => {console.log(error)})
                throw Error(res.status + " --> " + res.statusText)
                }else return res.json()
            })
            .then(json => {
                this.setState({
                    isLoaded: true,
                    title_submission: json.submission.title,
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
        if (!this.state.isLoaded) return
        return (
            <table>
                <tbody>
                    <tr id={this.state.comment.id}>
                        <td valign="top" className="votelinks" width="0.1%">
                            <center>
                                {process.env.REACT_APP_API_KEY_NAME === this.state.comment.author ?
                                    <font color="#ff6600">{'\u00A0'}*{'\u00A0\u00A0'}</font> :
                                    !this.state.userUpvoted ? 
                                    <a color="#000000" onClick={this.handleUpVote} href="">▲</a> : //link to handle up vote!!
                                    <font color="#ff6600">{'\u00A0\u00A0\u00A0\u00A0'}</font>
                                }
                            </center>
                        </td>
                        
                        <td className="subtext" width="100%">
                            <span><a href={"/user?id="+this.state.comment.author}>{this.state.comment.author}</a> </span>
                            <span className="age" >
                                <a href={"/reply?id="+this.state.comment.id}>{moment.utc(this.state.comment.created_at).local().startOf('seconds').fromNow()}</a> {/*falta pasarle la url*/}
                            </span> 
                            <span> | </span>
                            
                            {this.state.comment.id_comment_father === 0 ?
                                <a href={"/item?id="+this.state.comment.id_submission}>parent</a> : /*falta pasarle la url*/
                                <a href={"/reply?id="+this.state.comment.id_comment_father}>parent</a> /*falta pasarle la url*/
                            }

                            <span> | </span>
                            
                            {this.state.comment.author === process.env.REACT_APP_API_KEY_NAME &&
                                <span>
                                    <a href={"/comments/edit?id="+this.state.comment.id+"&id_submission="+this.state.comment.id_submission}>edit</a>
                                    <span> | </span>
                                    <a href={"/comments/delete?id="+this.state.comment.id+"&id_submission="+this.state.comment.id_submission}>delete</a>
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
                                <Link to={{ pathname: "/reply?id="+this.state.comment.id+"&id_submission="+this.state.comment.id_submission }}>reply</Link> {/*falta pasarle la url*/}
                            </span>
                        </td>
                    </tr>
                </tbody>
            </table>
        )
    }
}
export default Comment;