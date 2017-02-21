import {
  select,
  axisLeft,
  axisBottom,
  scaleLinear,
  arc
} from 'd3';

export default class GraphRenderer {
  constructor({root, size = 500, onItemClicked = () => {}}) {
    this.size = size;
    this.onItemClicked = onItemClicked;

    this.scaleY = scaleLinear()
    .domain([0, 100])
    .range([size, 0]);

    this.scaleX = scaleLinear()
    .domain([0, 100])
    .range([0, size]);

    this.scaleSize = scaleLinear()
    .domain([0, 100])
    .range([0, size]);

    const yAxis = axisLeft(this.scaleY).ticks(5);
    const xAxis = axisBottom(this.scaleX).ticks(5);

    const svg = this.svg = select(root)
    .append('svg')
    .attr('class', 'graph')
    .attr('width', size)
    .attr('height', size);

    svg.append('g').attr('transform', `translate(0, ${size})`).call(xAxis);
    svg.append('g').call(yAxis);
  }

  circle(size) {
    return arc()
    .innerRadius(0)
    .outerRadius(this.scaleSize(size))({startAngle: 0, endAngle: 2 * Math.PI});
  }

  animateScale({isHovered}) {
    return function() {
      return select(this)
      .transition(500)
      .attr('transform', `scale(${isHovered ? 1.2 : 1})`);
    }
  }

  renderNodes(data) {
    const node = this.svg.selectAll('.node').data(data, d => d.id);
    const nodeEntered = node.enter().append('g').attr('class', 'node');

    //enter
    nodeEntered
    .attr('transform', d => `translate(${this.scaleX(d.x)}, ${this.scaleY(d.y)})`)
    .append('path')
    .on('mouseover', this.animateScale({isHovered: true}))
    .on('mouseout', this.animateScale({isHovered: false}))
    .on('click', d => { this.onItemClicked(d); })
    .attr('d', d => this.circle(d.size))
    .attr('transform', 'scale(0)')
    .attr('fill', d => d.color)
    .transition(500)
    .attr('transform', 'scale(1)');

    //update
    node
    .transition(500)
    .attr('transform', d => `translate(${this.scaleX(d.x)}, ${this.scaleY(d.y)})`)
    .select('path')
    .attr('d', d => this.circle(d.size))
    .attr('fill', d => d.color);

    //exit
    node
    .exit()
    .transition(500)
    .selectAll('path')
    .attr('transform', 'scale(0)')
    .select(function () { return this.parentNode; })
    .remove();
  }

  renderLabels(data) {
    const label = this.svg.selectAll('.label').data(data, d => d.id);
    const labelEntered = label.enter().append('g').attr('class', 'label');

    //enter
    labelEntered
    .attr('transform', d => `translate(${this.scaleX(d.x)}, ${this.scaleY(d.y - d.size - 2)})`)
    .append('text')
    .text(d => d.label);

    //update
    label
    .transition(500)
    .attr('transform', d => `translate(${this.scaleX(d.x)}, ${this.scaleY(d.y - d.size - 2)})`);

    //exit
    label.exit()
    .select('text')
    .transition(500)
    .style('transform', 'scale(0)')
    .select(function () { return this.parentNode; })
    .remove();
  }

  render(data = []) {
    this.renderNodes(data);
    this.renderLabels(data);
  }
}
