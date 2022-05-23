import React, {Component} from 'react';
import '../CSS/Profile.css';
<<<<<<< Updated upstream
import moment from "moment";

=======
>>>>>>> Stashed changes

import { Routes, Route, useNavigate} from "react-router-dom";


class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
          item: [],
          isLoaded: false,
          aboutValue: "",
        }
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
<<<<<<< Updated upstream
            aboutValue: json.user.about,
=======
>>>>>>> Stashed changes
          })
        })
    }
    render() {

        var{ isLoaded, item} = this.state
    
        if (!isLoaded) {
          return <table>
                    <tbody>Loading....</tbody>
                  </table>
        }else {
          console.log(item);
          return (
<<<<<<< Updated upstream
            <body>
              <table border="0" cellPadding="0" width="85%" bgcolor="#f6f6ef">
                <tbody>
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
                      <textarea cols="60" rows="5" wrap="virtual" name="about" defaultValue={this.state.about}>{item.about}</textarea>
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
                </tbody>
              </table>
              <br></br>
              <input type="submit" value= "update"></input>
            </body>
=======
            <div className="Profile">
              <ul>
                  <li>
                    {item.created_at}
                  </li>
                </ul>
            </div>
>>>>>>> Stashed changes
          );
        }
        
      }
}
export default Profile;