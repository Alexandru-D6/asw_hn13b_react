import React, {Component} from 'react';
import '../CSS/Profile.css';
import moment from "moment";


function DisplayErrorsNoTable(props) {
  var status = props.status
  var error = props.error
  var message = props.message

  if (message === undefined) message = ""
  else message = ": " + message

  return(
    <span style={{color: "red"}}>{status + " " + error + message}</span>
  )
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
          message: "",
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
      fetch('https://serene-ridge-36448.herokuapp.com/API/v1.0/users', requestOpt)
        .then(res => {
          if (!res.ok) {
            res.json().then(a => {
              this.setState({
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
            status: json.status,
            error: json.error,
            message: json.message,            
          })
          return json
        })
        .catch(function(error) {
          console.log(error)
        })
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
        fetch('https://serene-ridge-36448.herokuapp.com/API/v1.0/users/'+ id)
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
              item: json.user,
              aboutValue: json.user.about,
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

        var{ isLoaded, item} = this.state
    
        if (!isLoaded) {
          return <div>Loading....</div>
                  
        }else {
          return (
            <div align="center">
              {(this.state.status !== 200 && this.state.status !== 201 && this.state.status !== 202 && this.state.status !== 203 && this.state.status !== undefined)?
                  <DisplayErrorsNoTable status={this.state.status} error={this.state.error} message={this.state.message}/>
                  :
                  <div>
                    {(this.state.status2 !== 200 && this.state.status2 !== 201 && this.state.status2 !== 202 && this.state.status2 !== 203 && this.state.status2 !== undefined)?
                        <DisplayErrorsNoTable status={this.state.status2} error={this.state.error2} message={this.state.message2}/>
                        :
                        <div>
                          <table width="85%">
                            <tbody>
                              <tr>
                                <td width="5%">
                                  <span> &nbsp;</span>
                                </td>
                                <td width="100%"></td>
                              </tr>
                              <tr className="athing">
                                <td valign='top'>user: </td>
                                <td>{item.name}</td>
                              </tr>
                              <tr>
                                <td valign='top'>created: </td>
                                <td>{moment.utc(item.created_at).local().startOf('seconds').fromNow()}</td>
                              </tr>
                              <tr>
                                <td valign='top'>about: </td>
                                <td>
                                  {(item.name !== process.env.REACT_APP_API_KEY_NAME)?
                                    <font>{item.about}</font>
                                  :
                                  <textarea cols={70} rows={5} name="about" value={this.state.aboutValue } onChange={this.handleChangeAbout}></textarea>
                                  }
                                </td>
                              </tr>
                              <tr>
                                <td></td>
                                <td>
                                  <a href={'/submitted?id=' + item.name}>
                                    <u>submissions</u>
                                  </a>
                                </td>
                              </tr>
                              <tr>
                                <td></td>
                                <td>
                                  <a href={'/threads?id=' + item.name}>
                                    <u>comments</u>
                                  </a>
                                </td>
                              </tr>
                              {(item.name !== process.env.REACT_APP_API_KEY_NAME)?
                              <tr></tr>
                              :
                              <tr>
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
                              <tr>
                                <td>
                                  <span> &nbsp;</span>
                                </td>
                                <td></td>
                              </tr>
                              <tr>
                              <td>
                                {(item.name === process.env.REACT_APP_API_KEY_NAME)?
                                  <input type="submit" value= "update" onClick={this.handleUpdate}></input> :
                                  <div></div>
                                }
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