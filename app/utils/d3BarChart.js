import d3 from 'd3';

const margins = {
	top: 70,
	right: 20,
	bottom: 30,
	left: 20
};

let d3BarChart = {};

d3BarChart.create = function(el, props, state) {
	console.log(el);
	// Use Chart component to set width
	// d3BarChart will fill to fit
	let svg = d3.select(el).append('svg')
		.attr('class', 'd3-chart')
		.attr('width', '100%')
		.attr('height', props.height);

	svg.append('g')
		.attr('class', 'd3-chart-area')
		.attr('transform', `translate(${margins.left}, ${margins.top})`);

	d3.select(el).select('.d3-chart-area').append('g')
		.attr('class', 'd3-x-axis');

	svg.append('g').append('text')
		.attr('class', 'd3-title')
		.attr('x', margins.left)
		.attr('y', margins.top / 2);

	this.update(el, props, state);
};

d3BarChart.update = function(el, props, state) {
	let scales = this._scales(el, state.domain);
	this._drawData(el, scales, state.data);

	let axes = this._axes(scales);
	this._drawAxes(el, axes);

	d3.select('.d3-title')
		.text(props.title);
};

d3BarChart._scales = function(el, domain) {
	if(!domain) {
		return null;
	}

	let chart = d3.select('.d3-chart');

	let width = parseInt(chart.style('width')) - margins.left - margins.right;
	let height = parseInt(chart.style('height')) - margins.top - margins.bottom;

	let x = d3.scale.ordinal()
		.rangeBands([0, width])
		.domain(domain.x);

	let y = d3.scale.linear()
		.range([height, 0])
		.domain(domain.y);

	return { x: x, y: y };
}

d3BarChart._axes = function(scales) {
	let x = d3.svg.axis()
		.scale(scales.x)
		.orient('bottom')
		.tickSize(0);

	return { x: x };
}

d3BarChart._drawData = function(el, scales, data) {
	let chart = d3.select('.d3-chart');

	let width = parseInt(chart.style('width')) - margins.left - margins.right;
	let height = parseInt(chart.style('height')) - margins.top - margins.bottom;

	let barWidth = width / data.length;

	let g = d3.select(el).selectAll('.d3-chart-area');

	let bar = g.selectAll('.d3-bar')
		.data(data);

	bar.enter().append('rect')
		.attr('class', 'd3-bar');

	bar.attr('x', (d) => scales.x(d.x))
		.attr('y', (d) => scales.y(d.y))
		.attr('width', barWidth)
		.attr('height', (d) => (height - scales.y(d.y)));

	bar.exit()
		.remove();

	let label = g.selectAll('.d3-label')
		.data(data);

	label.enter().append('text')
		.attr('class', 'd3-label')
		
	label.attr('x', (d) => scales.x(d.x) + barWidth / 2)
		.attr('y', (d) => scales.y(d.y) - 5)
		.attr('text-anchor', 'middle')
		.text((d) => d.y);

	label.exit()
		.remove();
}

d3BarChart._drawAxes = function(el, axes) {
	let chart = d3.select('.d3-chart');

	let height = parseInt(chart.style('height')) - margins.top - margins.bottom;

	let gX = d3.select(el).select('.d3-x-axis')
		.attr('transform', `translate(0, ${height})`)

	let xAxis = gX.call(axes.x);

    xAxis.selectAll('path')
    	.style({fill: 'none', stroke: 'black'});
}

export default d3BarChart;