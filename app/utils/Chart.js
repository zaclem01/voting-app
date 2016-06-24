import React from 'react';
import ReactDOM from 'react-dom';
import BarChart from './d3BarChart';

class Chart extends React.Component {
    constructor(props) {
        super(props);

        this.getChartState = this.getChartState.bind(this);
        //this.sizeUpdate = this.sizeUpdate.bind(this);
    }

    componentDidMount() {
    	let el = ReactDOM.findDOMNode(this);
    	BarChart.create(el, this.props);
    	//window ? window.addEventListener('resize', this.sizeUpdate) : null;
    }

    componentDidUpdate(prevProps, prevState) {
     	let el = ReactDOM.findDOMNode(this)
     	BarChart.update(el, this.props);
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
