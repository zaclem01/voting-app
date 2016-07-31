import React from 'react';
import $ from 'jquery';
import { Grid, Row, Col, Panel, Form, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import LinkContainer from 'react-router-bootstrap';

import Chart from '../utils/Chart';

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
        console.log(this.props.polls)
    	switch(sort) {
    		case 'popularity':
    			return this.props.polls.sort((prev, curr) => {
    				let prevOptions = prev.options;
    				let currOptions = curr.options;
    				let prevVotes = prevOptions.reduce((prev, curr) => {
    					let prevValue;
                        let currValue;

                        if (prev.value != undefined) {
                            prevValue = prev.value;
                        } else {
                            prevValue = prev;
                        }

                        if (curr.value != undefined) {
                            currValue = curr.value;
                        } else {
                            currValue = curr;
                        }

                        return prevValue + currValue;
    				});
    				let currVotes = currOptions.reduce((prev, curr) => {
                        let prevValue;
                        let currValue;

                        if (prev.value != undefined) {
                            prevValue = prev.value;
                        } else {
                            prevValue = prev;
                        }

                        if (curr.value != undefined) {
                            currValue = curr.value;
                        } else {
                            currValue = curr;
                        }

    					return prevValue + currValue;
    				});
    				return currVotes - prevVotes;
    			});
    		case 'dateAsc':
    			return this.props.polls.sort((prev, curr) => {
    				return Date.parse(prev.date) - Date.parse(curr.date);
    			});
    		case 'dateDesc':
    			return this.props.polls.sort((prev, curr) => {
    				return Date.parse(curr.date) - Date.parse(prev.date);
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
        	<Row className="polls-list-header">
        		<Col md={3} xs={12}>
        			<h3>Browse Polls</h3>
        		</Col>
        		<Col 
        			className="polls-list-header-form" 
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
        				<Col key={poll._id} lg={4} md={6} sm={12}>
	        				<Panel 
                                className="polls-list-panel"
	        					header={poll.name}
	        					onClick={() => this.context.router.push(`/${poll._id}`)}
	        				>
	        					<p>
	        						created by: {poll.creator}
	        					</p>
                                <div className="polls-list-chart">
    	        					<Chart data={poll.options} limit={true}/>
                                </div>
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