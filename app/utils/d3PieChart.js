import d3 from 'd3';
import $ from 'jquery';

let d3PieChart = {};

d3PieChart.create = function(el, props, state) {
	let width = $(el).width();
	let height = $(el).height();

	let svg = d3.select(el).append('svg')
		.attr('class', 'd3-chart')
		.attr('width', width)
		.attr('height', height);

	svg.append('g')
		.attr('class', 'd3-chart-area')
		.attr('transform', `translate(${width / 2}, ${height / 2})`);

	this.update(el, props, state);
}

d3PieChart.update = function(el, props, state) {
	let width = $(el).width();
	let height = $(el).height();
	let radius = Math.min(width, height) / 2;

	d3.select(el).select('.d3-chart')
		.attr('width', width)
		.attr('height', height);

	d3.select(el).select('.d3-chart-area')
		.attr('transform', `translate(${width / 2}, ${height / 2})`);

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
	let colors = d3.scale.category20b();

	let pie = d3.layout.pie()
		.sort(null)
		.value(d => d.value);

	let g = d3.select(el).select('.d3-chart-area')
			.selectAll('.arc')
			.data(pie(data))
		.enter().append('g')
			.attr('class', 'arc');

	g.append('path')
		.attr('d', arc.arc)
		.attr('fill', d => colors(d.data.label));

	g.append('text')
		.attr('transform', (d) => `translate(${arc.labelArc.centroid(d)})`)
		.attr('dy', '.35em')
		.text(d => d.data.label);
}

export default d3PieChart;