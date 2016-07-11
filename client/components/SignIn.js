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
    	let email = ReactDOM.findDOMNode(this.refs.email).value;
    	let password = ReactDOM.findDOMNode(this.refs.password).value;

    	let user = {
    		email: email,
    		password: password
    	};

    	$.ajax({
    		url: '/api/signin',
    		type: 'POST',
    		contentType: 'application/json',
    		data: JSON.stringify(user),
    		success: () => {
    			console.log('success!');
    			this.context.router.push('/dashboard')
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
        				Email
        			</ControlLabel>
        			<FormControl 
        				type="email"
        				ref="email"
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
