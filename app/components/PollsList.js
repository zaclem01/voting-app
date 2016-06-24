import React from 'react';
import $ from 'jquery';
import { Grid, Row, Col, Panel, Form, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import LinkContainer from 'react-router-bootstrap';

class PollsList extends React.Component {
    constructor(props, context) {
        super(props);
        this.state = {
        	sort: this.props.location.query.sort || 'dateDesc'
        };

        this.context = context;

        this.sortPolls = this.sortPolls.bind(this);
        this.handleSortChange = this.handleSortChange.bind(this);
    }

    componentWillReceiveProps(nextProps) {
    	let thisQuery = this.props.location.query;
    	let nextQuery = nextProps.location.query;
    	if (nextQuery.sort === thisQuery.sort) {
    		return;
    	}
    	this.setState({
        	sort: nextProps.location.query.sort || 'dateDesc'
    	});
    }

    sortPolls(sort) {
    	switch(sort) {
    		case 'popularity':
    			return this.props.polls.sort((prev, curr) => {
    				let prevOptions = prev.options;
    				let currOptions = curr.options;
    				let prevVotes = prevOptions.reduce((prev, curr) => {
    					return prev.value + curr.value;
    				});
    				let currVotes = currOptions.reduce((prev, curr) => {
    					return prev.value + curr.value;
    				});
    				// let prevVotes = Object.keys(prevOptions)
    				// 	.map(key => prevOptions[key])
    				// 	.reduce((prevVal, currVal) => {
    				// 		return prevVal + currVal;
    				// 	});
    				// let currVotes = Object.keys(currOptions)
    				// 	.map(key => currOptions[key])
    				// 	.reduce((prevVal, currVal) => {
    				// 		return prevVal + currVal;
    				// 	});
    				return currVotes - prevVotes;
    			});
    		case 'dateAsc':
    			return this.props.polls.sort((prev, curr) => {
    				return prev.date - curr.date;
    			});
    		case 'dateDesc':
    			return this.props.polls.sort((prev, curr) => {
    				return curr.date - prev.date;
    			});
    	}
    }

    handleSortChange(e) {
    	let newQuery = {};
    	if(this.state.filter) {
    		newQuery.filter = this.state.filter;
    	}
    	newQuery.sort = e.target.value;

    	this.context.router.push({ 
    		pathname: '/browse',
    		search: '?' +  $.param(newQuery) 
    	});
    }

    render() {
        return (
        	<Grid>
        	<Row className="browseHeader">
        		<Col md={3} xs={12}>
        			<h3>Browse Polls</h3>
        		</Col>
        		<Col 
        			className="browseHeaderForm" 
        			lg={6} lgOffset={3} 
        			md={9}
        			xs={12}
        		>
        			<Form inline>
        				<FormGroup>
        					<ControlLabel>Sort by: </ControlLabel>
        					{' '}
        					<FormControl 
        						componentClass="select"
        						value={this.state.sort}
        						onChange={this.handleSortChange}
        					>
        						<option value="popularity">Popularity</option>
        						<option value="dateAsc">Date ascending</option>
        						<option value="dateDesc">Date descending</option>
        					</FormControl>
        				</FormGroup>
        			</Form>
        		</Col>
        	</Row>
        	<hr />
        	<Row>{
        		this.sortPolls(this.state.sort).map((poll) => {
        			return (
        				<Col key={poll.id} md={4} sm={12}>
	        				<Panel 
	        					header={poll.name}
	        					onClick={() => this.context.router.push(`/${poll.id}`)}
	        				>
	        					<h4>
	        						created by: {poll.creator}
	        					</h4>
	        					<ul>{
	    							poll.options.map((option) => {
	    								return (
	    									<li>
	    										{option.label} : {option.value}
	    									</li>
	    								);
	    							})
	        					}</ul>
	        				</Panel>
        				</Col>
        			);
        		})
        	}</Row>
        	</Grid>
        );
    }
}

PollsList.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default PollsList;