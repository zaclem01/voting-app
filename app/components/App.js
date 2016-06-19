import React from 'react';
import $ from 'jquery';
import { Grid } from 'react-bootstrap';

import NavBar from './NavBar';

class App extends React.Component {
	constructor(props) {
        super(props);
        this.state = { polls: [] }
    }

    componentDidMount() {
    	$.ajax({
    		url: '/api/polls',
    		type: 'GET',
    		dataType: 'json',
    		success: (data) => {
    			this.setState({ polls: data.polls });
    		},
    		error: (xhr, status, err) => {
    			console.error(err.toString());
    		}
    	});
    }

	render() {
		// Must clone the child element to add the props
		return (
			<div>
				<NavBar />
				{React.cloneElement(this.props.children, {...this.state})}
			</div>
		);
	}
}

export default App;