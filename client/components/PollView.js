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
    constructor(props, context) {
        super(props);
        this.state = { 
        	id: undefined, 
        	date: undefined, 
        	creator: '', 
        	name: '', 
        	options: [],
        	userVote: '' 
        };
        this.context = context;

        this.handleVoteSelect = this.handleVoteSelect.bind(this);
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
		        	id: data._id, 
		        	date: data.date, 
		        	creator: data.creator, 
		        	name: data.name, 
		        	options: data.options,
                    voters: data.voters
		        });
    		},
    		error: (xhr, status, err) => {
    			console.error(err.toString());
    		}
    	});
    }

    handleVoteSelect(e) {
    	this.setState({ userVote: e.target.value });
    }

    handleSubmit() {
        console.log(this.props.user)
        if (this.state.voters.indexOf(this.props.user.id) === -1 && this.state.voters.indexOf(this.props.user.ip) === -1) {
        	let pollId = this.props.params.id;
        	let vote = this.state.userVote || this.state.options[0].label;

        	const previousVotes = this.state.options;
        	const newVotes = this.state.options.map((option) => {
        		if (option.label !== vote) {
        			return option;
        		} else {
        			return { label: option.label, value: option.value += 1 };
        		}
        	});
        	console.log('newVotes ' , newVotes);
        	this.setState({ options: newVotes });

        	$.ajax({
        		url: `/api/polls/${pollId}`,
        		type: 'PUT',
        		data: { userVote: vote, ...this.props.user },
        		success: (data) => {
        			this.context.router.push('browse');
        		},
        		error: (xhr, status, err) => {
        			console.error(err.toString());
        			this.setState({ options: previousVotes });
        		}
        	});
        } else {
            alert('Cannot vote twice!')
        }
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
	        						onChange={this.handleVoteSelect}
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
                                bsStyle="success"
                                bsSize="large"
                                onClick={this.handleSubmit}
                            >
                                Submit
                            </Button>
	        				<h3 className="share-header">
				        		Share this poll with your friends
				        	</h3>
				        	<div className="share-btn-group">
					        	<Button 
					        		className="facebook-btn share-btn"
					        		bsSize="large"
                                    href={`http://www.facebook.com/sharer.php?u=localhost%3A3000${this.props.location.pathname}&t=${this.state.name}`}
					        	>
					        		<i className="fa fa-facebook"></i>&nbsp;&nbsp;&nbsp;Facebook
					        	</Button>
					        	<Button 
					        		className="twitter-btn share-btn"
					        		bsSize="large"
                                    href={'http://twitter.com/intent/tweet?text=' + encodeURIComponent(`localhost:3000${this.props.location.pathname}`)}
					        	>
					        		<i className="fa fa-twitter"></i>&nbsp;&nbsp;&nbsp;&nbsp;Twitter
					        	</Button>
					        	<Button 
					        		className="google-btn share-btn"
					        		bsSize="large"
                                    href={'https://plus.google.com/share?url=' + encodeURIComponent(`localhost:3000${this.props.location.pathname}`)}
					        	>
					        		<i className="fa fa-google-plus"></i>&nbsp;&nbsp;&nbsp;Google+
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

PollView.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default PollView;
