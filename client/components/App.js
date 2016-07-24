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
                email: ''
            }
        }
    }

    componentDidMount() {
        $.ajax({
            url: '/api/polls',
            type: 'GET',
            dataType: 'json',
        })
        .done(data => this.setState({ polls: data }))
        .fail((xhr, status, err) => console.error(err.toString()));

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
                        email: ''
                    }
                })
            }
        })
        .fail((xhr, status, err) => console.error(err.toString())); 
    }

    componentWillReceiveProps(nextProps) {
        $.ajax({
            url: '/api/polls',
            type: 'GET',
            dataType: 'json',
        })
        .done(data => this.setState({ polls: data }))
        .fail((xhr, status, err) => console.error(err.toString()));

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
                        email: ''
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