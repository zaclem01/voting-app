import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router';

import Chart from '../utils/Chart';

class Home extends React.Component {
	constructor(props, context) {
        super(props);
        this.context = context;
    }

    componentDidMount() {
    	if (this.props.user.id) {
    		this.context.router.push('browse')
    	}
    }

	render() {
		let { polls } = this.props;
		let sortedPolls = polls.sort((prev, curr) => Date.parse(curr.date) - Date.parse(prev.date))
		let lastPoll = sortedPolls[0];
		return (
			<Grid>
				<Row>
					<Col xs={8} xsOffset={2}>
						<h2 className="home-callout">
							Simple and easy to use
						</h2>
						<p className="home-callout">
							Create a question and choose the available answers. Thats it!
						</p>
						<p className="home-callout">
							Allow as many voting options as you want
						</p>
						<p className="home-callout">
							Save your polls and share them for the whole world to see!
						</p>
						<p className="home-callout">
							Edit previous polls without losing the current results
						</p>
					</Col>
				</Row>
				<Row>
					<Col xs={12}>
						<h2 className="home-poll-example home-poll-example-title">
							Check out this recent poll!
						</h2>
						<h3 className="home-poll-example">
							{lastPoll.name}
						</h3>
						<div 
							className="home-chart"
							onClick={() => this.context.router.push(`/${lastPoll._id}`)}
						>
							<Chart data={lastPoll.options} />
						</div>
					</Col>
				</Row>
			</Grid>
		);
	}
}

Home.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default Home;