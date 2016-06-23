import d3 from 'd3';

const margins = {
	top: 70,
	right: 20,
	bottom: 70,
	left: 70
};

let d3BarChart = {};

d3BarChart.create = function(el, props) {
	let svg = d3.select(el).append('svg')
		.attr('class', 'd3-chart')
		.attr('width', props.width)
		.attr('height', props.height);

	svg.append('g')
		.attr('class', 'd3-data')
		.attr('transform', `translate(${margins.left}, ${margins.top})`);

	svg.append('g').append('text')
		.text('Test value')
		.attr('x', parseInt(svg.style('width')) / 2)
		.attr('y', 0 + (margins.top / 2))
		.style({
			'font-size': '20px',
			'font-weight': 'bold'
		});

	this.update(el, props);
};

d3BarChart.update = function(el, props) {
	let scales = this._scales(el, props.domain);
	this._drawData(el, scales, props.data);

	let axes = this._axes(scales);
	this._drawAxes(el, axes);
};

d3BarChart._scales = function(el, domain) {
	if(!domain) {
		return null;
	}

	let chart = d3.select('.d3-chart');

	let width = parseInt(chart.style('width')) - margins.left - margins.right;
	let height = parseInt(chart.style('width')) - margins.top - margins.bottom;

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
	let height = parseInt(chart.style('width')) - margins.top - margins.bottom;

	let barWidth = width / data.length;

	let g = d3.select(el).selectAll('.d3-data');

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
		.attr('x', (d) => scales.x(d.x) + barWidth / 2)
		.attr('y', (d) => scales.y(d.y) - 5)
		.attr('text-anchor', 'middle')
		.text((d) => d.y);
}

d3BarChart._drawAxes = function(el, axes) {
	let chart = d3.select('.d3-chart');

	let width = parseInt(chart.style('width')) - margins.left - margins.right;
	let height = parseInt(chart.style('width')) - margins.top - margins.bottom;

	let gX = d3.select('.d3-data')
		.append('g');

	gX.attr('transform', `translate(0, ${height})`);
	let xAxis = gX.call(axes.x);

    xAxis.selectAll('path')
    	.style({fill: 'none', stroke: 'black'});
}

export default d3BarChart;