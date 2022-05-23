import React, {Component} from 'react';
import '../CSS/Profile.css';
import moment from "moment";



class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
          item: [],
          isLoaded: false,
          aboutValue: "",
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
      fetch('https://serene-ridge-36448.herokuapp.com/API/v1.0/user/'+ process.env.REACT_APP_API_KEY_NAME)
        .then(res => res.json())
        .then(json => {
          this.setState({
            isLoaded: true,
            item: json.user,
            aboutValue: json.user.about,
          })
        })
    }
    render() {

        var{ isLoaded, item} = this.state
    
        if (!isLoaded) {
          return 
            <div>Loading....</div>
                  
        }else {
          console.log(item);
          return (
            <div align="center">
              <table border="0" cellPadding="0" width="85%" bgcolor="#f6f6ef">
                <tbody>
                  <tr>
                    <td>
                      <span> &nbsp;</span>
                    </td>
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
                      <textarea cols={70} rows={5} name="about" value={this.state.aboutValue } onChange={this.handleChangeAbout}></textarea>
                    </td>
                  </tr>
                  <tr>
                    <td></td>
                    <td>
                      <a>
                        <u>submissions</u>
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td></td>
                    <td>
                      <a>
                        <u>comments</u>
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td></td>
                    <td>
                      <a>
                        <u>upvoted submissions</u>
                      </a>
                      &nbsp;
                      /
                      &nbsp;
                      <a>
                        <u>comments</u>
                        &nbsp;
                      </a>
                      <span>(private)</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span> &nbsp;</span>
                    </td>
                  </tr>
                </tbody>
                <input type="submit" value= "update" onClick={this.handleUpdate}></input>
              </table>
              <br></br>
            </div>
          );
        }
        
      }
}
export default Profile;