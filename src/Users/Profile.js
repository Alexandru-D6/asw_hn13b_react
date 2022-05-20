import React, {Component, useState, useEffect} from 'react';
import PropTypes from "prop-types";
import {withRouter, searchParams} from "react-router";


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

    /*static propTypes = {
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired,
    }*/

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
        //const { match, location, history } = this.props
        //console.log(location.pathname);
        //console.log(window.location.search.replace('?', "").split('&').find(element => element.split('=').at(0) == "id"));
        var{ isLoaded, items, state, error, message} = this.state
        console.log(state);
        console.log(error);

        if (!isLoaded) {
        return <div>Loading....</div>
        }else {
        return ( //html
            <div className="Profile">
                <h2>Profile</h2>
            </div>
        );
        }
        
    }
}
export default Profile;