import React from 'react';
import { 
	Grid, Row, Col, 
	Button, ButtonGroup, 
	Panel, Form, FormGroup, 
	FormControl, ControlLabel
} from 'react-bootstrap';
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
        	<Grid>
        		<Row className="poll-view-container">
        			<Row>
        			<Col sm={12}>
        				<h2>{this.state.name}</h2>
        			</Col>
        			</Row>
        			<hr />
        			<Row>
        			<Col md={4} sm={12}>
        				<div className="voting-form">
        					
        					<FormGroup>
	        					<ControlLabel>Your vote: </ControlLabel>
	        					{' '}
	        					<FormControl
	        						className="voting-options" 
	        						componentClass="select"
	        						placeholder="Choose wisely..."
	        					>
	        						{
	        							this.state.options.map((option) => {
	        								return(
	        									<option
		        									key={option.label} 
		        									value={option.label}
		        								>
		        									{option.label}
		        								</option>
	        								);
	        							})
	        						}
	        					</FormControl>
	        				</FormGroup>
        					<Button 
        						className="voting-btn"
        						bsSize="large"
        					>
        						Submit
        					</Button>
	        				<h3 className="share-header">
				        		Share this poll with your friends
				        	</h3>
				        	<div className="share-btn-group">
					        	<Button 
					        		className="share-btn"
					        		bsSize="large"
					        	>
					        		Facebook
					        	</Button>
					        	<Button 
					        		className="share-btn"
					        		bsSize="large"
					        	>
					        		Twitter
					        	</Button>
					        	<Button 
					        		className="share-btn"
					        		bsSize="large"
					        	>
					        		Google+
					        	</Button>
					        </div>
        				</div>
        			</Col>
        			<Col md={8} sm={12}>
		        		<div className="poll-view-chart">
				        	<Chart data={this.state.options} />
				        </div>
			        </Col>
			        </Row>
		        </Row>
        	</Grid>
        );
    }
}

export default PollView;
