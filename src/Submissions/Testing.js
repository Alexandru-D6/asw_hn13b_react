import React, {Component} from 'react';

function links() {
    return(
        <h3>Comment</h3>
    )
}

class AboutForm extends Component {
    constructor(props) {
      super(props);
      this.state = {
          about: '',
        };
  
      this.handleChangeOnAbout = this.handleChangeOnAbout.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChangeOnAbout(event) {
        this.setState({about: event.target.value});
    }

  
    handleSubmit(event) {
      alert('A name was submitted: ' + this.state.about);
      event.preventDefault();
    }
  
    render() {
        const {user} = this.props.user
        return (
            <form onSubmit={this.handleSubmit}>
                    <label>
                        <td>{process.env.REACT_APP_API_KEY}</td>
                        <td>{process.env.REACT_APP_API_KEY_NAME}</td>
                    </label>
                    
                    <label>
                        <td>user:</td>
                        <td>{user.name}</td>
                    </label>

                    <label>
                        <td>About:</td>
                        <td><textarea type="text" value={this.state.about} onChange={this.handleChangeOnAbout} cols={70} rows={5}/></td>
                    </label>
                    
                    <label>
                        <td className="actions">
                            <input type="submit" value="Submit" />
                        </td>
                    </label>
            </form>
        );
    }
}

class Testing extends Component {

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
                {<AboutForm user={items}/>}
            </div>
        );
        }
        
    }
}
export default Testing;