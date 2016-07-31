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
        this.handleDeleteOption = this.handleDeleteOption.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
    	let pollId = this.props.params.id;
    	$.ajax({
    		url: `/api/polls/${pollId}`,
    		dataType: 'json',
    		type: 'GET'
    	})
        .done(
            data => this.setState(this.state = {
                rowCount: data.options.length,
                name: data.name, 
                options: data.options 
            })
        )
        .fail((xhr, status, err) => console.error(err.toString()));
    }

    handleAddOption() {
    	this.setState({ rowCount: this.state.rowCount += 1 });
    }

    handleDeleteOption() {
        this.setState({ rowCount: this.state.rowCount -= 1 });
    }

    handleNameChange(e) {
    	this.setState({ name: e.target.value });
    }

    handleSubmit() {
        let blankOptions = false;
    	let newPoll = {
    		creator: 'Zac',
    		name: this.state.name
    	};
    	let pollOptions = [];
    	for (let i = 0; i < this.state.rowCount; i++) {
    		let optionLabel = ReactDOM.findDOMNode(this.refs[`option-${i}`]).value;
            console.log(optionLabel);
    		let optionValue = i < this.state.options.length ? this.state.options[i].value : 0;
    		pollOptions.push({ label: optionLabel, value: optionValue});
    	}

        for (let i = 0; i < pollOptions.length; i++) {
            if (pollOptions[i].label === '') {
                blankOptions = true;
                break;
            }
        }

        if (blankOptions) {
            alert('Must enter none blank options!')
        } else {
            newPoll.options = pollOptions;

            let pollId = this.props.params.id;
            $.ajax({
                url: `/api/polls/${pollId}`,
                type: 'PUT',
                contentType: 'application/json',
                data: JSON.stringify(newPoll)
            })
            .done(() => this.context.router.push('browse'))
            .fail((xhr, status, err) => console.error(err.toString()));
        }
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
	    		if (i === this.state.rowCount - 1) {
	                options.push(
	                    <i 
	                        className="poll-add-edit-delete-option-btn fa fa-times"
	                        onClick={this.handleDeleteOption}
	                    >
	                    </i>
	                );
	            }
    		}
    	}
        return (
        	<Grid>
        		<Row>
	        		<Col 
	        			md={4} mdOffset={4}
	        			sm={6} smOffset={3}
	        		>
	        			<Panel header="Edit poll">
	        				<FormGroup>
	        					<ControlLabel className="poll-add-edit-label">
                                    Title
                                </ControlLabel>
	        					<FormControl 
	        						type="text"
	        						value={this.state.name}
	        						onChange={this.handleNameChange}
	        					/>
	        				</FormGroup>
	        				<FormGroup>
	        					<ControlLabel className="poll-add-edit-label">
                                    Voting Options
                                </ControlLabel>
	        					{options}
	        					<Button 
                                    className="poll-add-edit-btn poll-add-edit-options-btn"
                                    onClick={this.handleAddOption}
                                >
	        						Add more options
	        					</Button>
	        				</FormGroup>
	        				<FormGroup>
	        					<Button 
                                    className="poll-add-edit-btn poll-add-edit-submit-btn"
                                    onClick={this.handleSubmit}
                                >
	        						Edit poll
	        					</Button>
                            </FormGroup>
                            <FormGroup>
	        					<Button
                                    className="poll-add-edit-btn poll-add-edit-cancel-btn" 
                                    onClick={() => this.context.router.push('dashboard')}>
	        						Cancel
	        					</Button>
	        				</FormGroup>
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
