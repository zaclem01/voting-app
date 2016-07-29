import React from 'react';
import $ from 'jquery';
import { Grid, Row, Col, Panel } from 'react-bootstrap';

class Dashboard extends React.Component {
    constructor(props, context) {
        super(props);
        this.context = context;
    }

    handleDelete(id) {
    	let remove = confirm('Are you sure you want to delete this poll?');

        if (remove) {
            $.ajax({
                url: `/api/polls/${id}`,
                type: 'DELETE',
                success: (data) => {
                	this.context.router.push('dashboard');
                },
                error: (xhr, status, err) => {
                    console.error(err.toString());
                }
            });
        }
    }
    
    render() {
		let filteredPolls = this.props.polls.filter(poll => {
			return poll.creator === this.props.user.username;
		});
		if (filteredPolls.length > 0) {
			return (
				<Grid>
	                <Row>
	                    <Col 
	                        md={4} mdOffset={4}
	                        sm={6} smOffset={3}
	                    >
	                        <Panel header="Your Polls">
					        		{
					        			filteredPolls.map(poll => {
					        				return (
					        					<Row key={poll._id}>
					        						<Col 
					        							sm={8}
						        						onClick={() => this.context.router.push(`/${poll._id}`)}
							        					>
					        							{poll.name}
					        						</Col>
					        						<Col sm={2}>
						        						<i 
						        							className="fa fa-times"
						        							onClick={() => this.handleDelete(poll._id)}
						        						>
						        						</i>
								                    </Col>
								                    <Col sm={2}>
						        						<i 
						        							className="fa fa-pencil-square-o"
						        							onClick={() => this.context.router.push(`/${poll._id}/edit`)}
						        						>
						        						</i>
								                    </Col>
					        					</Row>
					        				);
					        			})
					        		}
	                        </Panel>
	                    </Col>
	                </Row>
	            </Grid>
	        );   
		} else {
        	return (<div>No polls created yet</div>);
    	}
	}
}

Dashboard.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default Dashboard;