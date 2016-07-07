import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import {
	Grid, Row, Col, 
	Panel, FormGroup, 
	FormControl, ControlLabel, Button
} from 'react-bootstrap';

class PollEdit extends React.Component {
    constructor(props, context) {
        super(props);
        this.state = {
        	rowCount: 2,
        	name: '',
            options: []
        };

        this.context = context;

        this.handleAddOption = this.handleAddOption.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleOptionDelete = this.handleOptionDelete.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
    	let pollId = this.props.params.id;
    	$.ajax({
    		url: `/api/polls/${pollId}`,
    		dataType: 'json',
    		type: 'GET',
    		success: (data) => {
    			this.setState(this.state = {
    				rowCount: data.options.length,
		        	name: data.name, 
		        	options: data.options 
		        });
    		},
    		error: (xhr, status, err) => {
    			console.error(err.toString());
    		}
    	});
    }

    handleAddOption() {
    	this.setState({ rowCount: this.state.rowCount += 1 });
    }

    handleNameChange(e) {
    	this.setState({ name: e.target.value });
    }

    handleOptionDelete() {

    }

    handleSubmit() {
    	let newPoll = {
    		creator: 'Zac',
    		name: this.state.name
    	};
    	let pollOptions = [];
    	for (let i = 0; i < this.state.rowCount; i++) {
    		let optionLabel = ReactDOM.findDOMNode(this.refs[`option-${i}`]).value;
    		let optionValue = i < this.state.options.length ? this.state.options[i].value : 0;
    		pollOptions.push({ label: optionLabel, value: optionValue});
    	}

    	newPoll.options = pollOptions;

    	let pollId = this.props.params.id;
    	$.ajax({
    		url: `/api/polls/${pollId}`,
    		type: 'PUT',
    		contentType: 'application/json',
    		data: JSON.stringify(newPoll),
    		success: () => {
    			this.context.router.push('browse');
    		},
    		error: (xhr, status, err) => {
    			console.error(err.toString());
    		}
    	});
    }

    render() {
    	let options = [];
    	for (let i = 0; i < this.state.rowCount; i++) {
    		if (i < this.state.options.length) {
    			options.push(
	    			<FormControl 
						type="text"
						disabled={true}
						placeholder={`Enter option #${i + 1}`}
						ref={`option-${i}`}
						key={`option-${i}`}
						value={this.state.options[i].label}
					/>
	    		);
    		} else {
    			options.push(
	    			<FormControl 
						type="text"
						placeholder={`Enter option #${i + 1}`}
						ref={`option-${i}`}
						key={`option-${i}`}
					/>
	    		);
    		}
    	}
        return (
        	<Grid>
        		<Row>
	        		<Col 
	        			md={4} mdOffset={4}
	        			sm={6} smOffset={3}
	        		>
	        			<Panel header="Create a poll">
	        				<FormGroup>
	        					<ControlLabel>Title</ControlLabel>
	        					<FormControl 
	        						type="text"
	        						value={this.state.name}
	        						onChange={this.handleNameChange}
	        					/>
	        				</FormGroup>
	        				<FormGroup>
	        					<ControlLabel>Voting Options</ControlLabel>
	        					{options}
	        					<Button onClick={this.handleAddOption}>
	        						Add more options
	        					</Button>
	        				</FormGroup>
	        				<Button onClick={this.handleSubmit}>
	        					Create poll
	        				</Button>
	        			</Panel>
	        		</Col>
        		</Row>
        	</Grid>
        );
    }
}

PollEdit.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default PollEdit;
