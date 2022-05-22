import React, {Component} from 'react';
import moment from 'moment';

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
            <table width="85%">
                <tbody>
                    <tr id={this.state.comment.id}>
                        <td valign="top" className="votelinks">
                            <center>
                                {process.env.REACT_APP_API_KEY_NAME === this.state.comment.author ?
                                    <font color="#ff6600">{'\u00A0'}*{'\u00A0\u00A0'}</font> :
                                    !this.state.userUpvoted ? 
                                    <a color="#000000" onClick={this.handleUpVote} href="">▲</a> : //link to handle up vote!!
                                    <font color="#ff6600">{'\u00A0\u00A0\u00A0\u00A0'}</font>
                                }
                            </center>
                        </td>
                        
                        <td className="subtext">
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
                                    <a href={"/comments/edit?id="+this.state.comment.id}>edit</a>
                                    <span> | </span>
                                    <a href={"/comments/delete?id="+this.state.comment.id}>delete</a>
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
                </tbody>
            </table>
        )
    }
}
export default Comment;