import React from 'react';
import ReactDOM from 'react-dom';
import BarChart from './d3BarChart';

class Chart extends React.Component {
    constructor(props) {
        super(props);

        this.sizeUpdate = this.sizeUpdate.bind(this);
    }

    componentDidMount() {
    	let el = ReactDOM.findDOMNode(this);
    	BarChart.create(el, this.props);
    	window ? window.addEventListener('resize', this.sizeUpdate) : null;
    }

    componentDidUpdate(prevProps, prevState) {
     	let el = ReactDOM.findDOMNode(this)
     	BarChart.update(el, this.props);
    }

    sizeUpdate() {
    	this.forceUpdate();
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
