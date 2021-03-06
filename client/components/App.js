import React from 'react';
import $ from 'jquery';

import NavBar from './NavBar';

class App extends React.Component {
	constructor(props) {
        super(props);
        this.state = { 
            polls: [],
            user: {
                id: undefined,
                username: '',
                ip: ''
            }
        }

        this.loadPolls = this.loadPolls.bind(this);
        this.checkForUser = this.checkForUser.bind(this);
    }

    componentDidMount() {
        this.loadPolls();
        this.checkForUser();
    }

    componentWillReceiveProps(nextProps) {
        this.loadPolls(); 
        this.checkForUser();
    }

    loadPolls() {
        $.ajax({
            url: '/api/polls',
            type: 'GET',
            dataType: 'json',
        })
        .done(data => this.setState({ polls: data }))
        .fail((xhr, status, err) => console.error(err.toString()));
    }

    checkForUser() {
        $.ajax({
            url: '/api/checksession',
            type: 'GET',
            dataType: 'json',
        })
        .done(data => {
            if (data.isLoggedIn) {
                this.setState({ user: data.user })
            } else {
                this.setState({ 
                    user: {
                        id: undefined,
                        username: '',
                        ip: data.ip
                    }
                })
            }
        })
        .fail((xhr, status, err) => console.error(err.toString())); 
    }

	render() {
        let renderPolls = this.state.polls.length > 0;
        if (renderPolls) {
            // Must clone the child element to add the props
            return (
                <div>
                    <NavBar user={this.state.user} />
                    {React.cloneElement(this.props.children, {...this.state})}
                </div>
            );
        } else {
            return (<div>Loading...</div>);
        }
	}
}

export default App;