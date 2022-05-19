import React, {Component, useState, useEffect} from 'react';
import PropTypes from "prop-types";
import {withRouter} from "react-router";


class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {
        items: [],
        isLoaded: false,
        query: "",
        }
    }

    /*static propTypes = {
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired,
    }*/

    componentDidMount() {
        let user = window.location.search.replace('?', "").split('&').find(element => element.split('=').at(0) == "id").split('=').at(1)
        fetch('https://serene-ridge-36448.herokuapp.com/API/v1.0/user/' + user)
        .then(res => res.json())
        .then(json => {
            this.setState({
            isLoaded: true,
            items: json,
            })
        })
    }

    render() {
        //const { match, location, history } = this.props
        //console.log(location.pathname);
        console.log(window.location.search.replace('?', "").split('&').find(element => element.split('=').at(0) == "id"));
        var{ isLoaded, items} = this.state
        console.log(items);

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