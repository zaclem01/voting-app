import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import $ from 'jquery';

import Chart from '../utils/Chart';

class PollView extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
        	id: undefined, 
        	date: undefined, 
        	creator: '', 
        	name: '', 
        	options: [] 
        };
    }

    componentDidMount() {
    	let pollId = this.props.params.id;
    	$.ajax({
    		url: `/api/polls/${pollId}`,
    		dataType: 'json',
    		type: 'GET',
    		success: (data) => {
    			this.setState(this.state = { 
		        	id: data.id, 
		        	date: data.date, 
		        	creator: data.creator, 
		        	name: data.name, 
		        	options: data.options 
		        });
    		},
    		error: (xhr, status, err) => {
    			console.error(err.toString());
    		}
    	});
    }

    render() {
        return (
        	<Chart
        		data={
        			this.state.options.map((option) => {
        				return { x: option.label, y: option.value };
        			})
        		}
        		domain={
        			{ 
        				x: this.state.options.map(option => option.label),
        				y: [0, Math.max(...this.state.options.map(option => option.value))] 
        			}
        		}
        		width={'90%'}
        		height={500}
        		title={this.state.name}
        	/>
        );
    }
}

export default PollView;
