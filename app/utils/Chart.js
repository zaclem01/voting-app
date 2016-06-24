import React from 'react';
import ReactDOM from 'react-dom';
import BarChart from './d3BarChart';

class Chart extends React.Component {
    constructor(props) {
        super(props);

        this.getChartState = this.getChartState.bind(this);
    }

    componentDidMount() {
    	let el = ReactDOM.findDOMNode(this);
    	BarChart.create(el, this.props, this.getChartState());
    }

    componentDidUpdate(prevProps, prevState) {
     	let el = ReactDOM.findDOMNode(this)
     	BarChart.update(el, this.props, this.getChartState());
    }

    getChartState() {
    	return {
    		data: this.props.data,
    		domain: this.props.domain,
    		title: this.props.title
    	}
    }

    render() {
        return (
        	<div className="chart"
        		style={{ width: this.props.width }}
        	>
        		
        	</div>
        );
    }
}

export default Chart;
