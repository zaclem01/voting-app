import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import { Form, FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';

class SignIn extends React.Component {
    constructor(props, context) {
        super(props);
        this.context = context;

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit() {
    	let username = ReactDOM.findDOMNode(this.refs.username).value;
    	let password = ReactDOM.findDOMNode(this.refs.password).value;

    	let user = {
    		username: username,
    		password: password
    	};

    	$.ajax({
    		url: '/api/signin',
    		type: 'POST',
    		contentType: 'application/json',
    		data: JSON.stringify(user),
    		success: () => {
    			console.log('success!');
    			if (this.props.location.state) {
    				this.context.router.push({
    					pathname: this.props.location.state.nextPathname,
    				});
    			} else {
    				this.context.router.push('/dashboard');
    			}
    		},
    		error: (xhr, status, err) => {
    			console.log('an error!')
    			console.error(err.toString());
    		}
    	});
    }

    render() {
        return (
        	<Form>
        		<FormGroup>
        			<ControlLabel>
        				Username
        			</ControlLabel>
        			<FormControl 
        				type="text"
        				ref="username"
        			/>
        		</FormGroup>
        		<FormGroup>
        			<ControlLabel>
        				Password
        			</ControlLabel>
        			<FormControl 
        				type="password"
        				ref="password"
        			/>
        		</FormGroup>
        		<Button onClick={this.handleSubmit}>
        			Submit
        		</Button>
        	</Form>
        );
    }
}

SignIn.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default SignIn;
