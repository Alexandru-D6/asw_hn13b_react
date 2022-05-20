import React, {Component, useState, useEffect} from 'react';
import PropTypes from "prop-types";
import {withRouter, searchParams} from "react-router";

function genComment() {
    return(
        <h3>Comment</h3>
    )
}

class AboutForm extends Component {
    constructor(props) {
      super(props);
      this.state = {
          about: '',
          likes: 0,
        };
  
      this.handleChangeOnAbout = this.handleChangeOnAbout.bind(this);
      this.handleChangeOnLikes = this.handleChangeOnLikes.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChangeOnAbout(event) {
        this.setState({about: event.target.value});
    }

    handleChangeOnLikes(event) {
        this.setState({likes: event.target.value});
    }
  
    handleSubmit(event) {
      alert('A name was submitted: ' + this.state.about + " has " + this.state.likes);
      event.preventDefault();
    }
  
    render() {
      return (
        <form onSubmit={this.handleSubmit}>
          <label>
            About:
            <input type="text" value={this.state.about} onChange={this.handleChangeOnAbout} />
          </label>

          <label>
            Likes:
            <input type="number" value={this.state.likes} onChange={this.handleChangeOnLikes}/>
          </label>
          <input type="submit" value="Submit" />
        </form>
      );
    }
}

class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {
        items: [],
        isLoaded: false,
        state: "",
        error: "",
        message: "",
        query: [],
        }
    }

    componentDidMount() {
        var url = new URL(window.location.href)
        let user = url.searchParams.get("id")

        if (user === null || user === "") user = " "

        fetch('https://serene-ridge-36448.herokuapp.com/API/v1.0/user/'+ user)
        .then(res => {
            if (res.ok)
                return res.json()
            else {
                this.setState({
                    isLoaded: true,
                    state: res.status,
                    error: res.statusText,
                })
                return ""
            }
        })
        .then(json => {
            this.setState({
            isLoaded: true,
            items: json,
            })
        })
        .catch((error) => {
            console.log(error)
          });
    }

    render() {
        var{ isLoaded, items, state, error, message} = this.state
        console.log(items);
        console.log(state);
        console.log(error);

        if (!isLoaded) {
        return <div>Loading....</div>
        }else {
        return ( //html
            <div className="Profile">
                <h2>Profile</h2>
                {<AboutForm />}
            </div>
        );
        }
        
    }
}
export default Profile;