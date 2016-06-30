import React from 'react';
import ReactDOM from 'react-dom';
import BarChart from './d3BarChart';
import PieChart from './d3PieChart'

class Chart extends React.Component {
    constructor(props) {
        super(props);

        this.getChartState = this.getChartState.bind(this);
        this.sizeUpdate = this.sizeUpdate.bind(this);
    }

    componentDidMount() {
    	let el = ReactDOM.findDOMNode(this);
    	PieChart.create(el, this.props, this.getChartState());
    	window ? window.addEventListener('resize', this.sizeUpdate) : null;
    }

    componentDidUpdate(prevProps, prevState) {
     	let el = ReactDOM.findDOMNode(this)
        // Resize the chart
        // Find a better way if able
     	PieChart.create(el, this.props, this.getChartState());
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.sizeUpdate);
    }

    getChartState() {
    	return {
    		data: this.props.data,
    	};
    }

    sizeUpdate() {
        // Is there a better method?
    	this.forceUpdate();
    }

    render() {
        return (
        	<div 
        		className="chart"
        	>
        	</div>
        );
    }
}

export default Chart;
