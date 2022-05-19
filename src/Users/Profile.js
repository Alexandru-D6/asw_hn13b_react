import React, {Component} from 'react';

class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {
        items: [],
        isLoaded: false,
        }
    }

    componentDidMount() {
        console.log(this.props.match.params);

        fetch('https://serene-ridge-36448.herokuapp.com/API/v1.0/user/ElectrikeOfficial')
        .then(res => res.json())
        .then(json => {
            this.setState({
            isLoaded: true,
            items: json,
            })
        })
    }

    render() {

        var{ isLoaded, items} = this.state

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