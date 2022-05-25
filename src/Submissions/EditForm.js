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

class EditForm extends Component {
    constructor(props) {
      super(props);
      this.state = {
            editedtitle: "",
            editedtext: "",
            status: 200,
            error: "",
            message: "",
            originalSubmission: props.originalSubmission
        };
  
      this.handleChangeTitle = this.handleChangeTitle.bind(this);
      this.handleChangeText = this.handleChangeText.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChangeTitle(event) {
        this.setState({editedtitle: event.target.value});
    }
    handleChangeText(event) {
        this.setState({editedtext: event.target.value});
    }

  
    handleSubmit(event) {
        event.preventDefault();

        var url = new URL(window.location.href)
        let id = url.searchParams.get("id")
        var requestOpt ={
        } 
        if(this.state.editedtitle !== "" && this.state.editedtext===""){
            requestOpt = {
                method: 'PUT',
                headers: {
                    'X-API-KEY': process.env.REACT_APP_API_KEY,
                    'accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({title:this.state.editedtitle})
            } 
        }
        else if(this.state.editedtitle === "" && this.state.editedtext!==""){
            requestOpt = {
                method: 'PUT',
                headers: {
                    'X-API-KEY': process.env.REACT_APP_API_KEY,
                    'accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({text:this.state.editedtext})
            } 
        }
        else if(this.state.editedtitle !== "" && this.state.editedtext!==""){
            requestOpt = {
                method: 'PUT',
                headers: {
                    'X-API-KEY': process.env.REACT_APP_API_KEY,
                    'accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({title: this.state.editedtitle, text:this.state.editedtext})
            }
        }
        else{
            requestOpt = {
                method: 'PUT',
                headers: {
                    'X-API-KEY': process.env.REACT_APP_API_KEY,
                    'accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({})
            }
        }
        
        fetch("https://serene-ridge-36448.herokuapp.com/API/v1.0/submissions/" + id, requestOpt)
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
                    status: json.status,
                    error: json.error,
                    message: json.message
                })
                if (json.status === 200 || json.status === 201 || json.status === 202 || json.status === 203) {
                    window.location.replace(window.location.origin + "/submission/edit?id="+id)
                }
            })
            .catch(function(error) {
                console.log(error)
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
                            <td>Title:</td>
                            <td><textarea type="text" value={this.state.editedtitle} onChange={this.handleChangeTitle} cols={70} rows={1}/></td>
                        </tr>
                        
                        {this.state.originalSubmission.url===""?
                            <tr>
                            <td>Text:</td>
                            <td><textarea type="text" value={this.state.editedtext} onChange={this.handleChangeText} cols={70} rows={5}/></td>
                            </tr>
                            :
                            <tr></tr>
                        }
   
                        <tr>
                            <td></td>
                            <td className="actions">
                                <input type="submit" onClick={this.handleSubmit} value="Update"/>
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

export default EditForm;