import React, {Component} from 'react';

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

    return (<tr></tr>)
}

class Submission extends Component {
    constructor(props) {
        super(props);
        
    }

    render() {
        return (<h2> Aqui viene una submission </h2>)
    }
}

class Comment extends Comment {
    constructor(props) {
        super(props);
        this.state = {
            /*id: props.id,
            title: props.title,
            url: props.url,
            text: props.text,
            created_at: props.created_at,
            UpVotes: props.UpVotes,
            author_username: props.author_username,*/
            comment: props.comment,
            userUpvoted: props.userUpvoted,
        };
    
    }

    render() {
        return (
            <tr class="athing" id=<%=comment.id%>>
                <td valign="top" class="votelinks">
                    <center>
                    <% if user_signed_in? && current_user.name == comment.author%>
                        <font color="#ff6600">*</font>
                    <%else%>
                        <% if user_signed_in?  && (current_user.LikedComments.detect{|e| e.to_i == comment.id.to_i}.nil?)%>
                        <%= link_to "▲", upvote_comment_path(comment, url: url), method: :put%>
                        <%else%>
                        <%if !user_signed_in? %>
                            <%= link_to "▲", upvote_comment_path(comment, url: url), method: :put%>
                        <%end%>
                        <%end%>
                    <%end%>
                    
                    </center>
                </td>
                
                <td class="subtext">
                    <%= link_to comment.author, "/user?id="+comment.author, url: url%>
                    <span class="age" title=<%comment.created_at%>>
                    <%= link_to distance_of_time_in_words(comment.created_at, Time.new) + " ago", "/reply?id="+comment.id.to_s, url: url%>
                    </span> 
                    <span id=<%=comment.id.to_s%>></span> | 
                    
                    <% if comment.id_comment_father == 0 %>
                    <%= link_to "parent", "/item?id="+comment.id_submission.to_s, url: url%> |
                    <% else %>
                    <%= link_to "parent", "/reply?id="+comment.id_comment_father.to_s, url: url%> |
                    <% end %>
                    <% if user_signed_in? && comment.author == current_user.name %>
                    <%= link_to "edit", "/comments/"+comment.id.to_s+'/edit', url: url%> |
                    <%= link_to "delete", "/delete_comment?id="+comment.id.to_s, url: url%> |
                    <%end%>

                    <% if user_signed_in? && !(current_user.LikedComments.detect{|e| e.to_i == comment.id.to_i}.nil?) %>
                    <%= link_to "unvote", unvote_comment_path(comment, url: url), method: :put%> |
                    <%end%>
                    <%= link_to "context", "/item?id="+comment.id_submission.to_s, url: url%> |
                    <%= link_to title_submission, "/item?id="+comment.id_submission.to_s, url: url%> |
                    
                </td>
                </tr>
                <tr>
                <td></td>
                <td>
                    <span class="commtext c00">
                    <%=comment.comment%>
                    </span>
                </td>
                </tr>
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

        console.log(JSON.stringify({id_submission: id, comment: this.state.comment}))
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
                <div align="center" style={{backgroundColor: "#f6f6ef"}}>

                    <table id="hnmain" width="85%" bgcolor="#f6f6ef">
                        <tbody>
                            <DisplayErrors status={this.state.status} error={this.state.error} message={this.state.message}/>
                        </tbody>
                    </table>

                    <div>
                        <br></br>
                    </div>
                    
                    <div style={{backgroundColor: "#f6f6ef"}}>
                    <table id="hnmain" width="85%" bgcolor="#f6f6ef">
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
                </div>
            </form>
        );
    }
}

class Item extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoaded: true,
            submission: [],
            comments: [],
            status: 200,
            error: "",
            message: "",
        }
    }

    componentDidMount() {
        var url = new URL(window.location.href)
        let id = url.searchParams.get("id")

        fetch('https://serene-ridge-36448.herokuapp.com/API/v1.0/submission/' + id)
            .then(res => res.json())
            .then(json => {
                this.setState({
                    isLoaded: true,
                    submission: json.submission,
                    comments: json.comments,
                    status: json.status,
                    error: json.error,
                    message: json.message,
                })
            })
    }

    render() {
        var{ isLoaded, submission, comments} = this.state

        if (!isLoaded) {
        return <div>Loading....</div>
        }else {
        return ( //html
            <div className="Profile">
                <Submission/>
                <CommentForm/>
            </div>
        );
        }
        
    }
}
export default Item;