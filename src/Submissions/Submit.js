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

class AboutForm extends Component {
    constructor(props) {
      super(props);
      this.state = {
            author_username: process.env.REACT_APP_API_KEY_NAME,
            title: "",
            url: "",
            text: "",
            status: 200,
            error: "",
            message: "",
        };
  
      this.handleChangeOnTitle = this.handleChangeOnTitle.bind(this);
      this.handleChangeOnUrl = this.handleChangeOnUrl.bind(this);
      this.handleChangeOnText = this.handleChangeOnText.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChangeOnTitle(event) {
        this.setState({title: event.target.value});
    }

    handleChangeOnUrl(event) {
        this.setState({url: event.target.value});
    }

    handleChangeOnText(event) {
        this.setState({text: event.target.value});
    }

  
    handleSubmit(event) {
        event.preventDefault();
        const requestOpt = {
            method: 'POST',
            headers: {
                'X-API-KEY': process.env.REACT_APP_API_KEY,
                'accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({title: this.state.title, text: this.state.text, url: this.state.url})
        }
        fetch("https://serene-ridge-36448.herokuapp.com/API/v1.0/submissions", requestOpt)
        .then(res => res.json())
        .then(json => {
            this.setState({
                isLoaded: true,
                status: json.status,
                error: json.error,
                message: json.message
            })
            if (json.status === 200 || json.status === 201 || json.status === 202 || json.status === 203) {
                window.location.replace(window.location.origin + "/News")
            }
        })
    }
  
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div align="center">

                    <table id="hnmain" width="85%">
                        <tbody>
                            <DisplayErrors status={this.state.status} error={this.state.error} message={this.state.message}/>
                        </tbody>
                    </table>

                    <div>
                        <br></br>
                    </div>
                    
                    <div>
                    <table id="hnmain" width="85%">
                        <tbody>
                            
                            <tr>
                                <td>title</td>
                                <td><textarea type="text" value={this.state.title} onChange={this.handleChangeOnTitle} cols={70} rows={1}/></td>
                            </tr>
                            
                            <tr>
                                <td>url</td>
                                <td><textarea type="text" value={this.state.url} onChange={this.handleChangeOnUrl} cols={70} rows={1}/></td>
                            </tr>
                            
                            <tr>
                            <td></td>
                            <td><b>or</b></td>
                            </tr>
                            
                            <tr>
                                <td>text</td>
                                <td><textarea type="text" value={this.state.text} onChange={this.handleChangeOnText} cols={70} rows={5}/></td>
                            </tr>
                            
                            <tr>
                                <td></td>
                                <td className="actions">
                                    <input type="submit" value="Submit" />
                                </td>
                            </tr>
                            
                            <tr><td><br></br></td></tr>
                            
                            <tr>
                            <td></td>
                            <td>Leave url blank to submit a question for discussion. If there is no url, the text (if any) will appear at the top of the thread.</td>
                            </tr>
                            
                            <tr>
                            <td></td>
                            <td>You can also submit via <a href='/enlace'>bookmarklet</a></td>
                            </tr>
                        
                        </tbody>
                    </table>
                    </div>
                </div>
            </form>
        );
    }
}

class Submit extends Component {

    constructor(props) {
        super(props);
        this.state = {
        isLoaded: true,
        }
    }

    componentDidMount() {
    }

    render() {
        var{ isLoaded} = this.state

        if (!isLoaded) {
        return <div>Loading....</div>
        }else {
        return ( //html
            <div className="Profile">
                {<AboutForm/>}
            </div>
        );
        }
        
    }
}
export default Submit;