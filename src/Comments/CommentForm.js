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

    return (<tr><td></td></tr>)
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
            body: JSON.stringify({comment: this.state.comment})
        }
        fetch("https://serene-ridge-36448.herokuapp.com/API/v1.0/submissions/" + id + "/comments", requestOpt)
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

export default CommentForm;