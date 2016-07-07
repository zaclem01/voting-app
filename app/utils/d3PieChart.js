import d3 from 'd3';
import $ from 'jquery';

let d3PieChart = {};

d3PieChart.create = function(el, props, state) {
	const width = $(el).width();
	const height = $(el).height();

	// Remove any previous in case of rerender
	d3.select(el).select('svg').remove();
	d3.select(el).select('ul').remove();

	d3.select(el).append('ul')
		.attr('class', 'd3-legend');

	let svg = d3.select(el).append('svg')
		.attr('class', 'd3-chart')
		.attr('width', width)
		.attr('height', height);

	svg.append('g')
		.attr('class', 'd3-chart-area');

	this.update(el, props, state);
}

d3PieChart.update = function(el, props, state) {
	let width = $(el).width();
	let height = $(el).height();
	const radius = Math.min(width, height) / 2;

	d3.select(el).select('.d3-chart')
		.attr('width', width)
		.attr('height', height);

	d3.select(el).select('.d3-chart-area')
		.attr('transform', () => {
			if(width < height) {
				return `translate(${width / 2}, ${radius})`;
			} else {
				return `translate(${width / 2}, ${height / 2})`;
			}
		});

	let arc = this._arc(radius);
	this._draw(el, state.data, arc)
}

d3PieChart._arc = function(radius) {
	let arc = d3.svg.arc()
		.outerRadius(radius - 10)
		.innerRadius((radius - 10) / 3);

	let labelArc = d3.svg.arc()
		.outerRadius(radius - 40)
		.innerRadius(radius - 40);

	return { arc: arc, labelArc: labelArc };
}

d3PieChart._draw = function(el, data, arc) {
	const width = $(el).width();
	const height = $(el).height();
	const radius = Math.min(width, height) / 2;

	const colors = d3.scale.category20b();
	const legendSpace = 20;

	let pie = d3.layout.pie()
		.sort(null)
		.value(d => d.value);

	let g = d3.select(el).select('.d3-chart-area')
			
	let wedge = g.selectAll('.arc')
		.data(pie(data))

	wedge.enter().append('g').append('path')
			.attr('class', 'arc')
			.attr('d', arc.arc)
			.attr('fill', d => {
				return colors(d.data.label)
			});

	let legend = d3.select(el).select('.d3-legend').selectAll('.d3-legend-item')
		.data(data)
		.enter().append('li');

	legend.attr('class', 'd3-legend-item')
		.html((d, i) => {
			if (i < 2) {
				return `<div class="d3-legend-color" style="background:${colors(d.label)};"></div>${d.label}`
			} else if (i === 2) {
				return '<b>cont...</b>';
			} else return null;
		});
}

export default d3PieChart;