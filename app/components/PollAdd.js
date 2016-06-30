import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import {
	Grid, Row, Col, 
	Panel, FormGroup, 
	FormControl, ControlLabel, Button
} from 'react-bootstrap';

class PollAdd extends React.Component {
    constructor(props, context) {
        super(props);
        this.state = {
        	rowCount: 2,
        	title: ''
        };

        this.context = context;

        this.handleAddOption = this.handleAddOption.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleAddOption() {
    	this.setState({ rowCount: this.state.rowCount += 1 });
    }

    handleTitleChange(e) {
    	this.setState({ title: e.target.value });
    }

    handleSubmit() {
    	let newPoll = {
    		creator: 'Zac',
    		name: this.state.title
    	};
    	let pollOptions = [];
    	for (let i = 0; i < this.state.rowCount; i++) {
    		let optionLabel = ReactDOM.findDOMNode(this.refs[`option-${i}`]).value;
    		console.log('optionLabel ' , optionLabel);
    		let optionValue = i === 0 ? 1 : 0;
    		pollOptions.push({ label: optionLabel, value: optionValue});
    	}

    	newPoll.options = pollOptions;

    	$.ajax({
    		url: '/api/polls',
    		type: 'POST',
    		contentType: 'application/json',
    		data: JSON.stringify(newPoll),
    		success: () => {
    			this.context.router.push({pathname: 'browse', query: null});
    		},
    		error: (xhr, status, err) => {
    			console.error(err.toString());
    		}
    	});
    }

    render() {
    	let options = [];
    	for (let i = 0; i < this.state.rowCount; i++) {
    		options.push(
    			<FormControl 
					type="text"
					placeholder={`Enter option #${i + 1}`}
					ref={`option-${i}`}
					key={`option-${i}`}
				/>
    		);
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
	        						placeholder="Enter title"
	        						onChange={this.handleTitleChange}
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

PollAdd.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default PollAdd;
