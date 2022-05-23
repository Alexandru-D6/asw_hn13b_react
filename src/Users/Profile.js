import React, {Component} from 'react';
import '../CSS/Profile.css';
import moment from "moment";


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


class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
          item: [],
          isLoaded: false,
          aboutValue: "",
          status: 200,
          error: "",
          messg: "",
          status2: 200,
          error2: "",
          messg2: "",
        };
      this.handleUpdate = this.handleUpdate.bind(this);
      this.handleChangeAbout = this.handleChangeAbout.bind(this);
    }

    handleUpdate(event) {
      event.preventDefault();
      const requestOpt = {
        method: 'PUT',
        headers: {
            'X-API-KEY': process.env.REACT_APP_API_KEY,
            'accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({about: this.state.aboutValue})
    }
      fetch('https://serene-ridge-36448.herokuapp.com/API/v1.0/users/edit', requestOpt)
        .then(res => res.json())
        .then(json => {
          this.setState({
            isLoaded: true,
            status2: json.status,
            error2: json.error,
            messg2: json.message,            
          })
          return json
        })
      console.log("hello quim");
    }

    handleChangeAbout(event) {
      this.setState({aboutValue: event.target.value});
    }

    componentDidMount() {
      /// Redirecciona de una vista a otra  
      /* window.location.replace(window.location.origin + "/News"); */
      /// process.env.REACT_APP_API_NAME = nombre del usuario
      /// process.env.REACT_APP_API = api key
      var url = new URL(window.location.href)
      let id = url.searchParams.get("id")
      fetch('https://serene-ridge-36448.herokuapp.com/API/v1.0/user/'+ id)
        .then(res => res.json())
        .then(json => {
          this.setState({
            isLoaded: true,
            item: json.user,
            aboutValue: json.user.about,
            status: json.status,
            error: json.error,
            messg: json.message,
          })
        })
    }
    render() {

        var{ isLoaded, item} = this.state
    
        if (!isLoaded) {
          return 
            <div>Loading....</div>
                  
        }else {
          return (
            <div align="center">
              {(this.state.status !== 200 && this.state.status !== 201 && this.state.status !== 202 && this.state.status !== 203 && this.state.status !== undefined)?
                  <DisplayErrorsNoTable status={this.state.status} error={this.state.error} message={this.state.messg}/>
                  :
                  <div>
                    {(this.state.status2 !== 200 && this.state.status2 !== 201 && this.state.status2 !== 202 && this.state.status2 !== 203 && this.state.status2 !== undefined)?
                        <DisplayErrorsNoTable status={this.state.status2} error={this.state.error2} message={this.state.messg2}/>
                        :
                        <div>
                          <table width="85%" bgcolor="#f6f6ef">
                            <tbody>
                              <tr>
                                <td>
                                  <span> &nbsp;</span>
                                </td>
                                <td></td>
                              </tr>
                              <tr className="athing" max-width = "33%">
                                <td valign='top'>user: </td>
                                <td>{item.name}</td>
                              </tr>
                              <tr max-width = "33%">
                                <td valign='top'>created: </td>
                                <td>{moment.utc(item.created_at).local().startOf('seconds').fromNow()}</td>
                              </tr>
                              <tr max-width = "33%">
                                <td valign='top'>about: </td>
                                <td>
                                  {(item.name !== process.env.REACT_APP_API_KEY_NAME)?
                                    <a>{item.about}</a>
                                  :
                                  <textarea cols={70} rows={5} name="about" value={this.state.aboutValue } onChange={this.handleChangeAbout}></textarea>
                                  }
                                </td>
                              </tr>
                              <tr max-width = "33%">
                                <td></td>
                                <td>
                                  <a href={'user/submissions?id=' + item.name}>
                                    <u>submissions</u>
                                  </a>
                                </td>
                              </tr>
                              <tr max-width = "33%">
                                <td></td>
                                <td>
                                  <a href={'/threads?id=' + item.name}>
                                    <u>comments</u>
                                  </a>
                                </td>
                              </tr>
                              {(item.name !== process.env.REACT_APP_API_KEY_NAME)?
                              <tr max-width = "33%"></tr>
                              :
                              <tr max-width = "33%">
                                <td></td>                  
                                <td>
                                  <a href={'user/upvotedsubmissions'}>
                                    <u>upvoted submissions</u>
                                  </a>
                                  &nbsp;
                                  /
                                  &nbsp;
                                  <a href={'user/upvotedcomments'}>
                                    <u>comments</u>
                                    &nbsp;
                                  </a>
                                  <span>(private)</span>
                                </td>
                                  
                              </tr>
                              }
                              <tr max-width = "33%">
                                <td>
                                  <span> &nbsp;</span>
                                </td>
                                <td></td>
                              </tr>
                              <tr max-width = "33%">
                              <td>
                                <input type="submit" value= "update" onClick={this.handleUpdate}></input>
                              </td>
                              <td>{"\u00a0"}</td>
                            </tr>
                            </tbody>
                            
                          </table>
                          <br></br>
                        </div>
                    }
                  </div>
              }
            </div>
          );
        }
        
      }
}
export default Profile;