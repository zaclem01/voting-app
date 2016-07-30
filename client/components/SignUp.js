import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import { 
    Grid, Row, Col, 
    Form, FormGroup, FormControl, 
    ControlLabel, Button 
} from 'react-bootstrap';

class SignUp extends React.Component {
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
    		url: '/api/signup',
    		type: 'POST',
    		contentType: 'application/json',
    		data: JSON.stringify(user),
    		success: () => {
    			console.log('success!');
    			this.context.router.push('/browse')
    		},
    		error: (xhr, status, err) => {
    			console.log('an error!')
    			console.error(err.toString());
    		}
    	});
    }

    render() {
        return (
            <Grid>
                <Row>
                    <Col xs={6} xsOffset={3}>
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
                    		<Button 
                                className="signup-btn"
                                onClick={this.handleSubmit}
                            >
                    			Register
                    		</Button>
                    	</Form>
                    </Col>
                </Row>
            </Grid>
        );
    }
}

SignUp.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default SignUp;
